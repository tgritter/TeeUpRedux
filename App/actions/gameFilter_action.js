import {RADIUS_FILTER, DATE_FILTER} from './types'

export const radiusFilter = payload => ({ type: RADIUS_FILTER, payload });
export const dateFilter = payload => ({ type: DATE_FILTER, payload });
