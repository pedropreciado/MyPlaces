import {
  RECEIVE_SEARCH_RESULTS,
  RECEIVE_FAVORITE_PLACES
 } from '../actions/place_actions';
import merge from 'lodash/merge';

const PlaceReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return merge({}, oldState, action.results);
    case RECEIVE_FAVORITE_PLACES:
      return merge({}, oldState, action.places);
    default:
      return oldState;
  }
}

export default PlaceReducer;
