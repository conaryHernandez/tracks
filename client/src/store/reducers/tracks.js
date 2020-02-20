import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tracks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: action.payload
      };
    case actionTypes.POST_TRACK_SUCCESS:
      console.log('track', action.payload);
      return {
        ...state,
        track: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
