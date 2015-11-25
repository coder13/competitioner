const _ = require('lodash');
const Collection = require('ampersand-collection');
const Competition = require('./competition');

const Competitions = module.exports = Collection.extend({
	model: Competition,

	import (data) {
		console.log('importing', data);
		this.reset(data);
	},

	last () {
		return this.models[this.models.length-1];
	},

	allButLast () {
		return _.dropRight(this.models, 1);
	}
});
