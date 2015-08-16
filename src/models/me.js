var Collection = require('ampersand-model');
var Competition = require('./competition.js');
var Competitions = require('./competitions.js');

module.exports = Collection.extend({
	mainIndex: '_id',

	initialze () {
	},

	props: {
		name: 'string',	// For later use if we want to include an option to randomly select a winner excluding you.
	},

	collections: {
		competitions: Competitions
	},

	addComp () {
		var id = this.competitions.length;
		var comp = new Competition({
			_id: id,
			id: id,
			name: 'Competition ' + id
		});

		this.competitions.add(comp);
		return comp;
	},

	getComp (id) {
		return this.competitions.get(id);
	}
});
