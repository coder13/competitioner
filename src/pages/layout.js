const React = require('react');
const app = require('ampersand-app');
const Card = require('react-material-card')
const Glyphicon = require('react-bootstrap/lib/Glyphicon');
const ampersandMixin = require('ampersand-react-mixin');
const NavHelper = require('../components/nav-helper');
const Competitors = require('../components/competitor-collection')
const Competitions = require('../models/competition-collection')
const Modal = require('../components/modal');

// Main layout. Will always display list of competitors and their current points.
module.exports = React.createClass({
	mixins: [ampersandMixin],
	displayName: 'LayoutPage',

	getInitialState () {
		return {
			exportDataText: JSON.stringify(app.me.competitions.toJSON())
		}
	},

	componentDidMount: function() {
		this.props.competitions.on('all', function (name, event) {
			console.log(24, name, event);
			this.forceUpdate();
		}, this);
	},

	newComp (event) {
		app.createComp();
	},

	removeComp (comp) {
		app.deleteComp(comp);
	},

	importData () {
		this.refs.importData.open();
	},

	okImport () {
		if (this.refs.importText.getDOMNode().value) {
			let json = JSON.parse(this.refs.importText.getDOMNode().value)
			app.sync(json);
		}
	},

	exportData () {
		this.setState({
			exportDataText: JSON.stringify(app.me.competitions.toJSON())
		})
		this.refs.exportData.open();
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
						<a className='button' style={{float: 'right', margin: '10px'}} onClick={this.exportData}>Export Data</a>
						<a className='button' style={{float: 'right', margin: '10px'}} onClick={this.importData}>Import data</a>
					</ul>
				</nav>
				<Modal title='Import Data' ref='importData' ok={this.okImport}>
					<textarea ref='importText' className='form-input' style={{height: '100%'}}/>
				</Modal>

				<Modal title='Export Data' ref='exportData'>
					<textarea ref='exportDataText' defaultValue={JSON.stringify(app.me.competitions.toJSON())} className='form-input' style={{height: '100%'}}/>
				</Modal>

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




