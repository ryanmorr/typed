import { expect } from 'chai';
import typed from '../../src/typed.js';

function errorMsg(prop, expected, actual) {
    return `Invalid value assignment on "${prop}", expected: ${expected}, actual: ${actual}`;
}

describe('typed', () => {
    it('should set property to undefined as default value', () => {
        const obj = typed({
            value: String
        });

        expect(obj.value).to.equal(undefined);
    });

    it('should allow a string value to be set on the property', () => {
        const obj = typed({
            value: String
        });

        const set = () => obj.value = 'foo';

        expect(set).to.not.throw();
        expect(obj.value).to.equal('foo');
    });

    it('should not allow a non-string value to be set on the property', () => {
        const obj = typed({
            value: String
        });

        obj.value = 'foo';
        
        const set = () => obj.value = null;

        expect(set).to.throw(TypeError, errorMsg('value', 'String', 'Null'));
        expect(obj.value).to.equal('foo');
    });

    it('should allow a number value to be set on the property', () => {
        const obj = typed({
            value: Number
        });

        const set = () => obj.value = 1;

        expect(set).to.not.throw();
        expect(obj.value).to.equal(1);
    });

    it('should not allow a non-number value to be set on the property', () => {
        const obj = typed({
            value: Number
        });

        obj.value = 1;

        const set = () => obj.value = undefined;

        expect(set).to.throw(TypeError, errorMsg('value', 'Number', 'Undefined'));
        expect(obj.value).to.equal(1);
    });

    it('should allow a boolean value to be set on the property', () => {
        const obj = typed({
            value: Boolean
        });

        const set = () => obj.value = true;

        expect(set).to.not.throw();
        expect(obj.value).to.equal(true);
    });

    it('should not allow a non-boolean value to be set on the property', () => {
        const obj = typed({
            value: Boolean
        });

        obj.value = true;

        const set = () => obj.value = [];

        expect(set).to.throw(TypeError, errorMsg('value', 'Boolean', 'Array'));
        expect(obj.value).to.equal(true);
    });

    it('should allow an array value to be set on the property', () => {
        const obj = typed({
            value: Array
        });

        const array = [1, 2, 3];

        const set = () => obj.value = array;

        expect(set).to.not.throw();
        expect(obj.value).to.equal(array);
    });

    it('should not allow a non-array value to be set on the property', () => {
        const obj = typed({
            value: Array
        });

        const array = [1, 2, 3];

        obj.value = array;

        const set = () => obj.value = {};

        expect(set).to.throw(TypeError, errorMsg('value', 'Array', 'Object'));
        expect(obj.value).to.equal(array);
    });

    it('should allow a object literal value to be set on the property', () => {
        const obj = typed({
            value: Object
        });

        const map = {foo: 'bar'};

        const set = () => obj.value = map;

        expect(set).to.not.throw();
        expect(obj.value).to.equal(map);
    });

    it('should not allow a non-object literal value to be set on the property', () => {
        const obj = typed({
            value: Object
        });

        const map = {foo: 'bar'};

        obj.value = map;

        const set = () => obj.value = 'value';

        expect(set).to.throw(TypeError, errorMsg('value', 'Object', 'String'));
        expect(obj.value).to.equal(map);
    });

    it('should allow a function value to be set on the property', () => {
        const obj = typed({
            value: Function
        });

        const fn = () => 1;

        const set = () => obj.value = fn;

        expect(set).to.not.throw();
        expect(obj.value).to.equal(fn);
    });

    it('should not allow a non-function value to be set on the property', () => {
        const obj = typed({
            value: Function
        });

        const fn = () => 1;

        obj.value = fn;

        const set = () => obj.value = false;

        expect(set).to.throw(TypeError, errorMsg('value', 'Function', 'Boolean'));
        expect(obj.value).to.equal(fn);
    });

    it('should allow a date value to be set on the property', () => {
        const obj = typed({
            value: Date
        });

        const date = new Date();

        const set = () => obj.value = date;

        expect(set).to.not.throw();
        expect(obj.value).to.equal(date);
    });

    it('should not allow a non-date value to be set on the property', () => {
        const obj = typed({
            value: Date
        });

        const date = new Date();

        obj.value = date

        const set = () => obj.value = 123;

        expect(set).to.throw(TypeError, errorMsg('value', 'Date', 'Number'));
        expect(obj.value).to.equal(date);
    });

    it('should allow an instance value to be set on the property', () => {
        function CustomConstructor() {}

        const obj = typed({
            value: CustomConstructor
        });

        const instance = new CustomConstructor();

        const set = () => obj.value = instance;

        expect(set).to.not.throw();
        expect(obj.value).to.equal(instance);
    });

    it('should not allow a non-instance value to be set on the property', () => {
        function CustomConstructor() {}

        const obj = typed({
            value: CustomConstructor
        });

        const instance = new CustomConstructor();

        obj.value = instance;

        const set = () => obj.value = [];

        expect(set).to.throw(TypeError, errorMsg('value', 'CustomConstructor', 'Array'));
        expect(obj.value).to.equal(instance);
    });
});
