var _ = require('lodash');
var Collection = require('ampersand-collection');
var Competitor = require('./competitor.js');

// List of competitors. Each one is bound to an event.
export default Collection.extend({
	model: Competitor,
	initialize () {
		this.on('all', function (name, event) {
			console.log(name, event);
			this.parent.trigger(name, event);
		}, this);
	},

	// Returns a sorted list of players per the event.
	getEvent(event) {
		var users = [];
		this.forEach(function (user) {
			if (_.findWhere(user.events, {name: event})) {
				users.push({
					name: user.name,
					time: _.findWhere(user.events, {name: event}).result
				})
			}
		});

		// TODO: sort array.
		users = _.sortBy(users, function (competitor) {
			return competitor.time;
		});

		return users;
	}
})
