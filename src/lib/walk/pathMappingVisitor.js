let realPathToFriendlyPath = { };
let friendlyPathToRealPath = { };

function pathMappingVisitor(name, props, node, context) {
    const {
        calculatedPaths: {
            getPath,
            friendlyPath
        }
    } = context;

    if (props.type !== undefined && props.type !== 'group') {
        let realPath = getPath.join(';');
        let propFriendlyPath = friendlyPath.join(';');

        friendlyPathToRealPath[propFriendlyPath] = realPath;
        realPathToFriendlyPath[realPath] = propFriendlyPath;
    }

    return context;
}

export {
    pathMappingVisitor as default,
    realPathToFriendlyPath,
    friendlyPathToRealPath
}
