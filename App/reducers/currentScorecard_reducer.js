import {
  GAME_ID,
  GAME_DATA,
  STROKES,
  ACTION_TYPES,
  COURSE_ID_CURRENT,
  COURSE_DATA,
  SCORE_INPUT_INFO,
  CURRENT_HOLE,
  CURRENT_HOLE_SCORES,
  MATCH_DATA} from '../actions/types';

const INITIAL_STATE = {
  gameID: "-L0SdWvtSQ8lEo9RsiVW",
  gamedata: null,
  strokes: null,
  courseID: '42675',
  coursedata: null,
  scoreInputInfo: null,
  currenthole: 1,
  currentholescores: null,
  matchdata: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {

    //On GameRoom Load
    case GAME_ID: {
      return {
        ...state,
        gameID: action.payload
      };
    }
    case GAME_DATA: {
      return {
        ...state,
        loaded: action.payload.loaded,
        gamedata: action.payload
      };
    }
    case COURSE_ID_CURRENT: {
      return {
        ...state,
        courseID: action.payload
      };
    }
    case COURSE_DATA: {
      return {
        ...state,
        coursedata: action.payload
      };
    }
    case SCORE_INPUT_INFO: {
      return {
        ...state,
        scoreInputInfo: action.payload
      };
    }
    case CURRENT_HOLE: {
      return {
        ...state,
        currenthole: action.payload
      };
    }
      case CURRENT_HOLE_SCORES: {
        return {
          ...state,
        currentholescores: {
          ...state.currentholescores,
          [action.payload.scorecardID]: action.payload.currentScore
        }
        };
      }

      //TODO
      case MATCH_DATA: {
        return {
          ...state,
          matchdata: {
            ...state.matchdata,
            [action.payload.cgid]: action.payload.data
          }

        };
      }

    case ACTION_TYPES.GetInviteFulfilled: {
      return {
        ...state,
        gamedata: action.payload
      };
    }
    case ACTION_TYPES.GetStrokesFulfilled: {
      return {
        ...state,
        strokes: {
          ...state.strokes,
          [action.payload.scorecardID]: action.payload.strokes
        },
      };
    }
    case ACTION_TYPES.GetStartHoles: {
      return {
        ...state,
        currentholescores: {
          ...state.currentholescores,
          [action.payload.scorecardID]: action.payload.currentScore
        },
      };
    }
    case ACTION_TYPES.GetInviteRejected: {
      return {
        ...state,
      };
    }
    case ACTION_TYPES.GetInviteRequested: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
