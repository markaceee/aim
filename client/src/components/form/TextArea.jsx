import React from "react";

const TextArea = ({ className, id, name, data, setData, placeholder }) => {
  return (
    <div>
      <textarea
        className={className}
        name={name}
        id={id}
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder={placeholder}
        cols="30"
        rows="3"
        required
      ></textarea>
    </div>
  );
};

export default TextArea;
