const axios = require("axios");

export const fetchFavorites = () => {
  return axios.get('http://localhost:3001/api/favorites');
}

export const searchPlaces = (name, location) => {
  return axios.get(
    '/api/places',
    {
      params: {
        name,
        location
      }
    }
  )
}
