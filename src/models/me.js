var Model = require('ampersand-model');
var Competition = require('./competition.js');
var Competitions = require('./competition-collection.js');

module.exports = Model.extend({
	props: {
		name: 'string',	// For later use if we want to include an option to randomly select a winner excluding you.
	},

	collections: {
		competitions: Competitions
	},

	initialize () {
		this.competitions = new Competitions();
		
		this.load();	// Load competitions
		this.save();	// Save competitions if it didn't already exist.
		
		this.competitions.on('all', function (name, event) {
			this.save();
		}, this);
	},

	save () {
		console.log('saving...');
		localStorage['competitions'] = JSON.stringify(this.competitions);
	},

	load () {
		if (window.localStorage.getItem('competitions')) {
			var comps = JSON.parse(window.localStorage.getItem('competitions'));
			this.competitions.set(comps);
		}
	},

	addComp () {
		var id = this.competitions.length;
		while (this.competitions.get(id)) {
			id += 1;
		}
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
	},

	removeComp (id) {
		this.competitions.remove({id: id});
	}
});
