import Em from 'ember';
import ArrayPauser from 'array-pauser';

export default Em.Controller.extend({
	stream: function () {
		var context = this;
		var arr = Em.A();
		var addItem = function () {
			var i = context.incrementProperty('i');
			arr.pushObject(i);
			setTimeout(addItem, 500);
		};
		addItem();
		return arr;
	}.property('init'),

	messages: function () {
		return ArrayPauser.create({
			content: this.get('stream')
		});
	}.property('stream'),

	setPauseState: function () {
		var paused = this.get('messages.isPaused');
		console.log('messages %s', paused ? 'paused': 'unpaused');
	}.observes('messages.isPaused'),

	actions: {
		toggle: function () {
			var messages = this.get('messages');
			messages.set('isPaused', !messages.get('isPaused'));
		},
		pause: function () {
			var messages = this.get('messages');
			messages.set('isPaused', true);
		},
		unpause: function () {
			var messages = this.get('messages');
			messages.set('isPaused', false);
		},
		clear: function () {
			var stream = this.get('stream');
			stream.clear();
		}
	}
});
