import React from "react";

const EmailInputRow = ({
  headerTitle,
  className,
  name,
  id,
  placeholder,
  value,
  onChange,
}) => {
  const sanitizedValue = value !== null && value !== undefined ? value : "";

  return (
    <>
      <th><span className="ml-3">{headerTitle}</span></th>
      <td className="w-full p-2">
        <input
          className={className}
          type="email"
          name={name}
          id={id}
          placeholder={placeholder}
          value={sanitizedValue}
          onChange={onChange}
        />
      </td>
    </>
  );
};

export default EmailInputRow;
