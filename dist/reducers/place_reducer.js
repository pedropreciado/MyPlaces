import {
   RECEIVE_FAVORITE_PLACES,
   RECEIVE_FAVORITE_PLACE
 } from '../actions/place_actions';
import merge from 'lodash/merge';

const PlaceReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_FAVORITE_PLACES:
      return merge({}, oldState, action.places);
    case RECEIVE_FAVORITE_PLACE:
      let id = Object.keys(oldState).length + 1;
      return merge({}, oldState, {[id]: action.place})
    default:
      return oldState;
  }
}

export default PlaceReducer;
