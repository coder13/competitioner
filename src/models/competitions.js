var Collection = require('ampersand-collection');
var Competition = require('./competition.js');

export default Collection.extend({
	model: Competition,

	// Exports the past competitions into a single piece of text to be posted.
	export () {

	}
})
