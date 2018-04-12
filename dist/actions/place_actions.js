import * as PlacesAPIUtil from '../utils/place_api_util';

export const RECEIVE_FAVORITE_PLACES = 'RECEIVE_FAVORITE_PLACES';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';


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
