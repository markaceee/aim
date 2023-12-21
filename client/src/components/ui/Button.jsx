import React from "react";

const Button = ({ color, text, data }) => {
  return (
    <button
      className={`lg:w-1/2 lg:text-xl md:text-lg sm:w-full sm:text-xs h-10 bg-[#3371BC] text-${color} rounded-md p-2 text-center`}
      onChange={data}
    >
      {text}
    </button>
  );
};

export default Button;
