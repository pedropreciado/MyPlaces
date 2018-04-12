import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as PlaceAPIUtil from '../utils/place_api_util';
import RootReducer from '../reducers/root_reducer';

// async function getLocation() {
//   let location = await window.navigator
//                        .geolocation
//                        .getCurrentPosition((pos) => {
//     return pos;
//   })
//   console.log(location);
// }
//
// let state = {
//   location: getLocation()
// }

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;
