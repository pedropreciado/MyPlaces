import { combineReducers } from 'redux';
import PlaceReducer from './place_reducer';
import LocationReducer from './location_reducer';

export default combineReducers({
  places: PlaceReducer,
  location: LocationReducer
})
