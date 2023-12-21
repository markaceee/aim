import axios from "axios";

export const getAuthToken = () => {
  const token = window.localStorage.getItem("auth_token");
  return token ? token : "";
};

export const setAuthHeader = (token) => {
  window.localStorage.setItem("auth_token", token);
};

export const removeAuthHeader = () => {
  window.localStorage.removeItem("auth_token");
};

axios.defaults.baseURL = 'https://aim-lgn2.onrender.com/api/aim';
// axios.defaults.baseURL = "http://localhost:8080/api/aim";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const request = async (method, url, data) => {
  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { Authorization: `Bearer ${getAuthToken()}` };
  }

  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });

    // Handle the successful response here
    console.log("Response data:", response.data);

    return response;
  } catch (error) {
    if (error.response) {
      console.error("Response error:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    throw error;
  }
};
