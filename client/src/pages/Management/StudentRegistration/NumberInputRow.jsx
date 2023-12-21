import React from "react";

const NumberInputRow = ({
  headerTitle,
  className,
  name,
  id,
  min,
  max,
  placeholder,
  value,
  onChange,
}) => {
  const sanitizedValue = value !== null && value !== undefined ? value : "";

  return (
    <>
      <th>{headerTitle}</th>
      <td className="w-full p-2">
        <input
          className={className}
          type="number"
          name={name}
          id={id}
          min={min}
          max={max}
          placeholder={placeholder}
          value={sanitizedValue} // Use the sanitized value
          onChange={onChange}
        />
      </td>
    </>
  );
};

export default NumberInputRow;
