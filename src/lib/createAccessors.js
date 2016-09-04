import { accessorGenerators } from './walk/accessorVisitor';
import walk from './walk';

function createAccessors(accessors) {
    walk(
        accessorGenerators, [
            createAccessorVisitor
        ], {
            controller: this,
            accessors
        }
    );
}

function createAccessorVisitor(name, props, node, context) {
    let {
        path = [],
        controller,
        accessors
    } = context;

    if (name) {
        let base;
        if (node.isComputed) {
            base = controller[node.baseName];
        }

        if (name !== 'value') {
            Object.defineProperty(
                controller, name, {
                    writable: false,
                    enumerable: true,
                    value: { }
                }
            );

            controller = controller[name];
        }

        if (typeof node === 'function' || node.isComputed) {
            let functions, value;

            if (node.isComputed) {
                ({ functions, value } = node.func(base));
            }
            else {
                ({ functions, value } = node(accessors));
            }

            Object.defineProperties(
                controller,
                functions
            );

            Object.defineProperty(
                controller, 'value', value
            );
        }
    }

    return { ...context, controller };
}

export {
    createAccessors as default
}
