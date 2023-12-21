import React from "react";

const TextInput = ({ className, id, placeholder, name, value, onChange }) => {
  return (
    <input
      className={className}
      type="text"
      id={id}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
