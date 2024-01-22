function error(prop, expected, actual) {
    throw new TypeError(`Invalid value assignment on "${prop}", expected: ${expected}, actual: ${actual}`);
}

function getType(value) {
    const type = value === null ? 'null' : typeof value;
    if (type == 'string' || type == 'number' || type == 'boolean' || type == 'undefined' || type == 'null') {
        return type[0].toUpperCase() + type.slice(1);
    }
    return value.constructor.name;
}

function getValidator(prop, constructor) {
    const constructorName = constructor.name;
    if (constructor === String || constructor === Number || constructor === Boolean) {
        return (value) => {
            if (typeof value !== constructorName.toLowerCase()) {
                error(prop, constructorName, getType(value));
            }
            return true;
        };
    }
    return (value) => {
        if (!(value instanceof constructor)) {
            error(prop, constructorName, getType(value));
        }
        return true;
    };
}

function defineProperty(object, name, constructor) {
    let value;
    const validate = getValidator(name, constructor);
    Object.defineProperty(object, name, {
        enumerable: true,
        configurable: true,
        get() {
            return value;
        },
        set(val) {
            if (validate(val)) {
                value = val;
            }
        }
    });
}

export default function typed(props) {
    const object = {};
    Object.keys(props).forEach((prop) => defineProperty(object, prop, props[prop]));
    return object;
}
