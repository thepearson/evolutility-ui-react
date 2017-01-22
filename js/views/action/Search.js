import React from 'react'

export default React.createClass({

	propTypes: {
		entity: React.PropTypes.string,
		fnSearch: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			text : ''
		}
	},

	clear(evt){
		this.setState({
			text: ''
		})
	},

	change(evt){
		this.setState({
			text: evt.currentTarget.value
		})
	},

	keyUp(evt){
		if(evt.keyCode===13){
			this.props.fnSearch()
		}
	},

	render() {
		//const css = "alert alert-" + (this.props.type || 'danger')
		return (
			<div className="input-group evo-search">
				<input key="text" onChange={this.change} onKeyUp={this.keyUp} 
					value={this.state.text} className="evo-field form-control" type="text" maxLength="100"/>
				<div key="clear" onClick={this.clear} className={"clear-icon glyphicon glyphicon-remove "+(this.state.text!=''?'':'hidden')}></div>
				<span key="search" onClick={this.props.fnSearch} className="btn input-group-addon glyphicon glyphicon-search"></span>
			</div>
		)
	}
	
})
