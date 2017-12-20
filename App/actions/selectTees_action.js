import {OPEN_TEES_MODAL, CLOSE_TEES_MODAL, OPEN_SHARE_MODAL, CLOSE_SHARE_MODAL, SELECTED_TEE} from './types'

export const openTeesModal = payload => ({ type: OPEN_TEES_MODAL, payload: true });
export const closeTeesModal = payload => ({ type: CLOSE_TEES_MODAL, payload: false });
export const selectTee = payload => ({ type: SELECTED_TEE, payload });

export const openShareModal = payload => ({ type: OPEN_SHARE_MODAL, payload: true });
export const closeShareModal = payload => ({ type: CLOSE_SHARE_MODAL, payload: false });
