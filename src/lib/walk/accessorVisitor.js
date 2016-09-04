import polynomial from 'compute-polynomial';

import { validateAndMap, mapBack } from '../../_mapValues';
import Observable, { hasObservable } from '../observable';
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
                                    haseName:   { value: props.friendlyName },
                                    func:       { value: getComputedDescriptor({ props, forward, reverse }) }
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

function getComputedDescriptor({ props, forward, reverse }) {
    return (base) => {
        let value = {
            enumerable: true,
            get: () => polynomial(forward, base.value)::round(2)
        }

        if (props.settable) {
            value.set = (value) => {
                base.value = polynomial(reverse, value)::round(2);
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
                    // TODO: how can we be sure to get the correct variant?
                }
            }
        };

        if (hasObservable) {
            functions.observe = {
                writable: false,
                enumerable: true,
                value: () => {
                    // TODO: haven't really established what type observe() returns.
                    // Figure it out, then implement this method.
                    // TODO: how can we be sure to get the correct variant?
        i        }
            }
        }

        return { functions, value };
    };
}

export {
    accessorVisitor as default,
    accessorGenerators
}
