import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/marlon123/image/upload",
});

export default instance;
