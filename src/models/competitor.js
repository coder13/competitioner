var _ = require('lodash');
var Model = require('ampersand-model');

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

	initialize () {
		// this.on('all', function (name, event) {
		// 	console.log(name, event);
		// }, this);
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
