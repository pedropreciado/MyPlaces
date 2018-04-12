import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as PlaceAPIUtil from '../utils/place_api_util';
import PlacesReducer from '../reducers/place_reducer';

function getLocation() {
  let location = window
                  .navigator
                  .geolocation
                  .getCurrentPosition((pos) => {
    return pos;
  })

  console.log(location);
}

let state = {
  location: getLocation()
}

const configureStore = (preloadedState = {}) => (
  createStore(
    PlacesReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;
