import {
   RECEIVE_FAVORITE_PLACES,
   RECEIVE_FAVORITE_PLACE,
   REMOVE_FAVORITE_PLACE

 } from '../actions/place_actions';
import merge from 'lodash/merge';

const PlaceReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_FAVORITE_PLACES:
      return merge({}, oldState, action.places);
    case RECEIVE_FAVORITE_PLACE:
      let freshState = merge({}, oldState);

      for (let key in newState) {
        let place = freshState[key];
        
        if (place.placeid === action.placeid) {
          console.log(freshState[key]);
          freshState[key] = action.place;
          console.log(freshState[key])
        }
      }

      return freshState;
    case REMOVE_FAVORITE_PLACE:
      let newState = merge({}, oldState);

      for (let id in newState) {
        let place = newState[id];

        if (place.placeid === action.place.placeid) {
          delete newState[id];

          return newState;
        }
      }
    default:
      return oldState;
  }
}

export default PlaceReducer;
