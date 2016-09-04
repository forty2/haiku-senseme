import calculatePathsVisitor from './calculatePathsVisitor';
import accessorVisitor from './accessorVisitor';
import pathMappingVisitor from './pathMappingVisitor';
import specVisitor from './specVisitor';

function processNode(name, node, visitors, context = {}) {
    // Pull out metadata
    const { meta, ...nodes } = node;

    // run the visitors
    let newContext = context;
    for (let visitor of [].concat(visitors)) {
        newContext = visitor(name || "", meta, node, newContext);
    }

    // if there's more subnodes, process them
    Object.keys(nodes)
        .forEach(k => {
            processNode(k, nodes[k], visitors, newContext);
        });
}

function walk(object, visitors, context = {}) {
    processNode("", object, visitors, context);
}

function loadCommands() {
    walk(require('../../commands.json'), [
        calculatePathsVisitor,
        pathMappingVisitor,
        specVisitor,
        accessorVisitor
    ]);
}

export {
    walk as default,
    loadCommands
}
