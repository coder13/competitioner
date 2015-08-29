var React = require('react');
var utils = require('../utils.js');
var Markdown = require('react-remarkable');
var App = require('ampersand-app');

module.exports = React.createClass({
	displayName: 'ExportPage',

	renderEvent (eventName, results) {
		return `#### ${eventName}:\n
${results.map((result, index) => (
	`${index+1}. /u/${result.name}: ${utils.pretty(result.time)}\n`
)).join('\n')}`;
	},

	renderComp (comp) {
		return `${comp.name}\n
${comp.events.map((event) => (
	this.renderEvent(event, comp.getEvent(event))
), this).join('\n')}`;
	},

	renderPoints (comps) {
		var competitors = {};
		comps.forEach(function (comp) {
			comp.events.forEach(function (event) {
				comp.competitors.getEvent(event).forEach(function (user, index, users) {
					if (!competitors[user.name]) {
						competitors[user.name] = 0;
					}
					competitors[user.name] += (users.length - index);
				});
			});
		});
		return `${_.map(competitors, (points, user) => (
			`/u/${user}: ${points}\n`
		)).join('\n')}`;
	},

	export () {
		return `${this.renderComp(this.props.competitions.last())}
Point from last week:\n
${this.renderPoints(this.props.competitions.allButLast())}\n
Points from this week:\n
${this.renderPoints([this.props.competitions.last()])}\n
Formula: 1 + (Total number of people) - (place) = points\n
Total points:\n
${this.renderPoints(this.props.competitions)}
		`;
	},

	render () {
		console.log(8, this.props.competitions)

		return (
			<Markdown style={{whiteSpace: 'pre-wrap'}}>
				<h2>Export:</h2>
				{this.export()}
			</Markdown>
		);
	}
});