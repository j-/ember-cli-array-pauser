import Em from 'ember';
import { ArrayController } from 'ember-legacy-controllers';

const ArrayPauser = ArrayController.extend({
	isPaused: false,

	buffer: Em.computed(function () {
		return Em.A();
	}),

	addToBuffer: function (idx, removedCount, added) {
		const buffer = this.get('buffer');
		buffer.pushObject([idx, removedCount, added]);
	},

	clearBuffer: Em.observer('isPaused', function () {
		const buffer = this.get('buffer');
		const arrangedContent = this.get('arrangedContent');
		buffer.forEach((args) => {
			arrangedContent.replace(...args);
		});
		buffer.clear();
	}),

	arrangedContent: Em.computed('content', function () {
		const content = this.get('content');
		const clone = Em.copy(content);
		return clone;
	}),

	contentArrayDidChange: function (arr, idx, removedCount, addedCount) {
		const added = arr.slice(idx, idx + addedCount);
		const isPaused = this.get('isPaused');
		let arrangedContent;
		if (isPaused) {
			this.addToBuffer(idx, removedCount, added);
		}
		else {
			arrangedContent = this.get('arrangedContent');
			arrangedContent.replace(idx, removedCount, added);
		}
	},
});

export default ArrayPauser;
