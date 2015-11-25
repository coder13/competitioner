const Model = require('ampersand-model');
const Competitor = require('./competitor');
const Competitors = require('./competitor-collection');

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
		this.reset();
	},

	reset () {
		if (!this.competitors) {
			this.competitors = new Competitors();
		}
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
		let id = this.competitors.length;
		let competitor = new Competitor({
			_id: id,
			id: id,
			username: 'user_' + id
		});

		this.competitors.add(competitor);
		return competitor;
	}
});
