import {COURSE_NAME, COURSE_ID, GAME_DATE, GAME_TIME} from '../actions/types';

const INITIAL_STATE = {
  courseName: 'Choose Course',
  courseID: '',
  gameDate: 'Choose Date',
  gameTime: 'Choose Time',
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case COURSE_NAME: {
      return {
        ...state,
        courseName: action.payload
      };
    }
    case COURSE_ID: {
      return {
        ...state,
        courseID: action.payload
      };
    }
    case GAME_DATE: {
      return {
        ...state,
        gameDate: action.payload
      };
    }
    case GAME_TIME: {
      return {
        ...state,
        gameTime: action.payload
      };
    }
    default:
      return state;
  }
}
