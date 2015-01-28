import Em from 'ember';
import { test } from 'ember-qunit';
import ArrayPauser from 'array-pauser';

test('constructor exists', function () {
	ok(ArrayPauser, 'ArrayPauser is not null or undefined');
	equal(typeof ArrayPauser, 'function', 'ArrayPauser is function');
});

test('can be constructed', function () {
	var item = ArrayPauser.create();
	notEqual(item, undefined, 'instance is returned');
	ok(item instanceof ArrayPauser, 'returned object is instance');
});

test('inherits from ArrayProxy', function () {
	var item = ArrayPauser.create();
	ok(item instanceof Em.ArrayProxy, 'instance inherits from ArrayProxy');
});

test('is array-like', function () {
	var item = ArrayPauser.create();
	ok(Em.isArray(item), 'Em.isArray() returns true');
});

test('can be initialized with content array', function () {
	var arr = ['a', 'b', 'c'];
	var item = ArrayPauser.create({ content: arr });
	equal(item.get('length'), 3, 'instance length is 3');
	equal(item.objectAt(0), 'a', 'first item is "a"');
	equal(item.objectAt(1), 'b', 'second item is "b"');
	equal(item.objectAt(2), 'c', 'third item is "c"');
});

test('has no content array by default', function () {
	var item = ArrayPauser.create();
	var arr = item.get('content');
	ok(Em.isBlank(arr), 'Em.isBlank() returns true');
});

test('can have a content array set after init', function () {
	var item = ArrayPauser.create();
	notEqual(item.objectAt(0), 'foo', 'first element is not "foo"');
	item.set('content', ['foo']);
	equal(item.objectAt(0), 'foo', 'first element is "foo"');
});

test('watches content array when set after init', function () {
	var item = ArrayPauser.create();
	var arr = Em.A();
	item.set('content', arr);
	arr.pushObject('bar');
	equal(item.objectAt(0), 'bar', 'first item is "bar"');
});

test('can have a content array replaced', function () {
	var item = ArrayPauser.create({ content: ['bar'] });
	equal(item.objectAt(0), 'bar', 'first item is "bar"');
	item.set('content', ['baz']);
	equal(item.objectAt(0), 'baz', 'first item is now "baz"');
});

test('is unpaused by default', function () {
	var item = ArrayPauser.create();
	equal(item.get('isPaused'), false, 'instance is not paused');
});

test('can be initialized paused', function () {
	var item = ArrayPauser.create({ isPaused: true });
	equal(item.get('isPaused'), true, 'instance is paused');
});

test('length is not changed while paused', function () {
	var arr = ['a'];
	var item = ArrayPauser.create({
		isPaused: true,
		content: arr
	});
	equal(item.get('length'), 1, 'instance has 1 member');
	arr.pushObject('b');
	arr.pushObject('c');
	equal(item.get('length'), 1, 'instance still has 1 member');
});

test('length is changed when unpaused', function () {
	var arr = ['a'];
	var item = ArrayPauser.create({
		isPaused: true,
		content: arr
	});
	equal(item.get('length'), 1, 'instance has 1 member');
	arr.pushObject('b');
	arr.pushObject('c');
	equal(item.get('length'), 1, 'instance still has 1 member');
	item.set('isPaused', false);
	equal(item.get('length'), 3, 'instance now has 3 members');
});

test('buffer is not shared by instances', function () {
	var arr = Em.A();
	var left = ArrayPauser.create({
		isPaused: true,
		content: arr
	});
	var right = ArrayPauser.create({
		isPaused: true
	});
	arr.pushObject('goes to buffer');
	notEqual(left.get('buffer'), right.get('buffer'), 'buffers are the same object');
	equal(left.get('buffer.length'), 1, 'test buffer grows');
	notEqual(right.get('buffer.length'), 1, 'test buffer does not grow');
});

test('items are added when unpaused', function () {
	var arr = Em.A(['a']);
	var item = ArrayPauser.create({
		isPaused: true,
		content: arr
	});
	arr.pushObject('b');
	equal(item.get('length'), 1, 'instance length is 3');
	arr.pushObject('c');
	equal(item.get('length'), 1, 'instance length is still 3');
	item.set('isPaused', false);
	equal(item.get('length'), 3, 'instance length is now updated');
});

test('items are removed when unpaused', function () {
	var arr = Em.A(['a', 'b', 'c']);
	var item = ArrayPauser.create({
		isPaused: true,
		content: arr
	});
	arr.popObject();
	equal(item.get('length'), 3, 'instance length is 3');
	arr.popObject();
	equal(item.get('length'), 3, 'instance length is still 3');
	item.set('isPaused', false);
	equal(item.get('length'), 1, 'instance length is now updated');
});
