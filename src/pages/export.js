var React = require('react');
var App = require('ampersand-app');
var Markdown = require('react-remarkable');
var utils = require('../utils');

const sort = function (map) {
	return Object.keys(map).sort((a,b) => -(map[a] - map[b])).map(name => ({name: name, points: map[name]}));
}

const renderPoints = function (comps) {
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
	var i = 0;
	console.log(sort(competitors));
	return `${_.map(sort(competitors), user => (`${++i}. /u/${user.name}: ${user.points}\n`)).join('\n')}`;
};

const renderEvent = function (eventName, results) {
	return `${eventName}:\n
${results.map((result, index) => (`${index+1}. /u/${result.name}: ${utils.pretty(result.time)}\n`)).join('\n')}`;
};

module.exports = React.createClass({
	displayName: 'ExportPage',

	getInitialState () {
		return {
			copy: true
		};
	},

	renderComp (comp) {
		return `${comp.name}\n
${comp.events.map((event) => (
	renderEvent(event, comp.getEvent(event))
), this).join('\n')}`;
	},

	export () {
		var rtrn = `${this.renderComp(this.props.competitions.last())}\n`
		if (this.props.competitions.length > 1) {
			rtrn += `Point from last week:\n
${renderPoints(this.props.competitions.allButLast())}\n`;
		}
		rtrn += `Points from this week:\n
${renderPoints([this.props.competitions.last()])}\n
Formula: 1 + (Total number of people) - (place) = points\n
Total points:\n
${renderPoints(this.props.competitions)}`;
		return rtrn;
	},

	render () {
		let text = this.export();
		return (
			<div>
				<div style={{margin: '0px', width: '100%'}} className='container'>
					<h2 style={{float: 'left'}}>Export:</h2>
					<button style={{float: 'right'}} onClick={() => {this.setState({copy: true})}} className='button'>Copy to Clipboard</button>
				</div>
				{this.state.copy ? 
				<textarea onCopy={() => {this.setState({copy: false})}} style={{width: '100%', height: text.split('\n').length*2 + 'em'}}>{text}</textarea>
				: <div style={{clear: 'both', whiteSpace: 'pre-wrap'}}>{text}</div>}
			</div>
		);
	}
});
