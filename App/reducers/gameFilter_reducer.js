import {RADIUS_FILTER, DATE_FILTER} from '../actions/types';

const INITIAL_STATE = {
  radiusValue: 20,
  dateString: 'Any'
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case RADIUS_FILTER: {
      return {
        ...state,
        radiusValue: action.payload 
      };
    }
    case DATE_FILTER: {
      return {
        ...state,
        dateString: action.payload
      };
    }
    default:
      return state;
  }
}
