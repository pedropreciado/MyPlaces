export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

const options = {
}

function onError(err) {
  console.error(err);
}

export const fetchLocation = () => dispatch => {
  console.log('fetching location ...');

  // setTimeout(() => {
  //   dispatch(receiveLocation({ currentLocation: '37.355219, -121.948626' }))
  // }, 5000)

  window.navigator
    .geolocation
    .getCurrentPosition((pos) => {
      dispatch(receiveLocation({
        currentLocation:`${pos.coords.longitude},${pos.coords.latitude}`
      }));
    }, onError)
}

const receiveLocation = (location) => ({
  type: RECEIVE_LOCATION,
  location
})
