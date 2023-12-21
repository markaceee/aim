import { useNavigate } from "react-router-dom";
import { removeAuthHeader, request, setAuthHeader } from "./axios_helper";

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    request("POST", "/authenticate", {
      email: email,
      password: password,
    })
      .then((response) => {
        if (response.data.token) {
          setAuthHeader(response.data.token);
          resolve("success");
        } else {
          reject("Incorrect password");
        }
      })
      .catch((e) => {
        reject("Incorrect password");
        console.log(e);
      });
  });
};

export const logout = () => {
  const navigate = useNavigate();
  removeAuthHeader();
  navigate("/login");
  window.location.reload();
};

export const getData = () => {
  return request("GET", "/get-data", {});
};

export const registerStudent = (  obj ) => {
  return request("POST", "/register", obj);
};
