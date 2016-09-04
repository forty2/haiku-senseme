import { EventEmitter } from 'events';
import { nextTick } from 'process';
import dgram from 'dgram';

import Device from './Device';
import { loadCommands } from './lib/walk';

import constants from './constants';
const {
    BROADCAST_ADDR,
    SENSEME_PORT,
    MISSING_THRESHOLD,
    DEFAULT_SCAN_INTERVAL
} = constants;

const $private = Symbol();

class SenseMe extends EventEmitter {
    constructor() {
        super(...arguments);

        this[$private] = {
            registry: { },
            nameToId: { }
        }
    }

    _handleDeviceFound({ name, id, type, ip }) {
        const {
            registry, nameToId
        } = this[$private];

        let lastseen = Date.now();
        if (registry[id]) {
            registry[id].lastseen = lastseen;
        }
        else {
            let messenger = new EventEmitter();
            registry[id] = {
                lastseen,
                messenger,
                device: new Device({ name, id, type, ip }, messenger)
            }

            nameToId[name] = id;
            registry[id].device.refreshAll();

            this.emit('founddevice', registry[id].device);
        }
    }

    _handleMessage(name, msg) {
        const {
            nameToId,
            registry: {
                [nameToId[name]]: {
                    messenger = undefined
                } = {}
            } = {}
        } = this[$private];

        if (messenger) {
            messenger.emit('message', msg);
        }
    }

    getDeviceById(id) {
        const {
            registry
        } = this[$private];

        if (id in registry) {
            return registry[id].device;
        }
        return undefined;
    }

    getDeviceByName(name) {
        const {
            registry, nameToId
        } = this[$private];

        if (name in nameToId && nameToId[name] in registry) {
            return registry[nameToId[name]].device;
        }
        return undefined;
    }

    discover(interval = DEFAULT_SCAN_INTERVAL, missingThreshold = MISSING_THRESHOLD) {
        const { registry } = this[$private];

        let server = dgram.createSocket('udp4');
        server
            .on('error', (err) => {
                console.log(`server error:\n${err.stack}`);
                server.close();
            })
            .on('message', (msg, { address: ip }) => {
                if (typeof msg !== 'string') {
                    msg = msg.toString();
                }
                if (!msg.startsWith('(')) return;

                let [ name, namespace, command, id, type ] = msg.substr(1, msg.length-2).split(';');

                if (namespace === 'DEVICE' && command === 'ID') {
                    this._handleDeviceFound({ name, id, type, ip });
                }
                else {
                    this._handleMessage(name, msg);
                }
            })
            .on('listening', () => {
                var address = server.address();
                console.log(`server listening ${address.address}:${address.port}`);
            });

        server.bind(SENSEME_PORT);

        let discover = () => {
            let client = dgram.createSocket('udp4');
            client.bind(() => {
                client.setBroadcast(true);
                client.send('<ALL;DEVICE;ID;GET>', SENSEME_PORT, BROADCAST_ADDR);
                nextTick(() => {
                    client.close()
                    Object.keys(registry)
                        .filter(x => (registry[x].lastseen + (missingThreshold * interval))< Date.now())
                        .forEach(x => {
                            let dev = registry[x];
                            delete registry[x];
                            this.emit('lostdevice', dev.device);
                        })
                });
            });
        };

        setTimeout(() => {
            discover();
            setInterval(discover, interval);
        }, 100);
    }
}

loadCommands();
let single = new SenseMe();

export {
    single as default
}
