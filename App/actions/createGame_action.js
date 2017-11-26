import {COURSE_NAME, COURSE_ID, GAME_DATE, GAME_TIME} from './types'

export const courseName = payload => ({ type: COURSE_NAME, payload });
export const courseID = payload => ({ type: COURSE_ID, payload });
export const gameDate = payload => ({ type: GAME_DATE, payload });
export const gameTime = payload => ({ type: GAME_TIME, payload });
