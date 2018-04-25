import { combineReducers } from 'redux';
import PlaceReducer from './place_reducer';
import LocationReducer from './location_reducer';
import SearchReducer from './search_reducer';
import SessionReducer from './session_reducer';

export default combineReducers({
  places: PlaceReducer,
  location: LocationReducer,
  searchResults: SearchReducer,
  session: SessionReducer
})
