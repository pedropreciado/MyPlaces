const axios = require("axios");

export const fetchFavorites = (id) => {
  console.log(id);
  return axios.get(
    '/api/favorites?' +
    `userId=${id}`
  );
}

export const fetchSearchResults = (query) => {

  let name = query.name.split(' ').join('+');
  let location = query.location.split(' ').join('');

  return axios.get(
    '/api/places?' +
    `name=${name}&` +
    `location=${location}`
  );
}

export const addFavorite = (data) => {
  console.log();
  return axios.post(
    '/api/favorites?' +
    `placeid=${data.placeid}&`+
    `userId=${data.userID}`
  )
}

export const deleteFavorite = (id) => {
  return axios.delete(`/api/favorites?id=${id}`)
}
