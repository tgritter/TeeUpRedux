import { combineReducers } from 'redux';
import gameFilter from './gameFilter_reducer';
import createGame from './createGame_reducer';
import userInfo from './userInfo_reducer';

export default combineReducers({
  gameFilter, userInfo, createGame
});
