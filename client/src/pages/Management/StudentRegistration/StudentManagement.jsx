import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExportCsv from "../../../components/export-csv/ExportCsv";
import DateInput from "../../../components/form/DateInput";
import ActionButton from "../../../components/ui/ActionButton";
import WindowContainer from "../../../components/ui/WindowContainer";
import http from "../../../utils/http";
import EmailInputRow from "./EmailInputRow";
import NumberInputRow from "./NumberInputRow";
import PaymentSelectInputRow from "./PaymentSelectInputRow";
import StudentManagementResult from "./StudentManagementResult";
import TextInputRow from "./TextInputRow";
// import { DateTime } from "luxon";

const StudentManagement = () => {
  const headers = [
    // { label: "Id", key: "id" },
    { label: "Full name", key: "fullName" },
    { label: "Skype ID", key: "skypeId" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address" },
    { label: "Date Of Birth", key: "birthDate" },
    { label: "Gender", key: "gender" },
    { label: "Picture", key: "picture" },
    { label: "Payment", key: "payment" },
    { label: "Areas for Improvement", key: "areasForImprovement" },
  ];
  const columns = [];
  headers.map((item) => {
    // if (item.key == "birthDate")
    //   columns.push({
    //     header: item.label,
    //     accessorKey: item.key,
    //     footer: item.label,
    //     cell: (info) =>
    //       DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    //   });
    // else
    // if (item.key == "id")
    //   columns.push({
    //     header: item.label,
    //     accessorKey: item.key,
    //     footer: item.label,
    //   });
    // else
    columns.push({
      header: item.label,
      accessorKey: item.key,
      footer: item.label,
    });
  });

  const [genderValue, setGenderValue] = useState("");
  const [paymentModeValue, setPaymentModeValue] = useState("");
  const [dateOfBirthValue, setDateOfBirthValue] = useState("");

  const [inputValues, setInputValues] = useState({
    name: null,
    gender: null,
    address: null,
    age: null,
    paymentMode: null,
    email: null,
    skypeId: null,
    dateOfBirth: null,
  });

  const handleClearSearch = (event) => {
    event.preventDefault();
    setInputValues({
      name: "",
      gender: null,
      address: "",
      age: "",
      paymentMode: null,
      email: "",
      skypeId: "",
      dateOfBirth: null,
    });
    setGenderValue("");
    setPaymentModeValue("");
    setDateOfBirthValue("");
    setObjData([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleGenderSelect = (event) => {
    setInputValues({ ...inputValues, gender: event.target.value });
    setGenderValue(event.target.value);
  };

  const [objData, setObjData] = useState([]);
  const [isResultFound, setIsResultFound] = useState(true);

  const formatDateToArray = (dateProp) => {
    const date = new Date(dateProp);
    const dateArray = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return dateArray;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let formattedArrayDate = formatDateToArray(dateOfBirthValue);
    const searchData = {
      name: inputValues.name == "" ? null : inputValues.name,
      gender: inputValues.gender,
      address: inputValues.address == "" ? null : inputValues.address,
      age: inputValues.age == "" ? null : inputValues.age,
      paymentMode: inputValues.paymentMode,
      email: inputValues.email == "" ? null : inputValues.email,
      skypeId: inputValues.skypeId == "" ? null : inputValues.skypeId,
      dateOfBirth: dateOfBirthValue == "" ? null : formattedArrayDate,
    };

    await http
      .post("/search", searchData)
      .then((res) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const updatedData = res.data.map((user) => {
          let fullName =
            user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
          if (user.middleName) fullName += " " + user.middleName.toUpperCase();
          fullName +=
            " " +
            user.lastName.charAt(0).toUpperCase() +
            user.lastName.slice(1);

          let dateOfBirth;

          if (user.dateOfBirth !== null) {
            dateOfBirth = new Date(
              user.dateOfBirth[0],
              user.dateOfBirth[1] - 1,
              user.dateOfBirth[2]
            );
          }

          return {
            id: user.id,
            fullName,
            birthDate: dateOfBirth
              ? `${
                  months[dateOfBirth.getMonth()]
                } ${dateOfBirth.getDate()}, ${dateOfBirth.getFullYear()}`
              : "",
            ...user,
          };
        });
        setIsResultFound(updatedData.length != 0 ? true : false);
        setObjData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full">
<<<<<<< HEAD
      <WindowContainer headerTitle="Dashboard">
        <div className="w-full p-3 student-management">
          <div className="flex gap-3 mb-3 sub-header">
            {/* <form onSubmit={handleSearch}>
=======
      <WindowContainer headerTitle="Student">
        <div className="student-management px-9 py-6 w-full">
          <div className="sub-header flex gap-3 mb-3">
              {/* <form onSubmit={handleSearch}>
>>>>>>> 076196b26be8f6ada11ccd0a8de7103f5134987c
              <div className="p-2 pl-0">
                <button type="submit">Register</button>
              </div>
            </form> */}
            <Link to="/student-management/register">
              <ActionButton
                textContent="New Student Registration"
                textColor="text-white"
                bgColor="bg-[#1A6EB5]"
              />
            </Link>
            <ExportCsv
              data={objData}
              headers={headers}
              filename={"test"}
              exportName={"Download in CSV format"}
              textColor="text-white"
              bgColor="bg-[#1A6EB5]"
            />
          </div>

          <WindowContainer headerTitle="Student Search">
            <form onSubmit={handleSearch} className="flex flex-col">
              <table className="flex w-full student-management-tbl">
                <tbody className="flex flex-col w-full">
                  <tr>
                    {/* <a href="localhost:8080/api/aim/search/{user.id}"></a> */}
                    <TextInputRow
                      headerTitle="Name"
<<<<<<< HEAD
                      className="w-3/4 outline outline-1"
=======
                      className="outline outline-0 w-3/4 rounded-sm"
>>>>>>> 076196b26be8f6ada11ccd0a8de7103f5134987c
                      name="name"
                      id="name"
                      placeholder="Enter name"
                      value={inputValues.name}
                      onChange={handleInputChange}
                    />

                    <NumberInputRow
                      headerTitle="Age"
<<<<<<< HEAD
                      className="w-3/4 outline outline-1"
=======
                      className="outline outline-0 w-3/4 rounded-sm"
>>>>>>> 076196b26be8f6ada11ccd0a8de7103f5134987c
                      name="age"
                      id="age"
                      placeholder="Enter Age"
                      value={inputValues.age}
                      onChange={handleInputChange}
                    />
                  </tr>
                  <tr>
                    <TextInputRow
                      headerTitle="Skype"
<<<<<<< HEAD
                      className="w-3/4 outline outline-1"
=======
                      className="outline outline-0 w-3/4 rounded-sm"
>>>>>>> 076196b26be8f6ada11ccd0a8de7103f5134987c
                      name="skypeId"
                      id="skypeId"
                      placeholder="Enter skype"
                      value={inputValues.skypeId}
                      onChange={handleInputChange}
                    />

                    <EmailInputRow
                      headerTitle="Email"
<<<<<<< HEAD
                      className="w-3/4 outline outline-1"
=======
                      className="outline outline-0 w-3/4 rounded-sm"
>>>>>>> 076196b26be8f6ada11ccd0a8de7103f5134987c
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      value={inputValues.email}
                      onChange={handleInputChange}
                    />
                  </tr>
                  <tr>
                    <TextInputRow
                      headerTitle="Address"
<<<<<<< HEAD
                      className="w-3/4 outline outline-1"
=======
                      className="outline outline-0 w-3/4 rounded-sm"
>>>>>>> 076196b26be8f6ada11ccd0a8de7103f5134987c
                      name="address"
                      id="address"
                      placeholder="Enter address"
                      value={inputValues.address}
                      onChange={handleInputChange}
                    />
                    <th><span className="ml-3">Date of Birth</span></th>
                    <td className="p-2">
                      <DateInput
                        data={dateOfBirthValue}
                        setData={setDateOfBirthValue}
                        className="outline outline-0 w-3/4 rounded-sm"
                        isRequired={false}
                      />
                    </td>
                  </tr>
                  <tr>
<<<<<<< HEAD
                    <th className="">Gender</th>
                    <td className="flex p-2 grow gap-x-2">
=======
                  <th><span className="ml-3">Gender</span></th>
                    <td className="flex grow p-2 gap-x-2">
>>>>>>> 076196b26be8f6ada11ccd0a8de7103f5134987c
                      <div className="flex items-center gap-x-2">
                        <input
                          className="border border-solid"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                          checked={genderValue === "male"}
                          onChange={handleGenderSelect}
                        />
                        <label htmlFor="male">Male</label>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <input
                          className="border border-solid"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          checked={genderValue === "female"}
                          onChange={handleGenderSelect}
                        />
                        <label htmlFor="female">Female</label>
                      </div>
                    </td>
                    <PaymentSelectInputRow
                      headerTitle="Payment Mode"
<<<<<<< HEAD
                      className="w-3/4 border border-black border-solid"
=======
                      className="outline outline-0 w-3/4 rounded-sm"
>>>>>>> 076196b26be8f6ada11ccd0a8de7103f5134987c
                      name="paymentMode"
                      id="paymentMode"
                      data={paymentModeValue}
                      setData={setPaymentModeValue}
                    />
                  </tr>
                </tbody>
              </table>
              <div className="mx-auto my-2 flex justify-center gap-x-2 p-3 w-10/12 bg-[#f1f1f1]">
                <button
                  onClick={handleClearSearch}
                  className="bg-[#1A6EB5] text-white px-2 py-1 rounded-sm w-1/4"
                >
                  Clear Search
                </button>
                <button
                  type="submit"
                  className="bg-[#1A6EB5] text-white px-2 py-1 rounded-sm w-1/4"
                >
                  Search
                </button>
              </div>
            </form>
          </WindowContainer>
          <br />
          <br />
          <br />
          <WindowContainer headerTitle="Search Result">
            <StudentManagementResult searchResult={objData} columns={columns} />
            {!isResultFound && <p>No result found</p>}
          </WindowContainer>
        </div>
      </WindowContainer>
    </div>
  );
};

export default StudentManagement;
