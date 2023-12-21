import React, { useEffect, useState } from "react";
import http from "../../../utils/http";

const ShowStudent = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const paramId = searchParams.get("id");

  const [student, setStudent] = useState({});

  const getStudentDetails = () => {
    http
      .get(`/search?id=${paramId}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStudentDetails();
  }, []);

  return (
    <div className="w-full m-5">
      <div className="h-10 w-full text-white bg-[#404D6C]">
        Student Registration
      </div>
      <div className="h-5/6 w-full overflow-scroll overflow-x-hidden">
        <div className="w-full">
          <table className="student-registration-tbl flex w-full">
            <tbody className="flex flex-col w-full">
              <tr>
                <th>First Name</th>
                <td>
                  <input
                    type="text"
                    className={"text-input rounded-md"}
                    name="firstName"
                    value={student.firstName}
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <th>Middle Name</th>
                <td>
                  <input
                    type="text"
                    className="text-input rounded-md"
                    name="middleName"
                    value={student.middleName}
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>
                  <input
                    type="text"
                    className="text-input rounded-md"
                    name="lastName"
                    value={student.lastName}
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <th>Age</th>
                <td>
                  <input
                    type="text"
                    className="text-input rounded-md"
                    name="age"
                    value={student.age}
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>
                  <input
                    type="text"
                    className="text-input rounded-md"
                    name="gender"
                    value={student.gender}
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>
                  <input
                    type="text"
                    className="text-input rounded-md"
                    name="dateOfBirth"
                    value={student.dateOfBirth}
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <th>Address</th>
                <td>
                  <input
                    type="text"
                    className="text-input rounded-md"
                    name="address"
                    value={student.address}
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <input
                    type="text"
                    className="text-input rounded-md"
                    name="email"
                    value={student.email}
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <th>Mode of Payment</th>
                <td>
                  <input
                    type="text"
                    className="text-input rounded-md"
                    name="paymentMode"
                    value={student.paymentMode}
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <th>Skype ID</th>
                <td>
                  <input
                    type="text"
                    className="text-input rounded-md"
                    name="skypeId"
                    value={student.skypeId}
                    disabled={true}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowStudent;
