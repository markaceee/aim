import React from "react";
import ErrorMessage from "./ErrorMessage";
import invalid from "../../../assets/svg/invalid.svg";
const SelectField = ({ id, name, value, onChange, options, error }) => (
  <td>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`text-input rounded-md ${
        error ? "border-red-500 border-2" : "border-gray-300"
      }`}
    >
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ErrorMessage error={error} svg={invalid} />
  </td>
);

export default SelectField;
