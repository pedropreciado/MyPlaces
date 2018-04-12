const axios = require("axios");

export const fetchFavorites = () => {
  return axios.get({
    method: 'url',
    url: '/api/favorites'
  })
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
