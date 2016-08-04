/*! typed v2.0.0 | https://github.com/ryanmorr/typed */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.typed = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Common variables
 */
var has = {}.hasOwnProperty;
var toString = {}.toString;
var functionNameRe = /function\s+([^(]+)/;
var nativeTypes = {
    Array: Array,
    Boolean: Boolean,
    Date: Date,
    Function: Function,
    Number: Number,
    Object: Object,
    RegExp: RegExp,
    String: String
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
    var object = {};
    for (var prop in properties) {
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
    var value = void 0;
    var validate = getValidator(name, type);
    Object.defineProperty(object, name, {
        enumerable: true,
        configurable: true,
        get: function get() {
            return value;
        },
        set: function set(val) {
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
    var valueType = void 0;
    var type = getConstructorType(constructor);
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
    for (var type in nativeTypes) {
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
    throw new TypeError('Invalid value assignment on "' + prop + '", expected: ' + expected + ', actual: ' + actual);
}

/**
 * Export `typed`
 */
exports.default = typed;
module.exports = exports['default'];

},{}]},{},[1])(1)
});

