import * as PlacesAPIUtil from '../utils/place_api_util';
import subscribeToTimer from '../utils/socket_api_util';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export const RECEIVE_FAVORITE_PLACES = 'RECEIVE_FAVORITE_PLACES';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

export const subscribeToUpdater = () => dispatch => {
  console.log('Subscribing to Updater ...');

  socket.on('newPlaces', (places) => {
    dispatch(receiveFavoritePlaces(places));
    console.log('Favorites updated through socket!');
  })

  socket.emit('subscribeToUpdater')
}

export const fetchFavorites = () => dispatch => {
  PlacesAPIUtil.fetchFavorites().then((places) => {
    dispatch(receiveFavoritePlaces(places.data));
  })
}

export const fetchSearchResults = (name, location) => dispatch => {
  PlaceAPIUtil.fetchSearchResults(name, location).then((results) => {
    dispatch(receiveSeachResults(results));
  })
}

const receiveFavoritePlaces = (places) => ({
    type: RECEIVE_FAVORITE_PLACES,
    places
  });


const receiveSearchResults = (results) => ({
  type: RECEIVE_SEARCH_RESULTS,
  results
});
