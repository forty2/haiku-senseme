let specByDataPath = { };

function specVisitor(name, props, node, context) {
    const {
        calculatedPaths: {
            getPath
        }
    } = context;

    if (props.type !== undefined && props.type !== 'group') {
        specByDataPath[ getPath.join(';') ] = props;
    }

    return context;
}

export {
    specVisitor as default,
    specByDataPath
}
