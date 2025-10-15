import axios from "axios";

const API = axios.create({
  baseURL: "https://petbackend-guvd.onrender.com",
  withCredentials: true,
});

export default API;
