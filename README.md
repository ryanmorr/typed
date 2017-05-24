# typed

[![Version Badge][version-image]][project-url]
[![Build Status][build-image]][build-url]
[![Dependencies][dependencies-image]][project-url]
[![License][license-image]][license-url]
[![File Size][file-size-image]][project-url]

> Statically typed properties for object literals

## Usage

Map properties to a native data type:

```javascript
const object = typed({
    foo: String,
    bar: Number 
});

object.foo = 'foo';
object.bar = 123;
```

Constrain a property to a user-defined constructor:

```javascript
function Foo() {}

const object = typed({
    foo: Foo
});

object.foo = new Foo();
```

If a value of the wrong type is assigned to a property, a `TypeError` will be thrown:

```javascript
const object = typed({
    foo: String
});

object.foo = 123 // throws: Invalid value assignment on "foo", expected: String, actual: Number
```

## Installation

Typed is [CommonJS](http://www.commonjs.org/) and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compatible with no dependencies. You can download the [development](http://github.com/ryanmorr/typed/raw/master/dist/typed.js) or [minified](http://github.com/ryanmorr/typed/raw/master/dist/typed.min.js) version, or install it in one of the following ways:

``` sh
npm install ryanmorr/typed

bower install ryanmorr/typed
```

## Tests

Run unit tests by issuing the following commands:

``` sh
npm install
npm install -g gulp
gulp test
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/typed
[version-image]: https://badge.fury.io/gh/ryanmorr%2Ftyped.svg
[build-url]: https://travis-ci.org/ryanmorr/typed
[build-image]: https://travis-ci.org/ryanmorr/typed.svg
[dependencies-image]: https://david-dm.org/ryanmorr/typed.svg
[license-image]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: UNLICENSE
[file-size-image]: https://badge-size.herokuapp.com/ryanmorr/typed/master/dist/typed.min.js.svg?color=blue&label=file%20size