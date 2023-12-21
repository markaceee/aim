import React from "react";

const TextInputRow = ({
  headerTitle,
  className,
  name,
  id,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      <th>{headerTitle}</th>
      <td className="p-2">
        <input
          className={className}
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
        />
      </td>
    </>
  );
};

export default TextInputRow;
