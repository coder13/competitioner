require('./styles/main.styl');
const App = require('ampersand-app');
const Router = require('./router');
const Me = require('./models/me');
const Competitions = require('./models/competition-collection');

if (typeof window !== 'undefined') {
	window.React = require('react');
}

const app = window.app = App.extend({
	init () {
		this.me = new Me();
		this.router = new Router();
		this.router.history.start();
	},

	createComp () {
		let comp = this.me.addComp();
		this.router.history.navigate(`competition/${comp.id}`);
		return comp;
	},

	deleteComp (comp) {
		this.me.removeComp(comp);
		if (this.me.competitions.length === 0) {
			this.router.history.navigate('/');
		}
		return comp;
	},

	sync (data) {
		console.log('sync', data);
		this.me.competitions.import(data);
	}
});

app.init();
