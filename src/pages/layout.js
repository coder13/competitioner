var React = require('react');
var app = require('ampersand-app');
var ampersandMixin = require('ampersand-react-mixin');
var NavHelper = require('../components/nav-helper.js');
var Competitors = require('../components/competitors.js')

// Main layout. Will always display list of competitors and their current points.
module.exports = React.createClass({
	mixins: [ampersandMixin],

	displayName: 'Layout',

	componentDidMount: function() {
		this.props.competitions.on('change', function () {
			this.forceUpdate();
		}.bind(this));
	},

	newComp (event) {
		app.trigger('newComp', event);
	},

	render () {
		return (
			<NavHelper id='layout'>
				<nav className='top-nav top-nav-light cf' role='navigation'>
				    <input id='menu-toggle' className='menu-toggle' type='checkbox'/>
				    <label htmlFor='menu-toggle'>Menu</label>
				    <ul className='list-unstyled list-inline cf'>
				    	<li><a href='/'>Comp Program</a></li>
				    	<li><button className='button' onClick={this.newComp}>New Competition</button></li>
				    </ul>
				</nav>
				<div id='layoutBody' className='grid-flex-container'>
					<div id='sidebar' className='grid-flex-cell grid-flex-cell-1of4'>
						<div id='competitions'>
							<h4>Competitions:</h4>
							<ul className='list-unstyled'>
								{this.props.competitions.map((comp) => (<li className='comp-li'><a href={'/competition/' + comp.id}>{comp.name}</a></li>))}
							</ul>
							<a className='button' href="/export">Export</a>
						</div>
						<div id='competitors'>
							<Competitors competitions={this.props.competitions}/>
						</div>
					</div>

					<div className='grid-flex-cell container'>
						{this.props.children}
					</div>
				</div>

			</NavHelper>
		)
	}
});