import React from "react";

const ErrorMessage = ({ error, svg }) => {
  return (
    <div>
      {error && (
        <span className="flex items-center gap-2 w-fit p-[2px]">
          <img src={svg} alt="" className="m-0" />
          {error}
        </span>
      )}
    </div>
  );
};

export default ErrorMessage;
