import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:8080/api/paypal",
    baseURL: "https://aim-lgn2.onrender.com/api/aim",
});

export default instance;