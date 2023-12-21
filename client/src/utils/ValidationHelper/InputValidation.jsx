import React from "react";

class InputValidation {
  validateEmail = (email) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  validateName = (name) => {
    // Basic name validation (only letters and spaces)
    return /^[A-Za-z\s]+$/.test(name);
  };

  validateAge = (age) => {
    // Basic age validation (numeric value)
    return /^\d+$/.test(age);
  };

  validateDateOfBirth = (dateOfBirth) => {
    // Basic birthdate validation (for simplicity, you might want to use a library for more advanced validation)
    return /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth);
  };
  validateInput(name, value) {
    switch (name) {
      case "email":
        return this.validateEmail(value) ? "" : "Invalid email format";
      case "name":
        return this.validateName(value) ? "" : "Invalid name format";
      case "age":
        return this.validateAge(value) ? "" : "Invalid age";
      case "dateOfBirth":
        return this.validateDateOfBirth(value)
          ? ""
          : "Invalid birthdate format (YYYY-MM-DD)";
      default:
        return "";
    }
  }
}

export default InputValidation;
