import { EventEmitter } from 'events';

import Observable, { hasObservable } from './lib/observable';

function getValueAtPath(path, base) {
    return [].concat(path).reduce(
        (acc, key) => {
            if (acc) return acc[key];
            return undefined;
        }, base);
}

function getParentAtPath(path, base) {
    const pathParts = [].concat(path);
    const lastPart = pathParts.pop();

    return {
        object: pathParts.reduce((a, k) => (a[k] ? a[k] : (a[k] = {})), base),
        valueKey: lastPart
    };
}

const $private = Symbol();
class State {
    constructor() {
        this[$private] = {
            allListeners:   [ ],
            stateListeners: { },

            stateStore:     { }
        };

        if (hasObservable) {
            Object.assign(this[$private], {
                allObservers:   [ ],
                stateObservers: { }
            });

            this.observeAll = function() {
                return new Observable(
                    subscriber => {
                        this[$private].allObservers.push(subscriber);
                        return () => {
                            this[$private].allObservers.remove(subscriber);
                        }
                    }
                );
            }

            this.observe = function(path) {
                const {
                    object: acc,
                    valueKey
                } = getParentAtPath(path, this[$private].stateObservers);

                if (acc) {
                    if (!acc[valueKey]) {
                        acc[valueKey] = [];
                    }

                    let self = this;
                    return Observable.create(
                        function(subscriber) {
                            subscriber.next(self.get(path));
                            acc[valueKey].push(subscriber);
                            return () => {
                                acc[valueKey].remove(subscriber);
                            };
                        }
                    )
                }

                return new Observable(s => s.complete());
            }
        }
    }

    listen(path) {
        const {
            object: acc,
            valueKey
        } = getParentAtPath(path, this[$private].stateListeners);

        let ret = new EventEmitter();
        if (acc) {
            if (!acc[valueKey]) {
                acc[valueKey] = [];
            }

            ret.emit('change', this.get(path));
            acc[valueKey].push(ret);
        }
        return ret;
    }

    listenAll() {
        let ret = new EventEmitter();
        this[$private].allListeners.push(ret);
        return ret;
    }

    get(path) {
        return getValueAtPath(path, this[$private].stateStore);
    }

    set(path, value) {
        const {
            stateStore,

            stateObservers,
            allObservers,

            stateListeners,
            allListeners
        } = this[$private];

        const {
            object: acc,
            valueKey
        } = getParentAtPath(path, stateStore);

        if (acc) {
            if (typeof value !== 'undefined') {
                value = value.toString();
            }
            acc[valueKey] = value;

            if (hasObservable) {
                let observers = getValueAtPath(path, stateObservers);
                if (observers && observers.length) observers.forEach(o => o.next(value));
                if (allObservers.length) {
                    allObservers.forEach(o => o.next({ path, value }));
                }
            }

            {
                let listeners = getValueAtPath(path, stateListeners);
                if (listeners && listeners.length) {
                    listeners.forEach(l => {
                        if (l.listenerCount('change') > 0) {
                            l.emit('change', value)
                        }
                        else {
                            // lose that one from the list.
                            listeners.remove(l);
                        }
                    });
                }

                if (allListeners.length) {
                    allListeners.forEach(l => {
                        if (l.listenerCount('change') > 0) {
                            l.emit('change', { path, value })
                        }
                        else {
                            // lose that one from the list.
                            allListeners.remove(l);
                        }
                    });
                }
            }
        }
    }

    // this is like 5/8ths-assed at best.
    delete(path) {
        const {
            object: acc,
            valueKey
        } = getParentAtPath(path, this[$private].stateStore);

        if (acc) {
            let deletedValue = acc[valueKey];
            delete acc[valueKey];

            if (hasObservable) {
                let observers = getValueAtPath(path, this[$private].stateObservers);
                if (observers && observers.length) observers.forEach(o => o.next(undefined));
            }
            {
                if (listeners && listeners.length) {
                    listeners.forEach(l => {
                        if (l.listenerCount('change') > 0) {
                            l.emit('delete', deletedValue)
                        }
                        else {
                            // lose that one from the list.
                            listeners.remove(l);
                        }
                    });
                }

                if (allListeners.length) {
                    allListeners.forEach(l => {
                        if (l.listenerCount('change') > 0) {
                            l.emit('delete', deletedValue)
                        }
                        else {
                            // lose that one from the list.
                            allListeners.remove(l);
                        }
                    });
                }
            }
        }
    }
};

export {
    State as default
};
