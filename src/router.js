var app = require('ampersand-app');
var Router = require('ampersand-router');
var React = require('react');
var Layout = require('./pages/layout.js');
var IndexPage = require('./pages/index.js');
var CompetitionPage = require('./pages/competition.js');
var ExportPage = require('./pages/export.js');

module.exports = Router.extend({
	renderPage (page, opts) {
		if (true) {
			page = (
				<Layout competitions={app.me.competitions} me={app.me}>
					{page}
				</Layout>
			);
		}

		React.render(page, document.body);
	},

	routes: {
		'': 'index',
		'competition/:id': 'competition',
		'export': 'export'
	},

	index () {
		this.renderPage(<IndexPage/>, document.body);
	},

	competition (id) {
		var comp = app.me.getComp(id);
		if (!comp) {
			this.redirectTo('');
		} else {
			this.renderPage(<CompetitionPage comp={comp} name={comp.name} events={comp.events} users={comp.users}/>, document.body);
		}
	},

	export () {
		this.renderPage(<ExportPage competitions={app.me.competitions}/>, document.body);
	}
});
