var _ = require('lodash');
var React = require('react');
var Card = require('react-material-card');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var ampersandMixin = require('ampersand-react-mixin');
var app = require('ampersand-app');
var utils = require('../utils.js');

//	Competition component. Wil display list of competitors.
//	TODO:	MAKE EVEN COOLER!!!
// - How:   Enter to exit out of editing mode for username
//          Click on username header to go back to editing username
module.exports = React.createClass({
	mixins: [ampersandMixin],
	displayName: 'CompetitorForm',

	getInitialState: function() {
		return {
			eventChoice: this.props.events[0] || '',
			eventResult: ''
		};
	},

	componentDidMount() {
	},

	componentWillReceiveProps () {
		if (!this.state.eventChoice) {
			this.setState({
				eventChoice: this.props.events[0] || '',
			});
		}
	},

	remove () {
		this.props.competitor.remove.call(this.props.competitor);
	},

	onNameChange (e) {
		console.log(this.props.competitor.name);
		this.props.competitor.name = e.target.value;
	},

	onEventChange (e) {
		var eventTarget = event.target.value;
		if (!eventTarget) {
			eventTarget = this.props.events[0];
		}
		this.setState({eventChoice: eventTarget});
	},

	onEventResultChange(e) {
		this.setState({eventResult: event.target.value});
	},

	onEventPress (e) {
		if (e.which === 13) {
			this.onAddEvent();
		}
	},

	onAddEvent (event) {
		var eventTarget = this.state.eventChoice;
		if (!eventTarget) {
			eventTarget = this.props.events[0];
		}
		if (eventTarget && this.state.eventResult &&
			this.state.eventResult.search('(([0-9]+):)?([0-5]?[0-9])(\.([0-5]?[0-9]))?') === 0) {
			var result = utils.toMilli(this.state.eventResult);
			
			this.props.competitor.addEvent(eventTarget, result);

			this.setState({
				eventResult: ''
			});
		}
	},

	removeEvent (event) {
		console.log('removing', event);
		this.props.competitor.removeEvent(event);
		this.forceUpdate();
	},

	render: function () {
		const {competitor, events} = this.props;
		const {eventResult} = this.state;

		var EventResultValid = eventResult.search(utils.timeString) !== 0;

		return (
			<Card level={1} style={{padding: '5px', margin: '5px'}}>
				<legend style={{textAlign:'left'}}>
				<Glyphicon className='button button-unstyled' bssize='small' glyph='remove' onClick={this.remove}/>Competitor</legend>

				<div className='form-element'>
					<label style={{textAlign: 'left'}} htmlFor='Name'>Username:</label>
					<input name='name' className='form-input' type='text' value={competitor.name} onChange={this.onNameChange}/>
				</div>

				<fieldset style={{border: 'none', paddingLeft: '0px'}}>
					<div>
						<ul style={{marginBottom: '5px'}}>
							{competitor.events.map((event, i) => (
								<li key={i}>
									<Glyphicon className='button button-unstyled' bssize='small' glyph='remove' onClick={this.removeEvent.bind(this, event)}/>
									<span className='eventName'>{event.name}</span>: <span className='result'>{utils.pretty(event.result)}</span>
								</li>
							))}
						</ul>
					</div>

					<fieldset style={{border: 'none', paddingLeft: '0px'}}>
						<select style={{float: 'left', marginRight: '5px', width: '25%'}} className='form-inline' onChange={this.onEventChange}>
							{events.map((event, i) => (<option key={i}>{event}</option>))}
						</select>
						<input style={{float: 'left', marginRight: '5px', width: '25%'}} type='text' value={eventResult} placeholder='Result'
	className={'form-input form-inline' + (EventResultValid ? ' input-invalid' : '')} onChange={this.onEventResultChange} onKeyPress={this.onEventPress}/>
						<button style={{float: 'left', marginRight: '5px', minWidth: '150px', width: '15%'}}
	className='button form-inline' onClick={this.onAddEvent}>Add event</button>
					</fieldset>
				
				</fieldset>
			</Card>
		);
	}
});
