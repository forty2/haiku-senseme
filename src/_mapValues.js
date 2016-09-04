const commands = require('./commands.json');

let validators = {
    power: (value) => {
        return value in { on: 'ON', off: 'OFF' };
    },

    number: (value, spec) => {
        if (typeof value === 'number') {
            return !spec.values || (value >= spec.values[0] && value <= spec.values[1]);
        }
        return false;
    },

    enum: (value, spec) => {
        return spec.values && value in spec.values;
    },

    boolean: (value, spec) => {
        return typeof value === 'boolean';
    },

    temperature: (value, spec) => {
        return typeof value === 'number' && value >= 10 && value <= 32.22;
    },

    height: (value, spec) => {
        return typeof value === 'number';
    },

    string: () => true,
}

const forwardMappings = {
    power: (value) => {
        return { on: 'ON', off: 'OFF' }[value];
    },

    number: (
                value, {
                    values: [
                        min = Number.MIN_SAFE_INTEGER,
                        max = Number.MAX_SAFE_INTEGER
                    ]
                }
            ) => Math.min(Math.max(value, min), max),

    enum: (value, spec) => {
        for (let k in spec.values) {
            if (spec.values[k] === value) {
                return k;
            }
        }

        throw new Error(`Unable to forward-map ${value}`);
    },

    boolean: (value, spec) => spec.values[Number(!!value)],

    temperature: (value) => {
        // by the time we get here, any necessary F -> C conversion
        // has already happened.  all we need to do is round to 2
        // decimal places, remove the point.
        return value.toFixed(2).replace(/\./, '');
    },

    height: (value) => {
        // by the time we get here, any necessary m -> ft conversion
        // will have already happened.  all we need to do is roud to
        // 2 decimal places and remove the point.
        return value.toFixed(2).replace(/\./, '');
    },

    string: (value) => value.toString(),
}

function validateAndMap(path, value) {
    let spec =
        path.reduce(
            (acc, k) => acc[k],
            commands
        ).meta;

    if (spec.type in validators && spec.type in forwardMappings)
    {
        if (validators[spec.type](value, spec)) {
            return forwardMappings[spec.type](value, spec);
        }
        else {
            throw new Error(`Value ${value} does not match its spec`);
        }
    }

    throw new Error("I don't know this type: " + spec.type);
}

function mapForward(path, value) {
    let spec =
        path.reduce(
            (acc, k) => acc[k],
            commands
        ).meta;

    if (spec.type in forwardMappings) {
        return forwardMappings[spec.type](value, spec);
    }

    throw new Error("I don't know this type: " + spec.type);
}

const reverseMappings = {
    number: v => Number(v),
    string: v => v,
    boolean: (value, spec) => {
        let idx = spec.values.indexOf(value);
        return idx >= 0 && !!idx
    },

    enum: (value, spec) => spec.values[value],

    power: (value) => {
        return { ON: 'on', OFF: 'off' }[value];
    },

    temperature: (value) => {
        return Number(value.replace(/(\d*)(\d{2})$/, '$1.$2'));
    },

    height: (value) => {
        return Number(value.replace(/(\d*)(\d{2})$/, '$1.$2'));
    }
};

function mapBack(path, value) {
    let spec =
        path.reduce(
            (acc, k) => {
                if (!acc.meta.paths && !acc.meta.path) {
                    return acc[k]
                }
                return acc;
            },
            commands
        ).meta;

    if (spec && spec.type in reverseMappings) {
        return reverseMappings[spec.type](value, spec);
    }

    throw new Error("I don't know this type: " + spec.type);
}

export {
    validateAndMap,
    mapBack,
    mapForward
}
