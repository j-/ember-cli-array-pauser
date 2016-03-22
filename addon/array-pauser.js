import Em from 'ember';
import { ArrayController } from 'ember-legacy-controllers';
const get = Em.get;
const copy = Em.copy;

const ArrayPauser = ArrayController.extend({
	isPaused: false,

	buffer: Em.computed(function () {
		return Em.A();
	}),

	addToBuffer: function (idx, removedCount, added) {
		const buffer = get(this, 'buffer');
		buffer.pushObject([idx, removedCount, added]);
	},

	clearBuffer: Em.observer('isPaused', function () {
		const buffer = get(this, 'buffer');
		const arrangedContent = get(this, 'arrangedContent');
		buffer.forEach((args) => {
			arrangedContent.replace(...args);
		});
		buffer.clear();
	}),

	arrangedContent: Em.computed('content', function () {
		const content = get(this, 'content');
		const clone = copy(content);
		return clone;
	}),

	contentArrayDidChange: function (arr, idx, removedCount, addedCount) {
		const added = arr.slice(idx, idx + addedCount);
		const isPaused = get(this, 'isPaused');
		let arrangedContent;
		if (isPaused) {
			this.addToBuffer(idx, removedCount, added);
		}
		else {
			arrangedContent = get(this, 'arrangedContent');
			arrangedContent.replace(idx, removedCount, added);
		}
	},
});

export default ArrayPauser;
