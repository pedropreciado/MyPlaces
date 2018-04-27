import {
  RECEIVE_LOCATION,
  RECEIVE_LOCATION_ERROR,
  CLEAR_LOCATION_ERROR
 } from '../actions/location_actions';
import merge from 'lodash/merge';

const LocationReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_LOCATION:
    console.log(action);
      return merge({}, oldState, action.location);
    case RECEIVE_LOCATION_ERROR:
      return merge({}, oldState, action.err)
    case CLEAR_LOCATION_ERROR:
      let newState = merge({}, oldState);
      newState.error ? delete newState.error : null;
      return newState;
    default:
      return oldState;
  }
}
export default LocationReducer;
