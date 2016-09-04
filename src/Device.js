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
const { SENSEME_PORT } = constants;

const commands = require('./commands.json');

const $private = Symbol();

class Device {
    constructor({ name, id, type, ip }, messenger) {
        Logger.debug(`constructing a device: ${name}, ${id}, ${type}, ${ip}`);
        this[$private] = { name, id, type, ip };

        let socket = this[$private].socket =
            new QueuedSocket(ip, SENSEME_PORT, /\([^)]+\)/g);

        socket.on('data', data => this._handleMessage(data.toString()));
        messenger.on('message', msg => this._handleMessage(msg.toString()));

        if (hasObservable) {
            this.observeAll = () =>
                this.state.observeAll()
                    ::flatMap(
                        x => Observable.from(translateHardwareValues(x))
                    );
        }

        let accessorImplementations = {
            get: (path) => mapBack(path, this.state.get(path)),
            set: (path, value) => {
                let msg = [...path, value].join(';');
                this[$private].socket.send(`<${this.id};${msg}>`)
            },

            refresh: (path) => {
                let msg = path.join(';');
                this[$private].socket.send(`<${this.id};${msg}>`)
            },

            listen:  (path) => this.state.listen(path),
            observe: (path) => this.state.observe(path)
        }

        this.state = new State();
        this::createAccessors(accessorImplementations);
    }

    _handleMessage(msg) {
        Logger.debug(`Incoming: ${msg}`);
        let path = msg.replace(/^\(([^)]+)\)$/, '$1').split(';');
        let deviceName = path.shift();

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

    refreshAll() {
        this[$private].socket.send(`<${this.id};GETALL>`);

        // this one value is inexplicably skipped by GETALL
        this[$private].socket.send(`<${this.id};SNSROCC;STATUS;GET>`)
    }

    get id() {
        return this[$private].id;
    }
    get ip() {
        return this[$private].ip;
    }
    get name() {
        return this[$private].name;
    }
    get type() {
        return this[$private].type;
    }
}

export {
    Device as default
}
