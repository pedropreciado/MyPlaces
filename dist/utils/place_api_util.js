const axios = require("axios");

export const fetchFavorites = () => {
  return axios.get('http://localhost:3001/api/favorites');
}

export const fetchSearchResults = (query) => {

  let name = query.name.split(' ').join('+');
  let location = query.location.split(' ').join('');

  return axios.get(
    'http://localhost:3001/api/places?' +
    `name=${name}&` +
    `location=${location}`
)
}
