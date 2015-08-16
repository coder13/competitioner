var React = require('react');
var App = require('ampersand-app');

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<h2>Export:</h2>
				
				<p>{this.props.competitions.export()}</p>
			</div>
		);
	}
});
