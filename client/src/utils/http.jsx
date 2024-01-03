import axios from "axios";

const instance = axios.create({
  baseURL: "https://aim-server.onrender.com/api/aim",
  // baseURL: "http://localhost:8080/api/aim",
});

export default instance;
