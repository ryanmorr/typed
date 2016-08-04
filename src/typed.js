/**
 * Common variables
 */
const has = {}.hasOwnProperty;
const toString = {}.toString;
const functionNameRe = /function\s+([^(]+)/;
const nativeTypes = {
    Array,
    Boolean,
    Date,
    Function,
    Number,
    Object,
    RegExp,
    String
};

/**
 * Takes an object literal that maps
 * properties to constructors to
 * establish the type
 *
 * Example:
 *
 * typed({
 *   foo: String
 * });
 *
 * @param {Object} properties
 * @return {Object}
 * @api public
 */
function typed(properties) {
    const object = {};
    for (const prop in properties) {
        if (has.call(properties, prop)) {
            defineProperty(object, prop, properties[prop]);
        }
    }
    return object;
}

/**
 * Define a property on an object literal
 * that enforces the provided type
 *
 * @param {Object} object
 * @param {String} name
 * @param {Function} type
 * @api private
 */
function defineProperty(object, name, type) {
    let value;
    const validate = getValidator(name, type);
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

/**
 * Get a function capable of validating
 * any values assigned to the property
 *
 * @param {String} prop
 * @param {Function} constructor
 * @api private
 */
function getValidator(prop, constructor) {
    let valueType;
    const type = getConstructorType(constructor);
    // Validate native instances
    if (type) {
        return function validateNative(value) {
            valueType = getType(value);
            if (valueType !== type) {
                error(prop, type, valueType);
            }
            return true;
        };
    }
    // Validate user-defined constructor instances
    return function validateUserDefined(value) {
        if (!(value instanceof constructor)) {
            error(prop, getFunctionName(constructor), getType(value));
        }
        return true;
    };
}

/**
 * Get the internal [[Class]] property
 * of an object to resolve its type
 *
 * @param {*} obj
 * @return {String}
 * @api private
 */
function getType(obj) {
    return toString.call(obj).slice(8, -1);
}

/**
 * Get the string name for a native
 * constructor
 *
 * @param {Function} constructor
 * @return {String}
 * @api private
 */
function getConstructorType(constructor) {
    for (const type in nativeTypes) {
        if (has.call(nativeTypes, type)) {
            if (constructor === nativeTypes[type]) {
                return type;
            }
        }
    }
    return null;
}

/**
 * Get the name of a user defined
 * constructor function
 *
 * @param {Function} fn
 * @return {String}
 * @api private
 */
function getFunctionName(fn) {
    return fn.name || fn.toString().match(functionNameRe)[1] || 'anonymous';
}

/**
 * Throw an error for an invalid
 * value assignment after a property
 * is assigned a value of the wrong
 * type
 *
 * @param {String} prop
 * @param {String} expected
 * @param {String} actual
 * @api private
 */
function error(prop, expected, actual) {
    throw new TypeError(
        `Invalid value assignment on "${prop}", expected: ${expected}, actual: ${actual}`
    );
}

/**
 * Export `typed`
 */
export default typed;
