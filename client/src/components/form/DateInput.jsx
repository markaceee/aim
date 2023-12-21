import React from "react";

const DateInput = ({ className, id, name, data, setData, isRequired }) => {
  return (
    <div>
      <input
        className={className}
        type="date"
        id={id}
        name={name}
        value={data}
        onChange={(e) => setData(e.target.value)}
        required={isRequired}
      />
    </div>
  );
};

export default DateInput;
