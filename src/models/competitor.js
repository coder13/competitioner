const _ = require('lodash');
const app = require('ampersand-app');
const Model = require('ampersand-model');

// Competitor file. Will contain a username and the user's result per event
// Each one of these exists per competition per user.
module.exports = Model.extend({
	props: {
		id: 'number',
		name: 'string',
		events: {
			type: 'array',
			default: (() => [])
		}
	},

	remove () {
		this.collection.remove(this);
	},

	addEvent (name, result) {
		if (_.findWhere(this.events, {name: name})) {
			_.findWhere(this.events, {name: name}).result = result;
		} else {
			this.events.push({
				name: name,
				result: result
			});
		}
		this.trigger('change:event', {name: name, result: result});
	},

	removeEvent (event) {
		_.remove(this.events, {name: event.name});
		this.trigger('change:event', event);
	}
});
