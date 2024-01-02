import React from "react";
import { FcBusinessman } from "react-icons/fc";

const ActionButton = ({ bgColor, textColor, textContent, customFunction }) => {
  return (
    <button
      onClick={() => {
        console.log(typeof customFunction);
        customFunction();
      }}
      className={` ${bgColor} ${textColor} flex p-2 rounded gap-2 items-center`}
    >
      <span>
        <FcBusinessman size='30' />
      </span>
      <p>{textContent}</p>
      <div className="bg-blue-950 rounded-full h-0 w-0 p-2 flex justify-center items-center"><p className="text-center">+</p></div>
    </button>
  );
};

export default ActionButton;
