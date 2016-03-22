import Em from 'ember';
import { ArrayController } from 'ember-legacy-controllers';
var get = Em.get;
var copy = Em.copy;

var ArrayPauser = ArrayController.extend({
	isPaused: false,

	buffer: Em.computed(function () {
		return Em.A();
	}),

	addToBuffer: function (idx, removedCount, added) {
		var buffer = get(this, 'buffer');
		buffer.pushObject([idx, removedCount, added]);
	},

	clearBuffer: Em.observer('isPaused', function () {
		var buffer = get(this, 'buffer');
		var arrangedContent = get(this, 'arrangedContent');
		buffer.forEach((args) => {
			arrangedContent.replace(...args);
		});
		buffer.clear();
	}),

	arrangedContent: Em.computed('content', function () {
		var content = get(this, 'content');
		var clone = copy(content);
		return clone;
	}),

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
