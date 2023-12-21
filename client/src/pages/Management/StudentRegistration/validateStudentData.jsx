import React from "react";
export const validateStudentData = (student) => {
  const validationErrors = {};
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!student.firstName.trim()) {
    validationErrors.firstName = "First Name is required!";
  } else if (!/^[A-Za-z\s]+$/.test(student.firstName)) {
    validationErrors.firstName = "First Name is invalid";
  }
  if (!student.middleName.trim()) {
    validationErrors.middleName = "Middle Name is required!";
  } else if (!/^[A-Za-z\s]+$/.test(student.middleName)) {
    validationErrors.middleName = "Middle Name is invalid";
  }
  if (!student.lastName.trim()) {
    validationErrors.lastName = "Last Name is required!";
  } else if (!/^[A-Za-z\s]+$/.test(student.lastName)) {
    validationErrors.lastName = "Last Name is invalid";
  }
  if (!student.email.trim()) {
    validationErrors.email = "Email is required!";
  } else if (!emailRegex.test(student.email)) {
    validationErrors.email = "Email is not valid!";
  }

  if (!student.password.trim()) {
    validationErrors.password = "Password is required!";
  } else if (student.password.length < 8) {
    validationErrors.password = "Password must be at least 8 characters long!";
  } else if (!/[A-Z]/.test(student.password)) {
    validationErrors.password =
      "Password must contain at least 1 capital letter!";
  } else if (!/\d/.test(student.password)) {
    validationErrors.password = "Password must contain at least 1 number!";
  }

  if (!student.dateOfBirth.trim()) {
    validationErrors.dateOfBirth = "Date of Birth is required!";
  } else {
    // Assuming birthdate is in the format MM/DD/YYYY
    const parts = student.dateOfBirth.split("-");
    const birthYear = parseInt(parts[0], 10);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age < 15) {
      validationErrors.age = "Age must be 15 or above!";
    }
  }

  if (!student.gender.trim()) {
    validationErrors.gender = "Please select gender!";
  }
  if (!student.paymentMode.trim()) {
    validationErrors.paymentMode = "paymentMode is required!";
  }
  if (!student.address.trim()) {
    validationErrors.address = "Address is required!";
  }
  if (!student.skypeId.trim()) {
    validationErrors.skypeId = "Skype ID is required!";
  } else if (!/^[0-9]+$/.test(student.skypeId)) {
    validationErrors.skypeId = "Invalid Skype ID!";
  }
  if (!student.paymentMode.trim()) {
    validationErrors.paymentMode = "Select mode of payment!";
  }
  if (!student.areasForImprovement.trim()) {
    validationErrors.areasForImprovement =
      "Please provide student's areas for improvements!";
  }

  // Add more validation rules as needed...

  return validationErrors;
};

export default validateStudentData;
