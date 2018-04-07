const axios = require("axios");

const fetchPlaceData = (name) => {
  let key = 'AIzaSyAuID19sxhCthckUbYSJLihvs9daXytRag';
  let res;

  window.navigator.geolocation.getCurrentPosition((pos) => {
	  var longitude = pos.coords.latitude;
	  var latitude = pos.coords.longitude;

    let location = `${longitude},${latitude}`;

    let params = {
      name,
      location,
      rankby: 'distance',
    }

    res = axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&`,
      headers: {
        'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      },
      params
    });

  });

  return res;
}

// getPlaceData("Philz coffee")
//   .then((data) => {
//   console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

module.exports = getPlaceData;
