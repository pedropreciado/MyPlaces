const axios = require('axios');

export const signup = (user) => {
  return axios.post('http://localhost:3001/api/favorites', { user });
}

export const login = (user) => {
  return axios.post('http://localhost:3001/api/favorites', { user });
}

export const logout = () => {
  return axios.get('localhost:3001/api/logout');
}
