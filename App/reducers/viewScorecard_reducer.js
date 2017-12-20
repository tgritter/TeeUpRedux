import {VIEW_SCORECARD_ID} from '../actions/types';

const INITIAL_STATE = {
  scorecardViewID: '',
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case VIEW_SCORECARD_ID: {
      return {
        ...state,
        scorecardViewID: action.payload
      };
    }
    default:
      return state;
  }
}
