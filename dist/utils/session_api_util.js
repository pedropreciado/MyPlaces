const axios = require('axios');

export const signup = (params) => {
  return axios.post('http://localhost:3001/api/users', params);
}

export const login = (params) => {
  return axios.post('http://localhost:3001/api/users', params);
}

export const logout = () => {
  return axios.get('localhost:3001/api/logout');
}
