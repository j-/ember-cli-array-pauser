import Em from 'ember';
import ArrayPauser from 'array-pauser';

export default Em.Controller.extend({
	stream: function () {
		const arr = Em.A();
		const addItem = () => {
			let i = this.incrementProperty('i');
			arr.pushObject(i);
			setTimeout(addItem, 500);
		};
		addItem();
		return arr;
	}.property('init'),

	messages: function () {
		return ArrayPauser.create({
			content: this.get('stream'),
		});
	}.property('stream'),

	setPauseState: function () {
		const paused = this.get('messages.isPaused');
		console.log('messages %s', paused ? 'paused': 'unpaused');
	}.observes('messages.isPaused'),

	actions: {
		toggle: function () {
			const messages = this.get('messages');
			messages.set('isPaused', !messages.get('isPaused'));
		},
		pause: function () {
			const messages = this.get('messages');
			messages.set('isPaused', true);
		},
		unpause: function () {
			const messages = this.get('messages');
			messages.set('isPaused', false);
		},
		clear: function () {
			const stream = this.get('stream');
			stream.clear();
		},
	},
});
