import * as PlacesAPIUtil from '../utils/place_api_util';
import subscribeToTimer from '../utils/socket_api_util';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export const RECEIVE_FAVORITE_PLACES = 'RECEIVE_FAVORITE_PLACES';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const RECEIVE_FAVORITE_PLACE = 'RECEIVE_FAVORITE_PLACE';
export const REMOVE_FAVORITE_PLACE = 'REMOVE_FAVORITE_PLACE';

export const subscribeToUpdater = (customId) => dispatch => {
  console.log('Subscribing to Updater ...');

  socket.on('newPlaces', (places) => {
    dispatch(receiveFavoritePlaces(places));

    console.log('Favorites updated through socket!');
  })

  // socket.emit('subscribeToUpdater', { customId });
}

export const fetchFavorites = (id) => dispatch => {
  PlacesAPIUtil.fetchFavorites(id).then((places) => {
    dispatch(receiveFavoritePlaces(places.data));
  })
}

export const fetchSearchResults = (query) => dispatch => {
  PlacesAPIUtil.fetchSearchResults(query)
    .then((results) => {
    dispatch(receiveSearchResults(results.data));
  })
    .catch((err) => {
      console.error(err);
    })
}

export const addFavorite = (id) => dispatch => {
  PlacesAPIUtil.addFavorite(id).then(({ data }) => {
    dispatch(receiveFavoritePlaces(data));
  })
}

export const refresh = (id) => dispatch => {
  PlacesAPIUtil.refresh(id)
    .then(({ data }) => {
      PlacesAPIUtil.fetchFavorites(data.userId)
        .then(({ data }) => {
          dispatch(receiveFavoritePlaces(data))
        })
    })
}

export const deleteFavorite = (id) => dispatch => {
  PlacesAPIUtil.deleteFavorite(id).then(({ data }) => {
    dispatch(removeFavoritePlace(data));
  })
}

const receiveFavoritePlace = (place) => ({
  type: RECEIVE_FAVORITE_PLACE,
  place
})

const receiveFavoritePlaces = (places) => ({
    type: RECEIVE_FAVORITE_PLACES,
    places
});


const receiveSearchResults = (results) => ({
  type: RECEIVE_SEARCH_RESULTS,
  results
});

const removeFavoritePlace = (place) => ({
  type: REMOVE_FAVORITE_PLACE,
  place
})
