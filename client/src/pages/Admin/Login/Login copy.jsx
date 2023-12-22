import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/auth";

const Login = ({ decodedToken, isExpired }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password)
      .then((response) => {
        navigate("/dashboard");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (decodedToken != null && !isExpired) {
      navigate(-1);
    }
  }, [decodedToken, isExpired]);

  return (
    <div className="w-full h-screen">
      <div className="bg-blue-400 h-32 text-center flex items-center justify-center">
        <h1 className="text-lg">PICTURE</h1>
      </div>
      <div className="login h-3/4 flex justify-center lg:items-center w-full p-6">
        <div className="lg:w-3/4 sm:w-full">
          <div className="flex items-center justify-center bg-yellow-500 h-10 p-6 mb-5">
            <h1 className="text-white">ERROR</h1>
          </div>
          <div className="login">
            <div className="p-3 bg-blue-500 text-white">
              <h1>EMAIL</h1>
            </div>
            <div className="bg-white p-6">
              <form onSubmit={handleSubmit}>
                <div className="flex">
                  <label
                    htmlFor="email"
                    className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                  >
                    Email
                  </label>
                  <div className="bg-gray-400 p-3 w-full">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3"
                    />
                  </div>
                </div>
                <div className="flex mb-10">
                  <label
                    htmlFor="email"
                    className="bg-blue-400 px-6 py-3 w-1/4 flex items-center"
                  >
                    Password
                  </label>
                  <div className="bg-gray-400 p-3 w-full">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3"
                    />
                  </div>
                </div>
                <div className="bg-gray-400 flex justify-center items-center p-6">
                  <div className="xl:w-1/4 sm:w-1/2">
                    <button className="text-center py-3 rounded bg-blue-700 text-white w-full">
                      LOGIN
                    </button>
                    <div className="remember p-3">
                      <input type="checkbox" className="mr-3" />
                      <label htmlFor="">Remember me</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="header bg-blue-950 w-full h-20 text-center flex items-center justify-center absolute bottom-0">
        <h1 className="text-lg text-white">FOOTER</h1>
      </div>
    </div>
  );
};
export default Login;