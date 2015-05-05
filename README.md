# typed

Simple function to create object literals with statically typed properties that enforce a specific constructor type.

## Usage

The function accepts an object as the only argument that maps property names to the constructor of the type they are constrained to. Both native and user-defined constructors can be enforced on properties:

```javascript
var object = typed({
    str: String, // Enforce string
    array: Array, // Enforce array
    fn: Function, // Enforce function
    foo: Foo // Enforce an instance of the user-defined function `Foo`
});

object.str = 'foo';
object.array = [];
object.fn = 123; // TypeError
```
If a value of the wrong type is assigned to a property, a `TypeError` will be thrown with an informative error message specifying the name of the property, the expected value type, and the actual value type.

## Installation

Typed is [CommonJS](http://www.commonjs.org/) and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compatible with no dependencies. You can download the [development](http://github.com/ryanmorr/typed/raw/master/dist/typed.js) or [minified](http://github.com/ryanmorr/typed/raw/master/dist/typed.min.js) version, or install it using Bower:

``` sh
bower install ryanmorr/typed
```

## Browser Support

At present, the following browsers are targeted for support:

* Chrome 5+
* Firefox 4+
* Safari 5+
* Opera 11.6+
* Internet Explorer 9+
* Android *
* iOS *

## Tests

Open `test/runner.html` in your browser or test with PhantomJS by issuing the following commands:

``` sh
npm install
npm install -g gulp
gulp test
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).