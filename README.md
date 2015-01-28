# ember-cli-array-pauser

[![master branch build status](https://travis-ci.org/j-/ember-cli-array-pauser.svg?branch=master)](https://travis-ci.org/j-/ember-cli-array-pauser)

Ember CLI array pauser addon.

`ember-cli-array-pauser` exposes an [Ember][ember] [ArrayProxy][proxy] subclass
which can be paused and resumed.

## Example

```js
import Ember from 'ember';
import ArrayPauser from 'array-pauser';

var arr = Ember.A(['original']);
var stream = ArrayPauser.create({
	content: arr
});

arr.pushObject('to remove');
arr.pushObject('to change');
console.log(stream.toArray()); // ['original', 'to remove', 'to change']
stream.set('isPaused', true);
arr.replace(2, 'changed');
arr.pushObject('new item');
arr.removeObject('to remove');
console.log(stream.toArray()); // ['original', 'to remove', 'to change']
stream.set('isPaused', false);
console.log(stream.toArray()); // ['original', 'changed', 'new item']
```

## Properties

**`content`**: Ember.Array (optional, default = `null`)

The content array. Must be an object that implements `Ember.Array` and/or
`Ember.MutableArray`. See [`Ember.ArrayProxy#content`][content].

**`isPaused`**: Boolean (optional, default = `false`)

This value determines the pause state of this array proxy.

## Installing

With [npm][npm]:

```sh
$ npm install --save ember-cli-array-pauser
```

Or with [Ember CLI][cli]:

```sh
$ ember install:npm ember-cli-array-pauser
```

## License

[MIT license](LICENSE.md).

[ember]: http://emberjs.com/
[proxy]: http://emberjs.com/api/classes/Ember.ArrayProxy.html
[slice]: https://github.com/j-/ember-cli-array-slice
[content]: http://emberjs.com/api/classes/Ember.ArrayProxy.html#property_content
[npm]: https://www.npmjs.com/
[cli]: http://www.ember-cli.com/
