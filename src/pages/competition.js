var _ = require('lodash');
var React = require('react');
var Card = require('react-material-card');
var ampersandMixin = require('ampersand-react-mixin');
var Competitor = require('../models/competitor.js');
var CompetitorForm = require('../forms/competitor.js');

// Competition page. Wil allow coniguration of the competition.
module.exports = React.createClass({
	mixins: [ampersandMixin],

	displayName: 'Competition',

	propTypes: {
		comp: React.PropTypes.object.isRequired,
	},

	componentWillRecieveProps () {
		this.setState({eventText: ''})
	},

	getInitialState: function() {
		console.log(this.props.comp);
		return {
			eventText: ''
		};
	},

	onNameChange (e) {
		this.props.comp.name = e.target.value;
		this.forceUpdate();
	},

	/* events: */

	onEventChange (e) {
		this.setState({
			eventText: e.target.value
		});
	},

	onEventPress (e) {
		if (e.which === 13) {
			this.addEvent();
		}
	},

	onAddEvent (e) {
		this.addEvent();
		console.log(this.state);
	},

	addEvent (event) {
		var text = event || this.state.eventText;
		if (text) {
			this.props.comp.events.push(text);
			this.setState({
				eventText: ''
			});
		}
	},

	/* users: */

	onAddUser (event) {
		this.props.comp.addUser();
		this.forceUpdate();
	},

	/* render */

	render () {
		const {name, events} = this.props.comp;
		const {eventText} = this.state;
		return (
			<div>
				<h1 style={name ? {} : {height: '52px'}}className='center'>{name}</h1>
				<form>
					<fieldset>
						<legend style={{'text-align':'left'}}>Competition Settings</legend> 

						<div className='form-element'>
							<label style={{'text-align': 'left'}} htmlFor='Name'>Name:</label>
							<input name='name' className='form-input' type='text' value={name} onChange={this.onNameChange}/>
						</div>

						<fieldset>
							<legend style={{'text-align':'left'}}>Events</legend>

							<div>
								<ul style={{'margin-bottom': '5px'}}>
									{events.map((e) => {
										return <li>{e}</li>
									})}
								</ul>
							</div>
							
							<fieldset style={{border: 'none'}}>
								<input type='text' style={{float: 'left', width: '50%'}} className='form-input form-inline' placeholder='event' value={eventText} onChange={this.onEventChange} onKeyPress={this.onEventPress}/>
								<button type='button' style={{float: 'left', 'margin-left': '5px', 'padding-left': '5px'}} className='button button-small' onClick={this.onAddEvent}>Add Event</button>
							</fieldset>
						</fieldset>
					</fieldset>
				</form>

				<fieldset style={{padding: '10px'}}>
					<legend style={{'text-align':'left'}}>Users</legend>
					{this.props.comp.users.map((user) => <CompetitorForm user={user} events={events}/>)}

					<button type='button' style={{'margin-left': '5px'}} className='button center' onClick={this.onAddUser}>New User</button>
				</fieldset>
			</div>
		);
	}
});

