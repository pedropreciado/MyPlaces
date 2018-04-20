const axios = require('axios');

export const signup = (params) => {
  return axios.post('http://localhost:3001/api/users', params);
}

export const login = (user) => {
  return axios.post('http://localhost:3001/api/users', { params: user });
}

export const logout = () => {
  return axios.get('localhost:3001/api/logout');
}
