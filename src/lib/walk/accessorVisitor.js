import { EventEmitter } from 'events';

import compose from 'just-compose';
import polynomial from 'compute-polynomial';

import { validateAndMap, mapBack } from '../mapValues';
import Observable, { hasObservable } from '../observable';
import { method as map } from '../observable/map';
import round from '../util/round';

let accessorGenerators = { };

function accessorVisitor(name, props, node, context) {
    let { generatorStore } = context;

    if (typeof generatorStore === 'undefined') {
        generatorStore = accessorGenerators;
    }

    if (props.type === 'group') {
        if (!(props.friendlyName in generatorStore)) {
            Object.defineProperty(
                generatorStore, props.friendlyName, {
                    writable: false,
                    enumerable: true,
                    value: { }
                }
            );
        }
        generatorStore = generatorStore[props.friendlyName];
    }
    else if (props.type !== undefined) {
        // first, create a home to own these
        generatorStore[props.friendlyName] = {
            value: getDescriptor(props, context)
        };

        if (props.computed && props.computed.length > 0) {
            props.computed
                .forEach(
                    ({ friendlyName, forward, reverse }) => {
                        generatorStore[friendlyName] =
                            Object.defineProperties(
                                {}, {
                                    isComputed: { value: true },
                                    baseName:   { value: props.friendlyName },
                                    func:       { value: getComputedDescriptor({ props, forward, reverse, context }) }
                                }
                            );
                    }
                );
        }

        generatorStore = generatorStore[props.friendlyName];
    }

    return { ...context, generatorStore };
}

function getDescriptor(props, context) {
    const {
        calculatedPaths: {
            getPath,
            setPath,
            refreshPath
        },
        parentPath
    } = context;

    return (accessors) => {
        let value = {
            enumerable: true,
            get: () => accessors.get(getPath)
        }

        if (props.settable) {
            value.set = (value) => {
                let mapped = validateAndMap(getPath, value);
                accessors.set(setPath, mapped);
            };
        }

        let functions = {
            refresh: {
                writable: false,
                enumerable: true,
                value: () => accessors.refresh(refreshPath)
            },
            listen: {
                writable: false,
                enumerable: true,
                value: () => accessors.listen(getPath)
            }
        }

        if (hasObservable) {
            functions.observe = {
                writable: false,
                enumerable: true,
                value: () => accessors.observe(getPath)
            }
        }

        return { functions, value };
    }
}

function getComputedDescriptor({ props, forward, reverse, context }) {
    const {
        calculatedPaths: {
            getPath
        }
    } = context;

    return (base) => {
        let value = {
            enumerable: true,
            get: () => polynomial(forward, base.value)::round(2)
        }

        if (props.settable) {
            value.set = (value) => {
                base.value = polynomial(reverse, value);
            };
        }

        let functions = {
            refresh: {
                writable: false,
                enumerable: true,
                value: () => base.refresh()
            },
            listen: {
                writable: false,
                enumerable: true,
                value: () => {
                    let ret = new EventEmitter();
                    base.listen()
                        .on('change',
                            compose(
                                x => polynomial(forward, mapBack(getPath, x))::round(2),
                                x => ret.emit('change', x)
                            )
                        )
                    return ret;
                }
            }
        };

        if (hasObservable) {
            functions.observe = {
                writable: false,
                enumerable: true,
                value: () =>
                    base.observe()
                        ::map(x =>
                            x ? polynomial(forward, mapBack(getPath, x))::round(2) : x
                        )
            }
        }

        return { functions, value };
    };
}

export {
    accessorVisitor as default,
    accessorGenerators
}
