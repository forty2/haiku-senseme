function processNode(name, node, visitor, context = {}) {
    // Pull out metadata
    const { meta, ...nodes } = node;

    // run the visitor
    let newContext = visitor(name || "", meta, context);

    // if there's more subnodes, process them
    Object.keys(nodes)
        .forEach(k => {
            processNode(k, nodes[k], visitor, newContext);
        });
}

function walk(visitor, context = {}) {
    processNode("", require('../commands.json'), visitor, context);
    return context;
}

export {
    walk as default
}
