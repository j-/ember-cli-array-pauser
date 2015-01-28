import Em from 'ember';
var get = Em.get;
var copy = Em.copy;

var ArrayPauser = Em.ArrayProxy.extend({
	isPaused: false,

	buffer: function () {
		return Em.A();
	}.property(),

	addToBuffer: function (idx, removedCount, added) {
		var buffer = get(this, 'buffer');
		buffer.pushObject([idx, removedCount, added]);
	},

	clearBuffer: function () {
		var buffer = get(this, 'buffer');
		var arrangedContent = get(this, 'arrangedContent');
		buffer.forEach(function (args) {
			arrangedContent.replace(args[0], args[1], args[2]);
		});
		buffer.clear();
	}.observes('isPaused'),

	arrangedContent: function () {
		var content = get(this, 'content');
		var clone = copy(content);
		return clone;
	}.property('content'),

	contentArrayDidChange: function (arr, idx, removedCount, addedCount) {
		var added = arr.slice(idx, idx + addedCount);
		var isPaused = get(this, 'isPaused');
		var arrangedContent;
		if (isPaused) {
			this.addToBuffer(idx, removedCount, added);
		}
		else {
			arrangedContent = get(this, 'arrangedContent');
			arrangedContent.replace(idx, removedCount, added);
		}
	}
});

export default ArrayPauser;
