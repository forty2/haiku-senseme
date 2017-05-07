import { EventEmitter } from 'events';
import { nextTick } from 'process';
import dgram from 'dgram';

import Device from './Device';

import constants from './constants';

const debug = require('debug')('haiku-senseme:senseme');

/**
 * @module
 */

const {
    BROADCAST_ADDR,
    SENSEME_PORT,
    MISSING_THRESHOLD,
    DEFAULT_SCAN_INTERVAL
} = constants;

const $private = Symbol();

/**
 * Discover and manage SenseME-enabled devices on the local network.
 */
class SenseMe extends EventEmitter {
    constructor() {
        super(...arguments);

        this[$private] = {
            registry: { },
            nameToId: { }
        }
    }

    /**
     * Process one discovered device.  This will handle
     * tracking of devices in case they eventuall disappear,
     * and in the case of a previously unknown device will
     * emit a "founddevice" event.
     * @private
     * @param {Object} opts
     * @param {string} opts.name - The advertised name of the new device
     * @param {string} opts.id   - The MAC address of the new device
     * @param {string} opts.type - The type of the new device, such as `FAN,HAIKU,HSERIES`
     * @param {string} opts.ip   - The IP address of the new device
     * @emits SenseMe#founddevice
     */
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

    /**
     * Process one incoming message from a remote device.
     * @param {string} name - The name of the remote device
     * @param {string} msg - The actual message
     * @private
     */
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

    /**
     * Get a list of all currently known devices.
     * @returns {Array<Device>}
     */
    getAllDevices() {
        const {
            registry
        } = this[$private];
        return Object.keys(registry).map(k => registry[k].device);
    }

    /**
     * Get one discovered device by its ID (usually MAC address).
     * @param {string} id - The ID of the requested device.
     * @returns {Device}
     */
    getDeviceById(id) {
        const {
            registry
        } = this[$private];

        if (id in registry) {
            return registry[id].device;
        }
        return undefined;
    }

    /**
     * Get one discovered device by its name.
     * @param {string} name - The name of the requested device.
     * @returns {Device}
     */
    getDeviceByName(name) {
        const {
            registry, nameToId
        } = this[$private];

        if (name in nameToId && nameToId[name] in registry) {
            return registry[nameToId[name]].device;
        }
        return undefined;
    }

    /**
     * Begin discovery of all SenseME devices on the local network.
     * Discovery will continue until {@link cancelDiscovery} is called.
     * @param {number} [interval=10000] - How often (in milliseconds) should a discovery request be sent out?
     * @param {number} [missingThreshold=3] - How many discovery requests must a device miss before being considered no longer on the network?
     * @emits SenseMe#lostdevice
     */
    discover(interval = DEFAULT_SCAN_INTERVAL, missingThreshold = MISSING_THRESHOLD) {
        const { registry } = this[$private];

        let server = this[$private].server = dgram.createSocket('udp4');
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

                debug(`UDP Incoming: ${msg}`);

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
            })
            .on('close', () => {
                console.log('server shutting down');
            })
            ;

        server.bind(SENSEME_PORT);

        let discover = () => {
            let client = dgram.createSocket('udp4');
            client.bind(() => {
                client.setBroadcast(true);
                client.send('<ALL;DEVICE;ID;GET>', SENSEME_PORT, BROADCAST_ADDR, () => {
                    client.close()
                });
                nextTick(() => {
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
            this._discoveryInterval = setInterval(discover, interval);
        }, 100);
    }

    /**
     * Cancel an ongoing discovery session.
     */
    cancelDiscovery() {
        clearInterval(this._discoveryInterval);
        this._discoveryInterval = undefined;
        debug("Discovery cancelled");

        this[$private].server.close();
        this[$private].server = undefined;
    }
}

let single = new SenseMe();

export {
    /**
     * @type {SenseMe}
     */
    single as default
}
