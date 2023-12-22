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
            birthDate: dateOfBirth ? `${months[dateOfBirth.getMonth()]
              } ${dateOfBirth.getDate()}, ${dateOfBirth.getFullYear()}` : "",
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
      <WindowContainer headerTitle="Dashboard">
        <div className="student-management p-3 w-full">
          <div className="sub-header flex gap-3 mb-3">
              {/* <form onSubmit={handleSearch}>
              <div className="p-2 pl-0">
                <button type="submit">Register</button>
              </div>
            </form> */}
            <Link to="/student-management/register">
              <ActionButton
                textContent="Register"
                textColor="text-white"
                bgColor="bg-[#1A6EB5]"
              />
            </Link>
            <ExportCsv
              data={objData}
              headers={headers}
              filename={"test"}
              exportName={"Export"}
              textColor="text-white"
              bgColor="bg-[#1A6EB5]"
            />
          </div>
          <WindowContainer headerTitle="Student Search">
            <form onSubmit={handleSearch} className="flex flex-col">
              <table className="student-management-tbl flex w-full">
                <tbody className="flex flex-col w-full">
                  <tr>
                    {/* <a href="localhost:8080/api/aim/search/{user.id}"></a> */}
                    <TextInputRow
                      headerTitle="Name"
                      className="outline outline-1 w-3/4"
                      name="name"
                      id="name"
                      placeholder="Enter name"
                      value={inputValues.name}
                      onChange={handleInputChange}
                    />

                    <NumberInputRow
                      headerTitle="Age"
                      className="outline outline-1 w-3/4"
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
                      className="outline outline-1 w-3/4"
                      name="skypeId"
                      id="skypeId"
                      placeholder="Enter skype"
                      value={inputValues.skypeId}
                      onChange={handleInputChange}
                    />

                    <EmailInputRow
                      headerTitle="Email"
                      className="outline outline-1 w-3/4"
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
                      className="outline outline-1 w-3/4"
                      name="address"
                      id="address"
                      placeholder="Enter address"
                      value={inputValues.address}
                      onChange={handleInputChange}
                    />
                    <th>Date of Birth</th>
                    <td className="p-2">
                      <DateInput
                        data={dateOfBirthValue}
                        setData={setDateOfBirthValue}
                        className="outline outline-1"
                        isRequired={false}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="">Gender</th>
                    <td className="flex grow p-2 gap-x-2">
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
                      className="border border-solid border-black w-3/4"
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