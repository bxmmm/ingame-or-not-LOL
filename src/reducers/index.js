import { combineReducers } from 'redux';
import lolReducer from './lol_reducer';
import playingReducer from './playing';

const rootReducer = combineReducers({
 	lol: lolReducer,
 	playing: playingReducer
});

export default rootReducer;