import polynomial from 'compute-polynomial';

import { validateAndMap, mapBack } from './_mapValues';

import walk from './lib/walk';
import Observable, { hasObservable } from './lib/observable';

const commands = require('./commands.json');

function round(places) {
    let factor = Math.pow(10, places);
    return Math.round(this * factor) / factor;
}

function createAccessors(controller, accessors) {
    let context = { parentPath: [], controller, accessors };
    return walk(accessorVisitor, context).controller;
}

const DERIVED_PLACHOLDER = '$$derived';
function calculatePathsVisitor(name, props, context) {
    let parentPath = (context.parentPath || []);
    if (props.isDerived) {
        parentPath = parentPath.concat([ DERIVED_PLACHOLDER ]);
    } 
    if (name) {
        parentPath = parentPath.concat(name);
    } 

    if (props.type && props.type !== 'group') {
        // generate paths at this level

        // generate computed paths
    }
}

function accessorVisitor(name, props, context) {

    let { controller, accessors } = context;

    if (props.type === 'group') {
        if (!(props.friendlyName in controller)) {
            Object.defineProperty(
                controller, props.friendlyName, {
                    writable: false,
                    value: { }
                }
            );
        }
        controller = controller[props.friendlyName];
    }
    else if (props.type !== undefined) {
        setup({
            owner: controller,
            name: props.friendlyName,

            props, parentPath, accessors
        });

        if (props.computed && props.computed.length > 0) {
            props.computed
                .forEach(
                    ({ friendlyName, forward, reverse }) =>
                        setup({
                            owner: controller,
                            name: friendlyName,
                            base: props.friendlyName,

                            props, forward, reverse, accessors
                        })
                );
        }
    }

    return { parentPath, controller, accessors };
}

function getDescriptor({ owner, name, props, parentPath, accessors }) {
    let getPath, setPath, refreshPath;
    let setCmd = [].concat(props.type === 'power' ? [] : [ "SET" ]);

    if (parentPath.includes(DERIVED_PLACHOLDER)) {
        getPath     = parentPath.filter(x => x !== DERIVED_PLACHOLDER).concat(props.valuePath || []);
        setPath     = parentPath.map(x => x === DERIVED_PLACHOLDER ? 'SET' : x).concat(props.setPath || []);
        refreshPath = parentPath.map(x => x === DERIVED_PLACHOLDER ? 'GET' : x).concat(props.valuePath || []);
    }
    else {
        getPath     = parentPath.concat(props.valuePath || []);
        setPath     = parentPath.concat(setCmd).concat(props.setPath || []);
        refreshPath = parentPath.concat(['GET']).concat(props.valuePath || []);
    }

    console.log("PATHS:");
    console.dir(getPath);
    props.settable && console.dir(setPath);
    console.dir(refreshPath);

    let descriptor = {
        enumerable: true,
        get: () => accessors.get(getPath)
    }

    if (props.settable) {
        descriptor.set = (value) => {
            let mapped = validateAndMap(parentPath, value);
            accessors.set(setPath, mapped);
        };
    }

    let value = {
        refresh: () => accessors.refresh(refreshPath),
        listen: () => accessors.listen(getPath)
    }

    if (hasObservable) {
        value.observe = () => accessors.observe(getPath)
    }

    return { value, descriptor };
}

function getComputedDescriptor({ owner, name, props, base, forward, reverse }) {
    let descriptor = {
        enumerable: true,
        get: () => polynomial(forward, owner[base].value)::round(2)
    }

    if (props.settable) {
        descriptor.set = (value) => {
            owner[base].value = polynomial(reverse, value)::round(2);
        };
    }

    let value = {
        refresh: () => owner[base].refresh(),
        listen: () => {
            // TODO: how can we be sure to get the correct variant?
        }
    };

    if (hasObservable) {
        value.observe = () => {
            // TODO: haven't really established what type observe() returns.
            // Figure it out, then implement this method.
            // TODO: how can we be sure to get the correct variant?
        };
    }

    return { value, descriptor };
}

function setup({ owner, name, base }) {
    const { value, descriptor } =
        typeof base === 'undefined'
            ? getDescriptor(arguments[0])
            : getComputedDescriptor(arguments[0]);

    Object.defineProperty(
        owner, name, {
            writable: false,
            value
        }
    );

    Object.defineProperty(owner[name], 'value', descriptor);
}

export {
    createAccessors as default
}
