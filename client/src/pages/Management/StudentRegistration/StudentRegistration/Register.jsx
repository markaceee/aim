import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import "../../../../App.css";
import { registerStudent } from "../../../../api/auth";
import invalid from "../../../../assets/svg/invalid.svg";
import TextInputRow from "../TextInputRow";
import ErrorMessage from "../ErrorMessage";
import PictureUpload from "../PictureUpload";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import RadioButton from "../RadioButton";
import SelectField from "../SelectField";
import { validateStudentData } from "../validateStudentData";
import axios from "axios";

const Register = ({ onImageResized }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageURL, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const cloud_name = "marlon123";
  const upload_preset = "l4hoz6kp";
  const [student, setStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    email: "",
    skypeId: "",
    paymentMode: "",
    areasForImprovement: "",
    password: "",
    role: "STUDENT",
  });
  const [errors, setErrors] = useState({});
  const [imageUploaded, setImageUploaded] = useState(false);
  // const handleImageUploaded = (uri) => {
  //   setStudent((prevStudent) => ({
  //     ...prevStudent,
  //     picture: uri,
  //   }));
  //   setImageUploaded((prevImageUploaded) => !prevImageUploaded);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dateOfBirth") {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const age = Math.floor(
        (currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000)
      );
      setStudent((prevStudent) => ({ ...prevStudent, age, [name]: value }));
    } else if (name === "age" && value === "") {
      setStudent((prevStudent) => ({ ...prevStudent, age: "", [name]: value }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        imageSelected &&
        (imageSelected.type === "image/png" ||
          imageSelected.type === "image/jpg" ||
          imageSelected.type === "image/jpeg")
      ) {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", upload_preset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imgData = response.data;
        const uploadedImageUrl = imgData.url.toString();
        setImageUrl(uploadedImageUrl);
        setImagePreview(null);
        setImageSelected(null);
        setImagePreview(null);
        setImageUploaded(false);
        setStudent((prevStudent) => ({
          ...prevStudent,
          picture: uploadedImageUrl,
        }));
      }
    } catch (error) {
      console.error(error);
      setError("Error uploading image");
      console.log("Error uploading image:", error.message);
    } finally {
      const validationErrors = validateStudentData(student);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        toast.success("Student Registered Successfully!");
        console.log("Submitted:", student);
        registerStudent(student)
          .then((response) => {
            console.log("success", response);
          })
          .catch((error) => {
            console.error("Error registering student:", error);
          });
        setStudent({
          firstName: "",
          middleName: "",
          lastName: "",
          age: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          email: "",
          skypeId: "",
          paymentMode: "",
          areasForImprovement: "",
          password: "",
          role: "STUDENT",
        });
      } else {
        console.log(validationErrors);
      }
      setIsLoading(false);
      fileInputRef.current.value = "";
      console.log("Register button clicked");
    }
  };
  const genderChange = (event) => {
    setStudent({ ...student, gender: event.target.value });
    setErrors({ ...errors, gender: "" });
  };
  const paymentModeChange = (event) => {
    setStudent({ ...student, paymentMode: event.target.value });
    setErrors({ ...errors, paymentMode: "" });
  };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageSelected(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
    const previewURL = URL.createObjectURL(selectedFile);
    setImagePreview(previewURL);
  };
  // const handleImageResized = (uri) => {
  //   setStudent((prevStudent) => ({
  //     ...prevStudent,
  //     picture: uri,
  //   }));
  // };
  const isFormValid = () => {
    return (
      errors.firstName.trim() !== "" &&
      errors.middleName.trim() !== "" &&
      errors.lastName.trim() !== "" &&
      errors.age.trim() !== "" &&
      errors.dateOfBirth.trim() !== "" &&
      errors.gender.trim() !== "" &&
      errors.address.trim() !== "" &&
      errors.email.trim() !== "" &&
      errors.skypeId.trim() !== "" &&
      errors.paymentMode.trim() !== "" &&
      errors.password.trim() !== "" &&
      errors.areasForImprovement.trim() !== ""
    );
  };

  return (
    <form className="w-full m-5" onSubmit={handleSubmit}>
      <div className="h-10 w-full text-white bg-[#404D6C]">
        Student Registration
      </div>
      <div className="w-full overflow-scroll overflow-x-hidden h-5/6">
        <div className="w-full">
          <table className="flex w-full student-registration-tbl">
            <tbody className="flex flex-col w-full">
              <tr>
                <th>First Name</th>
                <InputField
                  name="firstName"
                  type="text"
                  value={student.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  error={errors.firstName}
                />
              </tr>
              <tr>
                <th>Middle Name</th>
                <InputField
                  name="middleName"
                  type="text"
                  value={student.middleName}
                  onChange={handleChange}
                  placeholder="Middle Name"
                  error={errors.middleName}
                />
              </tr>
              <tr>
                <th>Last Name</th>
                <InputField
                  name="lastName"
                  type="text"
                  value={student.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  error={errors.lastName}
                />
              </tr>
              <tr>
                <th>Age</th>
                <InputField
                  label="Age"
                  name="age"
                  type="number"
                  value={student.age}
                  onChange={handleChange}
                  placeholder="Age"
                  error={errors.age}
                  svg={invalid}
                  disabled={!!student.dateOfBirth} // Set disabled based on the presence of dateOfBirth
                />
              </tr>
              <tr>
                <th>Date of Birth</th>
                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={student.dateOfBirth}
                  onChange={handleChange}
                  error={errors.dateOfBirth}
                  svg={invalid}
                />
              </tr>
              <tr>
                <th>Gender</th>
                <td>
                  <div className="flex flex-row gap-3 m-2">
                    <RadioButton
                      id="male"
                      name="gender"
                      value="MALE"
                      checked={student.gender === "MALE"}
                      onChange={genderChange}
                      label="Male"
                    />
                    <RadioButton
                      id="female"
                      name="gender"
                      value="FEMALE"
                      checked={student.gender === "FEMALE"}
                      onChange={genderChange}
                      label="Female"
                    />
                  </div>
                  <ErrorMessage
                    error={errors.gender}
                    svg={invalid}
                    className="mt-2"
                  />
                </td>
              </tr>
              <tr>
                <th>Address</th>
                <InputField
                  label="Address"
                  name="address"
                  type="text"
                  value={student.address}
                  onChange={handleChange}
                  placeholder="Address"
                  error={errors.address}
                  svg={invalid}
                  autocomplete="street-address" // Add autocomplete attribute for address
                />
              </tr>
              <tr>
                <th>Email Address</th>
                <InputField
                  label="Email Address"
                  name="email"
                  type="text"
                  value={student.email}
                  onChange={handleChange}
                  placeholder="Email"
                  error={errors.email}
                  svg={invalid}
                  autocomplete="email" // Add autocomplete attribute for email
                />
              </tr>

              <tr>
                <th>Password</th>
                <InputField
                  name="password"
                  type="password"
                  value={student.password}
                  onChange={handleChange}
                  placeholder="Password"
                  error={errors.password}
                />
              </tr>

              <tr>
                <th>Skype ID</th>
                <InputField
                  label="Skype ID"
                  name="skypeId"
                  type="number"
                  value={student.skypeId}
                  onChange={handleChange}
                  placeholder="Skype"
                  error={errors.skypeId}
                  svg={invalid}
                />
              </tr>

              <tr>
                <th>Mode of Payment</th>
                <SelectField
                  id="modeOfPayment"
                  name="modeOfPayment"
                  value={student.paymentMode}
                  onChange={paymentModeChange}
                  options={[
                    { value: "gcash", label: "GCash" },
                    { value: "maya", label: "Maya" },
                    { value: "paypal", label: "PayPal" },
                  ]}
                  error={errors.paymentMode}
                />
              </tr>

              <tr>
                <th>Areas for Improvements</th>
                <TextAreaField
                  name="areasForImprovement"
                  value={student.areasForImprovement}
                  onChange={handleChange}
                  error={errors.areasForImprovement}
                  svg={invalid}
                />
              </tr>
              <tr>
                <th>Upload Profile Picture</th>
                <td>
                  {!imageUploaded && (
                    <>
                      <p>
                        <label htmlFor="fileInput"></label>
                        <input
                          type="file"
                          id="fileInput"
                          ref={fileInputRef}
                          accept="image/png, image/jpeg, image/jpg"
                          name="image"
                          onChange={handleImageChange}
                        />
                      </p>
                      {isLoading && <p>Loading...</p>}
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="profileImg"
                          style={{
                            width: "30%",
                            height: "auto",
                          }}
                        />
                      )}
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-auto flex justify-center bg-[#F1F1F1] m-3">
        <div className="flex justify-center w-2/4 p-3">
          <button
            type="submit"
            className={`w-1/2 h-10 text-white rounded-md ${
              isFormValid && !imageUploaded ? "bg-blue-600" : "bg-blue-400"
            }`}
            disabled={!isFormValid || imageUploaded}
          >
            Register
          </button>
        </div>
      </div>
      <Toaster />
    </form>
  );
};

export default Register;
