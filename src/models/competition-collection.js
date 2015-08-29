var _ = require('lodash');
var Collection = require('ampersand-collection');
var Competition = require('./competition.js');

export default Collection.extend({
	model: Competition,

	initialize () {
		this.on('all', function (name, event) {
			console.log(name, event);
		}, this);
	},

	last () {
		return this.models[this.models.length-1];
	},

	allButLast () {
		return _.dropRight(this.models, 1);
	}
});
