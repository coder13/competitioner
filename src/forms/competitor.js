var React = require('react');
var Card = require('react-material-card');
var ampersandMixin = require('ampersand-react-mixin');

// Competition component. Wil display list of competitors.
// TODO: MAKE EVEN COOLER!!!
// - How:   Enter to exit out of editing mode for username
//          Click on username header to go back to editing username
module.exports = React.createClass({
	mixins: [ampersandMixin],

	getInitialState: function() {
		console.log(this.props.user);
		return {
			eventChoice: this.props.events[0] || '',
			eventResult: ''
		};
	},

	componentWillReceiveProps () {
		if (!this.state.eventChoice) {
			this.setState({
				eventChoice: this.props.events[0] || '',
			});
		}
	},

	onNameChange (e) {
		console.log(this.props);
		this.props.user.name = e.target.value;
		this.forceUpdate();
		console.log(this.props.user);
	},

	onEventChange (e) {
		this.setState({eventChoice: event.target.value});
		console.log(this.state.eventChoice);
	},

	onEventResultChange(e) {
		this.setState({eventResult: event.target.value});
		console.log(e);
	},

	onAddEvent (e) {
		console.log(38, this.state);
		if (this.state.eventChoice && this.state.eventResult) {
			console.log(this.state.eventChoice, this.state.eventResult);

			this.props.user.events.push({
				name: this.state.eventChoice,
				result: this.state.eventResult
			});

			this.setState({
				eventChoice: '',
				eventResult: ''
			});
		}
	},

	render: function () {
		const {user} = this.props;

		return (
			<Card level={1} style={{padding: '5px', margin: '5px'}}>
				<legend style={{'text-align':'left'}}>User</legend>

				<div className='form-element'>
					<label style={{'text-align': 'left'}} htmlFor='Name'>Username:</label>
					<input name='name' className='form-input' type='text' value={user.name} onChange={this.onNameChange}/>
				</div>

				<fieldset style={{border: 'none', 'padding-left': '0px'}}>
					<div>
						<ul style={{'margin-bottom': '5px'}}>
							{user.events.map((event) => {
								return (
									<li>
										<span className='eventName'>{event.name}</span>: <span className='result'>{event.result}</span>
									</li>
								)
							})}
						</ul>
					</div>

					<fieldset style={{border: 'none', 'padding-left': '0px'}}>
						<select style={{float: 'left', 'margin-right': '5px', width: '25%'}} className='form-inline' onChange={this.onEventChange}>
							{this.props.events.map(event => <option>{event}</option>)}
						</select>
						<input style={{float: 'left', 'margin-right': '5px', width: '25%'}} type='text' placeholder='Result' className='form-input form-inline' value={this.state.eventResult} onChange={this.onEventResultChange}/>
						<button style={{float: 'left', 'margin-right': '5px', 'min-width': '150px', width: '15%'}} className='button form-inline' onClick={this.onAddEvent}>Add event</button>
					</fieldset>
				
				</fieldset>
			</Card>
		);
	}
});
