import axios from "axios";

const API = axios.create({
  baseURL: "http://10.11.6.63:5000/api",
});

export default API;
