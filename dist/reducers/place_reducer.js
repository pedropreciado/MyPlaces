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
      console.log(oldState, action.place);
      return oldState;
    default:
      return oldState;
  }
}

export default PlaceReducer;
