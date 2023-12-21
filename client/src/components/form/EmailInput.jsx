import React from "react";

const EmailInput = ({ className, id, name, data, setData, placeholder }) => {
  return (
    <div>
      <input
        className={className}
        type="email"
        name={name}
        id={id}
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default EmailInput;
