var React = require('react');
var app = require('ampersand-app');
var Card = require('react-material-card')
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
// var reactFlatUI = require('react-flatui');
var ampersandMixin = require('ampersand-react-mixin');
var NavHelper = require('../components/nav-helper.js');
var Competitors = require('../components/competitor-collection.js')

// Main layout. Will always display list of competitors and their current points.
module.exports = React.createClass({
	mixins: [ampersandMixin],
	displayName: 'LayoutPage',

	componentDidMount: function() {
		this.props.competitions.on('all', function (name, event) {
			console.log(name, event);
		}, this);
	},

	newComp (event) {
		app.trigger('newComp', event);
	},

	removeComp (comp) {
		this.props.competitions.remove(comp);
	 },

	render () {
		return (
			<NavHelper id='layout' style={{height: '100%'}}>
				<nav className='top-nav top-nav-light cf' role='navigation'>
						<input id='menu-toggle' className='menu-toggle' type='checkbox'/>
						<label htmlFor='menu-toggle'>Menu</label>
						<ul className='list-unstyled list-inline cf'>
							<li><a className='button' href='/'>Comp Program</a></li>
							<li><button className='button' onClick={this.newComp}>New Competition</button></li>
							<a className='button' href="/export">Export</a>
						</ul>
				</nav>
				<div id='layoutBody' className='grid-flex-container'>
					<div id='sidebar' className='grid-flex-cell grid-flex-cell-1of4' style={{height: '100%'}}>
						<Card style={{marginBottom: '5px', padding: '5px', height: '50%'}} id='competitions' level={2}>
							<h4 style={{marginBottom: '10px'}}>Competitions:</h4>
							<ul style={{marginBottom: '10px'}} className='list-unstyled'>
								{this.props.competitions.map((comp, i) => (
								<li key={i} className='comp-li'>
									<Glyphicon className='button button-unstyled' bssize='small' glyph='remove' onClick={this.removeComp.bind(this, comp.id)}/>
									<a href={'/competition/' + comp.id}>{comp.name}</a>
								</li>))}
							</ul>
						</Card>
						<Card style={{marginBottom: '5px', padding: '5px', height: '50%'}} id='competitors' level={2}>
							<h4>Competitors:</h4>
							<Competitors competitions={this.props.competitions}/>
						</Card>
					</div>

					<Card level={2} className='grid-flex-cell container'>
						{this.props.children}
					</Card>
				</div>
			</NavHelper>
		)
	}
});