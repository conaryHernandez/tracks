import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchTracks = () => {
  return dispatch => {
    axios
      .get('/all_tracks')
      .then(response => {
        dispatch(fetchTracksSuccess(response.data.tracks));
      })
      .catch(error => {
        dispatch(fetchTracksFail(error));
      });
  };
};

export const fetchTracksSuccess = tracks => {
  return {
    type: actionTypes.GET_TRACKS_SUCCESS,
    payload: tracks
  };
};

export const fetchTracksFail = error => {
  return {
    type: actionTypes.GET_TRACKS_FAIL,
    payload: error
  };
};

export const postSingleTrack = id => {
  return dispatch => {
    axios
      .post('/track', { id })
      .then(response => {
        dispatch(postSingleTrackSuccess(response.data.id));
      })
      .catch(err => {
        dispatch(postSingleTrackFail(err));
      });
  };
};

export const postSingleTrackSuccess = track => {
  return {
    type: actionTypes.POST_TRACK_SUCCESS,
    payload: track
  };
};

export const postSingleTrackFail = error => {
  return {
    type: actionTypes.POST_TRACK_FAIL,
    payload: error
  };
};
