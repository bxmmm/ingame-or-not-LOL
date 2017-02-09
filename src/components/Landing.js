import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Champion from './Champion';

const PLAYER = (player) => {
	const imageUrl = `http://ddragon.leagueoflegends.com/cdn/7.2.1/img/profileicon/${player.profileIconId}.png`
	const rick = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
	return (
		<div className='text-center one-item' key={player.summonerName}>
			<a target="_blank" href={rick}>
				<div className='hover'>
					<h5><strong>{player.summonerName}</strong></h5>
					<img role="presentation" className='img-responsive' src={imageUrl}/>
					<Champion id={player.championId}/>
				</div>
			</a>
		</div>
	)
}

class Landing extends Component {

	renderData() {
		if (! this.props.liga) {
			if (this.props.liga == '') {
				return (
				<h1 className='text-center'>Not playing :)</h1>
				);
			}
		} else {
			const participants = this.props.liga.participants;
			const gameStart = this.props.liga.gameStartTime
			if (gameStart === 0) {
				return <h1 className='text-center'>Game Starting...</h1>
			}
			const currentTime = new Date()
			var time = Math.floor((currentTime - gameStart)/60000)
			return (
				<div className='row'>
					<h1 className='text-center'>Ingame</h1>
					<h3 className='text-center'><strong>{time}</strong> minutes..</h3>
					<div className='col-xs-6'>
						<div className='team'>
							<h2 className='text-center blue'>Blue Team</h2>
							{participants.slice(0,5).map(player => PLAYER(player))}
						</div>
					</div>
					<div className='col-xs-6'>
						<div className='team'>
							<h2 className='text-center red'>Red Team</h2>
							{participants.slice(5,10).map(player => PLAYER(player))}
						</div>
					</div>
				</div>
			);
		}
	}
	render() {
		return (
			<div className='container'>
				{this.renderData()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { liga: state.lol, summoner: state.summoner, playing: state.playing }
}

export default connect(mapStateToProps, actions)(Landing);
