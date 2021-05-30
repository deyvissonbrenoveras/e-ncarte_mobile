import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.6:3333/api',
  // baseURL: 'https://e-ncarte.com/api',
});

export default api;
