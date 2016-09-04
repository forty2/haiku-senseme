import walk from './lib/walk';

const commands = require('./commands.json');

let refreshCommands = [];
let realPathToFriendlyPath = { };
let friendlyPathToRealPath = { };

function refreshVisitor(name, props, context) {
    let parentPath;
    if (name) {
        parentPath = (context.parentPath || []).concat(name);
    } else {
        parentPath = context.parentPath || [];
    }

    const friendlyPath = context.friendlyPath || [];

    if (props.type !== undefined && props.type !== 'group') {
        let path = parentPath.concat(['GET']).concat((props.path || []));
        let dataPath = parentPath.concat((props.path || []));

        if (props.paths) {
            Object.keys(props.paths)
                .forEach(name => {
                    refreshCommands.push(path.concat(props.paths[name]));
                    let realPath = dataPath.concat(props.paths[name]).join(';');
                    let propFriendlyPath = friendlyPath.concat(props.friendlyName, name).join(';');

                    friendlyPathToRealPath[propFriendlyPath] = realPath;
                    realPathToFriendlyPath[realPath] = propFriendlyPath;
                });
        }
        else {
            refreshCommands.push(path);
            let realPath = dataPath.join(';');
            let propFriendlyPath = friendlyPath.concat(props.friendlyName).join(';');

            friendlyPathToRealPath[propFriendlyPath] = realPath;
            realPathToFriendlyPath[realPath] = propFriendlyPath;
        }
    }

    let nextFriendlyPath =
        props.friendlyName ? friendlyPath.concat(props.friendlyName) : friendlyPath;
    return { parentPath, friendlyPath: nextFriendlyPath };
}

walk(refreshVisitor, {});

export {
    refreshCommands,
    realPathToFriendlyPath,
    friendlyPathToRealPath
}
