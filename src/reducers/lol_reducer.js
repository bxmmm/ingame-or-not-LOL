import { PLAYING_LOL } from '../actions/types';

export default function (state = null, action) {
	switch (action.type) {
		case PLAYING_LOL:
			return action.payload
	}
	return state;
}