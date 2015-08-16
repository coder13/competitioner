var _ = require('lodash');
var React = require('react');
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
        console.log(this.props);
        this.props.comp.name = e.target.value;
        this.forceUpdate();
        console.log(this.props.comp);
    },

    /* events: */

    onEventChange (e) {
        console.log(e.target)
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
        console.log(this.props);
        const {name, events} = this.props.comp;
        const {eventText} = this.state;
        console.log(name, events, eventText);
        return (
            <div>
                <h1 className='center'>{name}</h1>
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
                                <ul>
                                    {events.map((e) => {
                                        return <li>{e}</li>
                                    })}
                                </ul>
                            </div>
                            
                            <div className='form-element'>
                                <div style={{float: 'left', width: '50%'}} className='form-inline'>
                                    <input type='text' id='event' placeholder='event' value={eventText} className='form-input' onChange={this.onEventChange} onKeyPress={this.onEventPress}/>
                                </div>
                                <div style={{float: 'left', 'padding-left': '5px'}} className='form-inline'>
                                    <button className='button button-small' type='button' onClick={this.onAddEvent}>Add Event</button>
                                </div>
                            </div>
                        </fieldset>
                    </fieldset>
                </form>

                <fieldset>
                    <legend style={{'text-align':'left'}}>Users</legend>
                    {this.props.comp.users.map((user) => <CompetitorForm user={user}/>)}

                    <button className='button center' type='button' onClick={this.onAddUser}>New User</button>
                </fieldset>
            </div>
        );
    }
});

