const Model = require('ampersand-model');
const Competition = require('./competition');
const Competitions = require('./competition-collection');

module.exports = Model.extend({
	props: {
		name: 'string',	// For later use if we want to include an option to randomly select a winner excluding you.
	},

	collections: {
		competitions: Competitions
	},

	initialize () {
		this.competitions = new Competitions();
		
		this.competitions.on('all', function (name, event) {
			this.save();
		}, this);
		
		this.load();	// Load competitions
		this.save();	// Save competitions if it didn't already exist.
	},

	save () {
		console.log('saving...');
		localStorage['competitions'] = JSON.stringify(this.competitions);
	},

	load () {
		if (window.localStorage.getItem('competitions')) {
			let comps = JSON.parse(window.localStorage.getItem('competitions'));
			this.competitions.set(comps);
		}
	},

	addComp () {
		let id = this.competitions.length;
		while (this.competitions.get(id)) {
			id += 1;
		}
		let comp = new Competition({
			_id: id,
			id: id,
			name: 'Competition ' + id
		});

		this.competitions.add(comp);
		this.save();
		return comp;
	},

	getComp (id) {
		return this.competitions.get(id);
	},

	removeComp (comp) {
		this.competitions.remove(comp);
		this.save();
	}
});
