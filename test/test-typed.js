/* eslint-disable max-len, no-unused-expressions */

import { expect } from 'chai';
import typed from '../src/typed';

function errorMsg(prop, expected, actual) {
    return 'Invalid value assignment on "' + prop + '", expected: ' + expected + ', actual: ' + actual;
}

describe('typed', () => {
    it('should return undefined before a value is assigned', () => {
        const obj = typed({
            foo: String
        });
        expect(obj.foo).to.equal(undefined);
    });

    describe('strings', () => {
        const obj = typed({
            foo: String
        });

        const string = 'foo';

        it('should allow a string value to be set on the property', () => {
            const set = () => {
                obj.foo = string;
            };
            expect(set).to.not.throw();
            expect(obj.foo).to.equal(string);
        });

        it('should not allow a non-string value to be set on the property', () => {
            const set = () => {
                obj.foo = 123;
            };
            expect(set).to.throw(TypeError, errorMsg('foo', 'String', 'Number'));
            expect(obj.foo).to.equal(string);
        });
    });

    describe('numbers', () => {
        const obj = typed({
            foo: Number
        });

        const number = 1;

        it('should allow a number value to be set on the property', () => {
            const set = () => {
                obj.foo = number;
            };
            expect(set).to.not.throw();
            expect(obj.foo).to.equal(number);
        });

        it('should not allow a non-number value to be set on the property', () => {
            const set = () => {
                obj.foo = true;
            };
            expect(set).to.throw(TypeError, errorMsg('foo', 'Number', 'Boolean'));
            expect(obj.foo).to.equal(number);
        });
    });

    describe('booleans', () => {
        const obj = typed({
            foo: Boolean
        });

        const bool = false;

        it('should allow a boolean value to be set on the property', () => {
            const set = () => {
                obj.foo = bool;
            };
            expect(set).to.not.throw();
            expect(obj.foo).to.equal(bool);
        });

        it('should not allow a non-boolean value to be set on the property', () => {
            const set = () => {
                obj.foo = [];
            };
            expect(set).to.throw(TypeError, errorMsg('foo', 'Boolean', 'Array'));
            expect(obj.foo).to.equal(bool);
        });
    });

    describe('arrays', () => {
        const obj = typed({
            foo: Array
        });

        const array = [1, 2, 3];

        it('should allow an array value to be set on the property', () => {
            const set = () => {
                obj.foo = array;
            };
            expect(set).to.not.throw();
            expect(obj.foo).to.equal(array);
        });

        it('should not allow a non-array value to be set on the property', () => {
            const set = () => {
                obj.foo = {};
            };
            expect(set).to.throw(TypeError, errorMsg('foo', 'Array', 'Object'));
            expect(obj.foo).to.equal(array);
        });
    });

    describe('objects', () => {
        const obj = typed({
            foo: Object
        });

        const map = {name: 'John'};

        it('should allow a object literal value to be set on the property', () => {
            const set = () => {
                obj.foo = map;
            };
            expect(set).to.not.throw();
            expect(obj.foo).to.equal(map);
        });

        it('should not allow a non-object literal value to be set on the property', () => {
            const set = () => {
                obj.foo = 'foo';
            };
            expect(set).to.throw(TypeError, errorMsg('foo', 'Object', 'String'));
            expect(obj.foo).to.equal(map);
        });
    });

    describe('functions', () => {
        const obj = typed({
            foo: Function
        });

        const fn = () => {
            return;
        };

        it('should allow a function value to be set on the property', () => {
            const set = () => {
                obj.foo = fn;
            };
            expect(set).to.not.throw();
            expect(obj.foo).to.equal(fn);
        });

        it('should not allow a non-function value to be set on the property', () => {
            const set = () => {
                obj.foo = false;
            };
            expect(set).to.throw(TypeError, errorMsg('foo', 'Function', 'Boolean'));
            expect(obj.foo).to.equal(fn);
        });
    });

    describe('dates', () => {
        const obj = typed({
            foo: Date
        });

        const date = new Date();

        it('should allow a date value to be set on the property', () => {
            const set = () => {
                obj.foo = date;
            };
            expect(set).to.not.throw();
            expect(obj.foo).to.equal(date);
        });

        it('should not allow a non-date value to be set on the property', () => {
            const set = () => {
                obj.foo = 123;
            };
            expect(set).to.throw(TypeError, errorMsg('foo', 'Date', 'Number'));
            expect(obj.foo).to.equal(date);
        });
    });

    describe('user-defined constructors', () => {
        function CustomConstructor() {}

        const obj = typed({
            foo: CustomConstructor
        });

        const instance = new CustomConstructor();

        it('should allow an instance value to be set on the property', () => {
            const set = () => {
                obj.foo = instance;
            };
            expect(set).to.not.throw();
            expect(obj.foo).to.equal(instance);
        });

        it('should not allow a non-instance value to be set on the property', () => {
            const set = () => {
                obj.foo = [];
            };
            expect(set).to.throw(TypeError, errorMsg('foo', 'CustomConstructor', 'Array'));
            expect(obj.foo).to.equal(instance);
        });
    });
});
