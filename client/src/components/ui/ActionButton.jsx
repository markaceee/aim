import React from "react";
import testIcon from "../../assets/svg/gear-white.svg";

const ActionButton = ({ bgColor, textColor, textContent, customFunction }) => {
  return (
    <button
      onClick={() => {
        console.log(typeof customFunction);
        customFunction();
      }}
      className={` ${bgColor} ${textColor} flex p-2 rounded gap-2`}
    >
      <span>
        <img className="h-6 max-w-none" src={testIcon} alt="test" />
      </span>
      <p>{textContent}</p>
      <span>
        <img className="h-6 max-w-none" src={testIcon} alt="test" />
      </span>
    </button>
  );
};

export default ActionButton;
