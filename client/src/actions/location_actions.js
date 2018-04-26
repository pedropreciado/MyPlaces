export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

const options = {
}

function onError(err) {
  console.error(err);
}

export const fetchLocation = () => dispatch => {

  // setTimeout(() => {
  //   dispatch(receiveLocation({ currentLocation: '37.746555,-122.418725' }))
  // }, 2000)

  window.navigator
    .geolocation
    .getCurrentPosition((pos) => {
      let lat = pos.coords.latitude.toFixed(6);
      let long = pos.coords.longitude.toFixed(6);

      dispatch(receiveLocation({
        currentLocation:`${lat},${long}`
      }));
    }, onError)
}

const receiveLocation = (location) => ({
  type: RECEIVE_LOCATION,
  location
})
