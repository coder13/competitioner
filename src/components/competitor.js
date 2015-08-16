var React = require('react');

// Competition component. Will display 
module.exports = React.createClass({
	render: function () {
		return (
			<span class="competitor">
				<span class="username">{this.props.username}</span>
				<span class="points">{this.props.points}</span>
			</span>
		);
	}
});
