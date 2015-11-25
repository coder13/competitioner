var app = require('ampersand-app');
var Competitions = require('./models/competition-collection');

/*
	Single place where all the actions are. You can see every single thing that can happen in the app.
*/

var _actions = {};

_actions.create_comp = function (data) {
	var comp = app.me.addComp();
	app.router.history.navigate(`competition/${comp.id}`);
	return comp;
};

_actions.delete_comp = function (data) {
	app.me.competitions.remove(data.comp);
	if (app.me.competitions.length === 0) {
		app.router.history.navigate('/');
	}
	return comp;
};

_actions.sync = function (data) {
	console.log(data);
	app.me.competitions = new Com
};

app.register(function (payload) {
	if (_actions[payload.action]) {
		return _actions[payload.action](payload.data);
	}
});
