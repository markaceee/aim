import React from "react";
import ErrorMessage from "./ErrorMessage";
import invalid from "../../../assets/svg/invalid.svg";
const TextAreaField = ({ name, value, onChange, error }) => (
  <td>
    <textarea
      className={`text-area rounded-md ${
        error ? "border-red-500 border-2" : "border-gray-300"
      }`}
      name={name}
      value={value}
      cols="10"
      rows="3"
      onChange={onChange}
    ></textarea>
    <ErrorMessage error={error} svg={invalid} />
  </td>
);

export default TextAreaField;
