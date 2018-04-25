const axios = require('axios');

export const signup = (params) => {
  return axios.post('/api/users', params);
}

export const login = (params) => {
  return axios.post('/api/users', params);
}

export const logout = () => {
  return axios.get('/logout');
}
