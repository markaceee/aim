import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExportCsv from "../../../components/export-csv/ExportCsv";
import DateInput from "../../../components/form/DateInput";
import ActionButton from "../../../components/ui/ActionButton";
import WindowContainer from "../../../components/ui/WindowContainer";
import http from "../../../utils/http";
import EmailInputRow from "../StudentRegistration/EmailInputRow";
import NumberInputRow from "../StudentRegistration/NumberInputRow";
import PaymentSelectInputRow from "../StudentRegistration/PaymentSelectInputRow";
import StudentManagementResult from "../StudentRegistration/StudentManagementResult";
import TextInputRow from "../StudentRegistration/TextInputRow";
// import { DateTime } from "luxon";

const TeachingMaterial = () => {
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

  return (
    <div className="w-full">
      <WindowContainer headerTitle="Student" header={true}>
        <div className="student-management px-9 py-6 w-full">
          <div className="sub-header flex gap-3 mb-3">
            {/* <form onSubmit={handleSearch}>
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
            <form className="flex flex-col">
              <table className="flex w-full student-management-tbl">
                <tbody className="flex flex-col w-full">
                  <tr>
                    {/* <a href="localhost:8080/api/aim/search/{user.id}"></a> */}
                    <TextInputRow
                      headerTitle="Name"
                      className="w-3/4 rounded-sm outline outline-0"
                      name="name"
                      id="name"
                      placeholder="Enter name"
                      value={inputValues.name}
                      onChange={handleInputChange}
                    />

                    <NumberInputRow
                      headerTitle="Age"
                      className="w-3/4 rounded-sm outline outline-0"
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
                      className="w-3/4 rounded-sm outline outline-0"
                      name="skypeId"
                      id="skypeId"
                      placeholder="Enter skype"
                      value={inputValues.skypeId}
                      onChange={handleInputChange}
                    />

                    <EmailInputRow
                      headerTitle="Email"
                      className="w-3/4 rounded-sm outline outline-0"
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
                      className="w-3/4 rounded-sm outline outline-0"
                      name="address"
                      id="address"
                      placeholder="Enter address"
                      value={inputValues.address}
                      onChange={handleInputChange}
                    />
                    <th>
                      <span className="ml-3">Date of Birth</span>
                    </th>
                    <td className="p-2">
                      <DateInput
                        data={dateOfBirthValue}
                        setData={setDateOfBirthValue}
                        className="w-3/4 rounded-sm outline outline-0"
                        isRequired={false}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className="ml-3">Gender</span>
                    </th>
                    <td className="flex p-2 grow gap-x-2">
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
                      className="w-3/4 border border-black border-solid"
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

export default TeachingMaterial;
