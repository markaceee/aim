import React from "react";
import { useJwt } from "react-jwt";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { getAuthToken } from "./api/axios_helper";
import Footer from "./components/ui/Footer";
import Routing from "./routing/Routing";

const App = () => {
  return (
    <Router>
      <Routing />
    </Router>
  );
};

export default App;
