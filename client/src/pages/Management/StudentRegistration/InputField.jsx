import React from "react";
import invalid from "../../../assets/svg/invalid.svg";
import ErrorMessage from "./ErrorMessage";

const InputField = ({
  name,
  type,
  value = "",
  onChange,
  placeholder,
  error,
  disabled,
}) => (
  <td>
    <input
      type={type}
      className={`text-input rounded-sm ${
        error ? "border-red-500 border-2" : "border-gray-300"
      }`}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />

    <ErrorMessage error={error} svg={invalid} />
  </td>
);

export default InputField;
