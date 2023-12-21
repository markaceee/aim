import React from "react";

const RadioButton = ({ id, name, value, checked, onChange, label }) => (
  <>
    <input
      type="radio"
      className="outline outline-1"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id}>{label}</label>
  </>
);
export default RadioButton;
