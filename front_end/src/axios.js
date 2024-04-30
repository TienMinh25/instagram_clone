import axios from 'axios';

axios.defaults.withCredentials = true;

export const makeRequest = axios.create({
  baseURL: `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/v1/`,
  withCredentials: true
});
