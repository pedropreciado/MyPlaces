export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

async export const fetchLocation = () => dispatch => {
  console.log('fetching lcoation ...');

  navigator
    .geolocation
    .getCurrentPosition((pos) => {
      let location = `${pos.coords.longitude},${pos.coords.latitude}`;

      dispatch(receiveLocation(location));
    })
}

const receiveLocation = (location) => ({
  type: RECEIVE_LOCATION,
  location
})
