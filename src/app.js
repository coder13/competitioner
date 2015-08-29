require('./styles/main.styl');
var App = require('ampersand-app');
var Router = require('./router');
var Me = require('./models/me.js');

if (typeof window !== 'undefined') {
	window.React = require('react');;
}

var app = window.app = App.extend({
	init: function () {
		this.me = new Me();
		this.router = new Router();
		this.router.history.start();
	}
});

app.on('newComp', function (event) {
	event.preventDefault()
	var comp = app.me.addComp().id;
	console.log('newComp', comp);
	app.router.history.navigate('competition/' + comp);
});

app.init();
