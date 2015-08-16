var Model = require('ampersand-model');
var Competitor = require('./competitor.js');

// Competition file. Will contain a list of competitiors and th
module.exports = Model.extend({
	props: {
		name: 'string',
		id: 'number',
		users: {
			type: 'array',
			default: (() => [])
		},
		events: {
			type: 'array',
			default: (() => [])
		}
	},

	initialize () {
		this.events = [];

	},

	addUser () {
		this.users.push(new Competitor());
	}

});
