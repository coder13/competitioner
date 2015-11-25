const _ = require('lodash');
const React = require('react');
const Card = require('react-material-card');
const Glyphicon = require('react-bootstrap/lib/Glyphicon');
const ampersandMixin = require('ampersand-react-mixin');
const Competitor = require('../models/competitor.js');
const CompetitorForm = require('../forms/competitor');

// Competition page. Wil allow coniguration of the competition.
module.exports = React.createClass({
	mixins: [ampersandMixin],
	displayName: 'CompetitionPage',

	propTypes: {
		comp: React.PropTypes.object.isRequired,
	},

	componentWillRecieveProps () {
		this.setState({eventText: ''})
	},

	getInitialState () {
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
		if (e.which === 13) { // Enter
			this.onAddEvent();
		}
	},

	onAddEvent (e) {
		this.props.comp.addEvent(this.state.eventText);
		this.setState({
			eventText: ''
		});
	},

	removeEvent (event) {
		this.props.comp.removeEvent(event)
		this.forceUpdate();
	},

	/* competitors: */

	onAddCompetitor () {
		this.props.comp.addCompetitor();
		this.forceUpdate();
	},

	/* render */

	render () {
		const {name, events} = this.props.comp;
		const {eventText} = this.state;

		return (
			<div>
				<h1 style={name ? {} : {height: '52px'}} className='center'>{name}</h1>
				<form>
					<fieldset>
						<legend style={{textAlign: 'left'}}>Competition Settings</legend> 

						<div className='form-element'>
							<label style={{textAlign: 'left'}} htmlFor='Name'>Name:</label>
							<input name='name' className='form-input' type='text' value={name} onChange={this.onNameChange}/>
						</div>

						<fieldset>
							<legend style={{textAlign: 'left'}}>Events</legend>

							<div>
								<ul style={{marginBottom: '5px'}}>
									{events.map((event, i) => ( // event, index
										<li key={i}>
											<Glyphicon className='button button-unstyled' bssize='small' glyph='remove' onClick={this.removeEvent.bind(this, event)}/>{event}
										</li>
									))}
								</ul>
							</div>
							
							<fieldset style={{border: 'none'}}>
								<input type='text' style={{float: 'left', width: '50%'}} className='form-input form-inline' placeholder='event' value={eventText} onChange={this.onEventChange} onKeyPress={this.onEventPress}/>
								<button type='button' style={{float: 'left', marginLeft: '5px', paddingLeft: '5px'}} className='button button-small' onClick={this.onAddEvent}>Add Event</button>
							</fieldset>
						</fieldset>
					</fieldset>
				</form>

				<fieldset style={{padding: '10px'}}>
					<legend style={{textAlign: 'left'}}>Competitors</legend>
					{this.props.comp.competitors.map((competitor, i) => (<CompetitorForm key={i} comp={this.props.comp} competitor={competitor} events={this.props.comp.events} onChange={this.onChange}/>))}

					<button type='button' style={{marginLeft: '5px'}} className='button center' onClick={this.onAddCompetitor}>New Competitor</button>
				</fieldset>
			</div>
		);
	}
});

//
