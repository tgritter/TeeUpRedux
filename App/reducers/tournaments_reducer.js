import {TOURNAMENT_ID} from '../actions/types';

const INITIAL_STATE = {
  tournamentID: '',
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TOURNAMENT_ID: {
      return {
        ...state,
        tournamentID: action.payload
      };
    }
    default:
      return state;
  }
}
