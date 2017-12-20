import {OPEN_TEES_MODAL, CLOSE_TEES_MODAL, OPEN_SHARE_MODAL, CLOSE_SHARE_MODAL, SELECTED_TEE} from '../actions/types';

const INITIAL_STATE = {
  selectTeesModalOpen: false,
  selectedTee: 'Choose Tee',
  selectShareModalOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case OPEN_TEES_MODAL: {
      return {
        ...state,
        selectTeesModalOpen: action.payload
      };
    }
    case CLOSE_TEES_MODAL: {
      return {
        ...state,
        selectTeesModalOpen: action.payload
      };
    }
    case OPEN_SHARE_MODAL: {
      return {
        ...state,
        selectShareModalOpen: action.payload
      };
    }
    case CLOSE_SHARE_MODAL: {
      return {
        ...state,
        selectShareModalOpen: action.payload
      };
    }
    case SELECTED_TEE: {
      return {
        ...state,
        selectedTee: action.payload
      };
    }
    default:
      return state;
  }
}
