import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index'

class Search extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(event) {
		event.preventDefault();
		const region = this.refs.region.value
		const name = this.refs.name.value
		this.props.searchPlayer(region, name);

	this.refs.name.value = ''
	}
	searchText() {
		if(!this.props.player) {
			return <h4 className='text-center'></h4>
		} else {
			return <h4></h4>
		}
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className='col-sm-8 forma'>
						<input className='form-control' ref='name' type='text' placeholder='Type player name' />
					</div>
					<div className='col-sm-2 forma'>
						<select className='form-control' ref='region' name="region">
	 					 <option value="EUNE">EU North East</option>
	  				 <option value="EUW">EU West</option>
	 					 <option value="NA">North America</option>
						</select>
					</div>
					<button className='btn btn-primary'>Search</button>
				</form>
				{this.searchText()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { player: state.lol }
}

export default connect(mapStateToProps, actions)(Search);