export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const RECEIVE_LOCATION_ERROR = 'RECEIVE_LOCATION_ERROR';
export const CLEAR_LOCATION_ERROR = 'CLEAR_LOCATION_ERROR';

const ZipCode = require('zipcodes');

export const fetchLocation = () => dispatch => {
  window.navigator
    .geolocation
    .getCurrentPosition((pos) => {
      let lat = pos.coords.latitude.toFixed(6);
      let long = pos.coords.longitude.toFixed(6);

      dispatch(receiveLocation({
        currentLocation:`${lat},${long}`
      }));

      dispatch(clearLocationError())
    }, (err) => {
      dispatch(receiveLocationError({ error: 'timedout'}))
    }, { timeout: 10 })
}

export const setZipcode = (zipcode) => dispatch => {
  let locationObj = ZipCode.lookup(zipcode);
  let coors = `${locationObj.latitude}, ${locationObj.longitude}`;

  dispatch(receiveLocation(
    {
    currentLocation: coors
  }))
  dispatch(clearLocationError())

}

const receiveLocation = (location) => ({
  type: RECEIVE_LOCATION,
  location
})

const receiveLocationError = (err) => ({
  type: RECEIVE_LOCATION_ERROR,
  err
})

const clearLocationError = () => ({
  type: CLEAR_LOCATION_ERROR
})
