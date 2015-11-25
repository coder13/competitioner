var React = require('react');

module.exports = React.createClass({
	getInitialState () {
		return {
			visible: false
		}
	},

	close (f) {
		this.setState({
			visible: false
		});
	},

	open () {
		this.setState({
			visible: true
		});
	},

	ok (f) {
		if (f) {
			f();
		}
		this.close();
	},

	render () {
		var open = this.props.open || this.open;
		var close = this.props.close || this.close;
		var ok = this.ok.bind(this, this.props.ok);
		return (
			<div className='modal' style={{display: this.state.visible ? 'block': 'none', backgroundColor: '#eee', margin: '0px', padding: '0px', width: '75%', height: '75%'}}>
				<div className='modal-head cf'>
					<h3 className='modal-title'>{this.props.title}</h3>
					<a onClick={close} className='modal-close'>×</a>
				</div>
				<div className='modal-body' style={{height: '70%'}}>
					{this.props.children}
				</div>
				<div className='modal-footer'>
					<button onClick={ok} className='button'>Okay</button>
				</div>
			</div>
		);
	}
});
