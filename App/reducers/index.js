import { combineReducers } from 'redux';
import gameFilter from './gameFilter_reducer';
import createGame from './createGame_reducer';
import userInfo from './userInfo_reducer';
import currentScorecard from './currentScorecard_reducer';
import selectTees from './selectTees_reducer';
import viewScorecard from './viewScorecard_reducer';
import tournaments from './tournaments_reducer';

export default combineReducers({
  gameFilter, userInfo, createGame, currentScorecard, selectTees, viewScorecard, tournaments
});
