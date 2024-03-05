import axios from "axios";

axios.defaults.withCredentials = true;

export const makeRequest = axios.create({
  baseURL: "http://localhost:5001/api/v1/",
  withCredentials: true,
});
