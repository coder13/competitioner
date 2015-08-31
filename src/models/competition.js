var Model = require('ampersand-model');
var Competitor = require('./competitor.js');
var Competitors = require('./competitor-collection.js');

// Competition file. Will contain a list of competitiors and th
module.exports = Model.extend({
	props: {
		name: 'string',
		id: 'number',
		events: {
			type: 'array',
			default: (() => [])
		}
	},
	collections: {
		competitors: Competitors
	},

	initialize () {
		if (!this.competitors) {
			this.competitors = new Competitors();
		}
		// this.on('all', function (name, event) {
		// 	console.log(name, event);
		// 	// this.collection.trigger(name, event);
		// }, this);
	},

	addEvent(event) {
		this.events.push(event);
		this.trigger('change:event', this.events);
	},

	removeEvent(event) {
		_.pull(this.events, event);
		this.trigger('change:event', this.events);
	},

	getEvent(event) {
		return this.competitors.getEvent(event);
	},

	addCompetitor () {
		var id = this.competitors.length;
		var competitor = new Competitor({
			_id: id,
			id: id,
			username: 'user_' + id
		});

		this.competitors.add(competitor);
		return competitor;
	}
});
