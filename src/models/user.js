var Model = require('ampersand-model');


module.exports = Model.extend({
	props: {
		username: 'string',
		events: {
			type: 'array',
			default: (() => [])
		}
	},

	initialize () {
		
	}
});
