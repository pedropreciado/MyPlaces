import { RECEIVE_LOCATION } from '../action/location_actions';
import merge from 'lodash/merge';

const LocationReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_LOCATION:
      return merge({}, oldState, action.location);
  }
}
export default LocationReducer;
