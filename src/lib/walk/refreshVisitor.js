let refreshCommands = [];

function refreshVisitor(name, props, node, context) {
    const {
        calculatedPaths: {
            refreshPath
        }
    } = context;

    if (props.type !== undefined && props.type !== 'group') {
        refreshCommands.push(refreshPath);
    }

    return context;
}

export {
    refreshVisitor as default,
    refreshCommands
}
