# typed

[![Version Badge][version-image]][project-url]
[![License][license-image]][license-url]
[![Build Status][build-image]][build-url]

> Statically typed properties for object literals

## Install

Download the [CJS](https://github.com/ryanmorr/typed/raw/master/dist/cjs/typed.js), [ESM](https://github.com/ryanmorr/typed/raw/master/dist/esm/typed.js), [UMD](https://github.com/ryanmorr/typed/raw/master/dist/umd/typed.js) versions or install via NPM:

```sh
npm install @ryanmorr/typed
```

## Usage

Restrict properties to a native data type:

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

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/typed
[version-image]: https://img.shields.io/github/package-json/v/ryanmorr/typed?color=blue&style=flat-square
[build-url]: https://github.com/ryanmorr/typed/actions
[build-image]: https://img.shields.io/github/actions/workflow/status/ryanmorr/typed/node.js.yml?style=flat-square
[license-image]: https://img.shields.io/github/license/ryanmorr/typed?color=blue&style=flat-square
[license-url]: UNLICENSE