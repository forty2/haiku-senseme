import { EventEmitter } from 'events';

import Logger from 'js-logger';
import compose from 'just-compose';

import Observable, { hasObservable } from './lib/observable';
import { method as flatMap } from './lib/observable/flatMap';

import QueuedSocket from './QueuedSocket';
import State from './State';

import createAccessors from './lib/createAccessors';
import { translateHardwareValues, mapBack } from './lib/mapValues';

import constants from './constants';

/** @module */

const { SENSEME_PORT } = constants;

const $private = Symbol();

/**
 * Represents one device on the local network, such as a fan.
 */
class Device {
    /**
     * Create a new device.
     * @param {Object} opts
     * @param {string} opts.name - The advertised name of the new device
     * @param {string} opts.id   - The MAC address of the new device
     * @param {string} opts.type - The type of the new device, such as `FAN,HAIKU,HSERIES`
     * @param {string} opts.ip   - The IP address of the new device
     * @param {EventEmitter} messenger - An EventEmitter for funneling incoming messages from the discovery process.
     */
    constructor({ name, id, type, ip }, messenger) {
        Logger.debug(`constructing a device: ${name}, ${id}, ${type}, ${ip}`);
        this[$private] = { name, id, type, ip };

        let socket = this[$private].socket =
            new QueuedSocket(ip, SENSEME_PORT, /\([^)]+\)/g);

        socket.on('data', data => this._handleMessage(data.toString()));
        if (messenger) {
            messenger.on('message', msg => this._handleMessage(msg.toString()));
        }

        if (!name || !id) {
            // we'll need to know both the ID and the name
            // to ensure successful communication with the fan.
            socket.send(`<ALL;DEVICE;ID;GET>`);
        }

        if (hasObservable) {
            /**
             * Observe changes to any of the properties of this device.  This method is only
             * available if your application has an Observable library installed.
             * See {@link https://www.npmjs.com/package/any-observable} for details.
             * @memberof module:Device~Device
             * @instance
             * @returns {Observable} An ES7-compatible obsevable that emits objects of the form `{ path, value }` for each property change.
             */
            let observeAll = () =>
                this.state.observeAll()
                    ::flatMap(
                        x => Observable.from(translateHardwareValues(x))
                    );

            this.observeAll = observeAll;
        }

        let accessorImplementations = {
            get: (path) => mapBack(path, this.state.get(path)),
            set: (path, value) => {
                this._sendMessage([...path, value]);
            },

            refresh: (path) => {
                this._sendMessage(path);
            },

            listen:  (path) => this.state.listen(path),
            observe: (path) => this.state.observe(path)
        }

        this.state = new State();
        this::createAccessors(accessorImplementations);
    }

    /**
     * Send one or more messages to the device.
     * @param {...string} msgs - The messages to send
     * @private
     */
    _sendMessage(...msgs) {
        this[$private].socket.send(
            msgs
                .map(x => Array.isArray(x) ? x.join(';') : x)
                .map(x => `<${this.id || this.name};${x}>`)
                .join('')
        );
    }

    /**
     * Process one incoming message.
     * @param {string} msg - The message
     * @private
     */
    _handleMessage(msg) {
        Logger.debug(`Incoming: ${msg}`);
        let path = msg.replace(/^\(([^)]+)\)$/, '$1').split(';');
        let deviceName = path.shift();

        if (path[0] === 'DEVICE' && path[1] === 'ID') {
            this[$private].name = deviceName;
            this[$private].type = path.pop();
            this[$private].id   = path.pop();
            this.refreshAll();
        }
        else {
            let newValue;
            /*
            * a path like SLEEP;EVENT;ON should be parsed as
            *     path = [SLEEP, EVENT, ON]
            *     value = undefined
            *
            * the naive implementation for now is -- if the
            * next-to-last path element is EVENT, assume the
            * value is undefined, otherwise assume the value
            * is the last element.
            */
            if (path[path.length-2] !== 'EVENT') {
                newValue = path.pop();
            }

            if (deviceName === this.name) {
                this.state.set(path, newValue);
            }
        }
    }

    /**
     * Disconnect from the device.
     */
    disconnect() {
      this[$private].socket.close();
      this[$private].socket = undefined;
    }

    /**
     * Listen for changes to any of the properties of this device.
     * Changes are delivered as 'change' events emitted by the returned
     * emitter.
     * @returns {EventEmitter}
     */
    listenAll() {
        let ret = new EventEmitter();

        this.state.listenAll()
            .on('change',
                compose(
                    translateHardwareValues,
                    items => items.forEach(x => ret.emit('change', x))
                )
            )

        return ret;
    }

    /**
     * Request the current values of all known properties from this device.
     * This method only updates the local state; to be informed of the new
     * values, use {@link Device#listenAll}, {@link Device#observeAll}, or the corresponding
     * methods on the individual values of interest.
     */
    refreshAll() {
        // for whatever reason, SNSROCC;STATUS is skipped by GETALL.
        this._sendMessage('GETALL', 'SNSROCC;STATUS;GET', 'NAME;VALUE;GET');
    }

    /**
     * The ID (MAC address) of this device.
     * @type {string}
     * @readonly
     */
    get id() {
        return this[$private].id;
    }

    /**
     * The IP address of this device.
     * @type {string}
     * @readonly
     */
    get ip() {
        return this[$private].ip;
    }

    /**
     * The name of this device
     * @type {string}
     * @readonly
     */
    get name() {
        return this[$private].name;
    }

    /**
     * The type of this device, such as `FAN,HAIKU,HSERIES`
     * @type {string}
     * @readonly
     */
    get type() {
        return this[$private].type;
    }
}

/**
 * @name fan
 * @type {FanProperties}
 * @memberof module:Device~Device
 * @readonly
 * @instance
 */

/**
 * @name light
 * @type {LightProperties}
 * @memberof module:Device~Device
 * @readonly
 * @instance
 */

/**
 * @name sensor
 * @type {SensorProperties}
 * @memberof module:Device~Device
 * @readonly
 * @instance
 */

/**
 * @name smartMode
 * @type {SmartModeProperties}
 * @memberof module:Device~Device
 * @readonly
 * @instance
 */

/**
 * @name sleepMode
 * @type {SleepModeProperties}
 * @memberof module:Device~Device
 * @readonly
 * @instance
 */

/**
 * @name device
 * @type {DeviceProperties}
 * @memberof module:Device~Device
 * @readonly
 * @instance
 */

/**
 * @name network
 * @type {NetworkProperties}
 * @memberof module:Device~Device
 * @readonly
 * @instance
 */

export {
    Device as default
}
