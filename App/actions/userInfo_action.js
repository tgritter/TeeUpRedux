import {USER_ID, USER_IMG, USER_HDC, USER_NAME} from './types'

export const userID = payload => ({ type: USER_ID, payload });
export const userImg = payload => ({ type: USER_IMG, payload });
export const userHdc = payload => ({ type: USER_HDC, payload });
export const userName = payload => ({ type: USER_NAME, payload });
