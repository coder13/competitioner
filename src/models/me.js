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
		
		console.log(this.competitions);
		this.competitions.on('all', function (name, event) {
			console.log(name, event);
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
			console.log(34, comps);
			this.competitions.set(comps);
			console.log(36, this.competitions);
		}
	},

	addComp () {
		var id = this.competitions.length;
		console.log(39, this.competitions.get(id));
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
