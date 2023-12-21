import React from "react";

const WindowContainer = ({ headerTitle, children }) => {
  return (
    <div>
      <div className="bg-[#515A79] text-white p-3">{headerTitle}</div>
      <div className="border border-solid">{children}</div>
    </div>
  );
};

export default WindowContainer;
