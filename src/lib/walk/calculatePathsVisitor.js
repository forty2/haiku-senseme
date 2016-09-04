
const DERIVED_PLACHOLDER = '$$derived';
function calculatePathsVisitor(name, props, node, context) {
    let parentPath = (context.parentPath || []);
    if (props.isDerived) {
        parentPath = parentPath.concat([ DERIVED_PLACHOLDER ]);
    }
    if (name) {
        parentPath = parentPath.concat(name);
    }

    let parentFriendlyPath = (context.parentFriendlyPath || []);
    if (props.friendlyName) {
        parentFriendlyPath = parentFriendlyPath.concat(props.friendlyName);
    }

    let calculatedPaths = { };
    if (props.type && props.type !== 'group') {
        let setCmd = [].concat(props.type === 'power' ? [] : [ "SET" ]);

        if (parentPath.includes(DERIVED_PLACHOLDER)) {
            calculatedPaths = {
                getPath:     parentPath.filter(x => x !== DERIVED_PLACHOLDER).concat(props.valuePath || []),
                setPath:     parentPath.map(x => x === DERIVED_PLACHOLDER ? 'SET' : x).concat(props.setPath || []),
                refreshPath: parentPath.map(x => x === DERIVED_PLACHOLDER ? 'GET' : x).concat(props.valuePath || []),
            }
        }
        else {
            calculatedPaths = {
                getPath:      parentPath.concat(props.valuePath || []),
                setPath:      parentPath.concat(setCmd).concat(props.setPath || []),
                refreshPath:  parentPath.concat(['GET']).concat(props.valuePath || []),
            }
        }

        calculatedPaths.friendlyPath = parentFriendlyPath;

        if (!props.settable) {
            delete calculatedPaths.setPath;
        }
    }

    return { ...context, parentPath, parentFriendlyPath, calculatedPaths };
}

export {
    calculatePathsVisitor as default
}
