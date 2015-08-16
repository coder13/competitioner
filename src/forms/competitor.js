var React = require('react');
var ampersandMixin = require('ampersand-react-mixin');

// Competition component. Wil display list of competitors.
module.exports = React.createClass({
	mixins: [ampersandMixin],

	onNameChange (e) {
	    console.log(this.props);
	    this.props.user.name = e.target.value;
	    this.forceUpdate();
	    console.log(this.props.user);
	},

	render: function () {
		const {name} = this.props.user;

		return (
			<form>
				<fieldset>
				    <legend style={{'text-align':'left'}}>User</legend>

				    <div className='form-element'>
				        <label style={{'text-align': 'left'}} htmlFor='Name'>Username:</label>
				        <input name='name' className='form-input' type='text' value={name} onChange={this.onNameChange}/>
				    </div>
				</fieldset>
			</form>
		);
	}
});
