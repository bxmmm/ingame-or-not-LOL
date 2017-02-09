import axios from 'axios';
import { PLAYING_LOL, PLAYING } from './types';

const URL = 'https://quiet-shore-40861.herokuapp.com/api';
// ILI 
// const URL = `http://localhost:5000/api`;


export function lol(res) {
	return {
		type: PLAYING_LOL,
		payload: res
	}
}

export function playing() {
	return {
		type: PLAYING,
		playing: false
	}
}

export function playingLol(region, id) {
	return (dispatch) => {
		axios.get(URL+`/${region}/${id}`)
		.then(response => dispatch(lol(response.data)))
	}
}


export function searchPlayer(region, name) {
	return (dispatch) => {
		axios.get(URL+`/summoners/${region}/${name}`, {
				ime: `${name}`
		})
		.then((response) =>	{
			dispatch(playing())
			dispatch(playingLol(region , response.data.id))
		})
	}
}

