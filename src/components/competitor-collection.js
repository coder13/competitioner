var _  = require('lodash');
var React = require('react');
var ampersandMixin = require('ampersand-react-mixin');

// Competitors component. Will display list of competitors.
module.exports = React.createClass({
	mixins: [ampersandMixin],
	displayName: 'Competitors',

	getCompetitors() {
		var competitors = {};
		
		this.props.competitions.forEach(function (comp) {
			comp.events.forEach(function (event) {
				comp.competitors.getEvent(event).forEach(function (user, index, users) {
					if (!competitors[user.name]) {
						competitors[user.name] = 0;
					}
					competitors[user.name] += (users.length - index);
				});
			});
		});

		return _.map(competitors, function (points, user) {
			return {name: user, points: points};
		});
	},

	render: function () {
		var competitors = this.getCompetitors();
		console.log(36, competitors);
		return (
			<div>
				{competitors.map((user, i) => (
					<li key={i} style={{width: '100%', marginTop: '0', marginBottom: '0', padding: '2px'}}>
						<span style={{fontWeight: 'bold', minWidth: '75px', display: 'inline-block', textAlign: 'right', marginRight: '.5em'}} className='username'>{user.name + ': '}</span>
						<span style={{color: 'grey', paddingRight: '10px'}} className='points'>{user.points}</span>
					</li>))}
			</div>
		);
	}
});
