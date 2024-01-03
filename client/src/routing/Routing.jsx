import React, { useEffect } from "react";
import { useJwt } from "react-jwt";
import { Route, Routes } from "react-router-dom";
import { getAuthToken, removeAuthHeader } from "../api/axios_helper";
import Container from "../components/ui/Container";
import TestPage from "../components/ui/TestPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";

import Login from "../pages/Admin/Login/Login";
import Instructor from "../pages/Instructor/Instructor";
import InstructorRegister from "../pages/Instructor/InstructorRegister";
import VerifiedRegister from "../pages/Instructor/VerifiedRegister";
import Month from "../pages/Management/StudentRegistration/MonthTable/Month";
import StudentManagement from "../pages/Management/StudentRegistration/StudentManagement";
import ImageUpload from "../pages/Management/StudentRegistration/StudentRegistration/ImageUpload";
import Register from "../pages/Management/StudentRegistration/StudentRegistration/Register";
// import ShowStudent from "../pages/Management/StudentRegistration/StudentRegistration/ShowStudent";
import Payout from "../pages/Payout/Payout";
import { TransactionHistory } from "../pages/Payout/TransactionHistory";
import Paypal from "../pages/Paypal/Paypal";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import TeachingMaterial from "../pages/Management/TeachingMaterialManagement/TeachingMaterial";

const Routing = () => {
  const { decodedToken, isExpired } = useJwt(getAuthToken());

  useEffect(() => {
    if (isExpired) {
      removeAuthHeader();
    }
  }, [isExpired]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/paypal" element={<Paypal />} />
      <Route path="/payout">
        <Route
          index
          element={
            <Container>
              <Payout />
            </Container>
          }
        ></Route>
        <Route
          path="history"
          element={
            <Container>
              <TransactionHistory />
            </Container>
          }
        ></Route>
      </Route>
      <Route path="/instructor">
        <Route index element={<Instructor />} />
        <Route path="register" element={<InstructorRegister />} />
        <Route path="verified-email" element={<VerifiedRegister />} />
      </Route>

      <Route
        path="/student-management"
        element={
          <Container>
            <StudentManagement />
          </Container>
        }
      />
      <Route
        path="/login"
        element={<Login decodedToken={decodedToken} isExpired={isExpired} />}
      />
      {/* ------------------------------------------- */}
      <Route
        path="/student-management/register"
        element={
          <Container>
            <Register />
          </Container>
        }
      />

      <Route
        path="/teaching-material-management"
        element={
          <Container>
            <TeachingMaterial />
          </Container>
        }
      />
      <Route
        path="/student-management/image-upload-local"
        element={
          <Container>
            <ImageUpload />
          </Container>
        }
      />
      <Route
        path="/student-management/show-student"
        element={<Container>{/* <ShowStudent /> */}</Container>}
      />
      <Route
        path="/student-management/month"
        element={
          <Container>
            <Month />
          </Container>
        }
      />
      {/* ------------------------------------------- */}
      <Route
      // element={
      //   <PrivateRouteAdmin
      //     decodedToken={decodedToken}
      //     isExpired={isExpired}
      //   />
      // }
      >
        <Route
          path="/dashboard"
          element={
            <Container>
              <Dashboard />
            </Container>
          }
        />

        {/* <Route
          path="/student-management"
          element={
            <Container>
              <StudentManagement />
            </Container>
          }
        />
        {/* <Route
          path="/student-management/register"
          element={
            <Container>
              <RegisterStudent />
            </Container>
          }
        /> */}
      </Route>
      <Route
        path="*"
        element={
          <Container>
            <TestPage />
          </Container>
        }
      />
    </Routes>
  );
};

export default Routing;
