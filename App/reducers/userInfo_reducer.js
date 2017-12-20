import {USER_ID, USER_IMG, USER_HDC, USER_NAME} from '../actions/types';

const INITIAL_STATE = {
  userImg: 'https://firebasestorage.googleapis.com/v0/b/teeupbeta.appspot.com/o/profileImg.png?alt=media&token=f741f56f-c4b8-49c7-9b9a-88be2adedfce',
  userHdc: '0.0',
  userID: '0.0',
  userName: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case USER_ID: {
      return {
        ...state,
        userID: action.payload
      };
    }
    case USER_IMG: {
      return {
        ...state,
        userImg: action.payload
      };
    }
    case USER_HDC: {
      return {
        ...state,
        userHdc: action.payload
      };
    }
    case USER_NAME: {
      return {
        ...state,
        userName: action.payload
      };
    }
    default:
      return state;
  }
}
