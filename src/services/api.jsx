import axios from "axios";

const API = axios.create({
  baseURL: "https://petbackend-guvd.onrender.com/api",
  withCredentials: true,
});

export default API;
