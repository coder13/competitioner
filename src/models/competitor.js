var Model = require('ampersand-model');

// Competitor file. Will contain a username and the user's time per event
// Each one of these exists per competition per user.
module.exports = Model.extend({
	props: {
		username: 'string',
		events: {
			type: 'array',
			default: (() => [])
		}
	},

	addEvent (event, time) {
		this.events[event] = time;
	}
});
