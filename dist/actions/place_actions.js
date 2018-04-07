import * as GoogleApiUtil from '../util/google_api_util';

export const RECEIVE_PLACE_DATA = 'RECEIVE_PLACE_DATA';
export const RECEIVE_PLACE_IDS = 'RECEIVE_PLACE_IDS';

export const fetchPlaceData = (name) => dispatch => (
  GoogleApiUtil.fetchPlaceData(name)
    .then((place) => {
      dispatch(receivePlaceData(place))
    })
    .catch((err) => {
      console.log(err);
    })
)

const receivePlaceData = (place) => ({
  type: RECEIVE_PLACE_DATA,
  place
})
