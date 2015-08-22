var _  = require('lodash');
var React = require('react');
var ampersandMixin = require('ampersand-react-mixin');

// Competitors component. Will display list of competitors.
module.exports = React.createClass({
	mixins: [ampersandMixin],

	getUsers() {
		var users = {};
		this.props.competitions.forEach(function (comp) {
			comp.users.forEach(function (user) {
				users[user.name] = (users[user.name] ? users[user.name] : 0) + user.points;	
			});
		});

		return _.map(users, function (points, user) {
			return [{username: user, points: points}];
		});
	},

	render: function () {
		var users = this.getUsers();
		console.log(24, users);
		return (
			<div>
				{users.map((user) => {
					<p>
						<span className='username'>{user.username}</span> 
						<span className='points'>{user.points}</span>
					</p>
				})}
			</div>
		);
	}
});
