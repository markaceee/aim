import React from "react";
import check from "../../assets/svg/check.svg";

const StatusBox = () => {
  return (
    <div className="flex justify-center items-center w-full h-16 bg-yellow-300 ">
      <img src={check} alt="" className="mr-3 h-6" />
      <h1>Hello!</h1>
    </div>
  );
};

export default StatusBox;
