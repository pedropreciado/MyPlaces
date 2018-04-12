import { combineReducers } from 'redux';
import PlaceReducer from './place_reducer';

export default combineReducers({
  places: PlaceReducer
})
