import axios from "axios";

const instance = axios.create({
  baseURL: "https://aim-lgn2.onrender.com/api/aim",
});

export default instance;
