export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {
        n = (n * -1).toFixed(2);
    }
    return n;
}

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
      let lat = roundTo(pos.coords.latitude, 10);
      let long = roundTo(pos.coords.longitude, 10);

      dispatch(receiveLocation({
        currentLocation:`${lat},${long}`
      }));
    }, onError)
}

const receiveLocation = (location) => ({
  type: RECEIVE_LOCATION,
  location
})
