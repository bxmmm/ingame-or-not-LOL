import { PLAYING } from '../actions/types';

export default function (state = true, action) {
	switch (action.type) {
		case PLAYING:
			return action.playing
	}
	return state;
}