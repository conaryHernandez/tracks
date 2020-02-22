import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tracks: [],
  error: '',
  id: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: action.payload
      };
    case actionTypes.GET_TRACKS_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case actionTypes.POST_TRACK_SUCCESS:
      return {
        ...state,
        id: action.payload
      };
    case actionTypes.POST_TRACK_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
