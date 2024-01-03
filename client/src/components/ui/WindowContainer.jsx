import React from "react";

const WindowContainer = ({ headerTitle, children, header}) => {
  return (
    <div className='relative'>
      <div className={`${ header ? "dark-header" : "white-header"} text-white p-3`}>{headerTitle}</div>
      <div className="border border-solid">{children}</div>
    </div>
  );
};
// #252C41
// #515A79
export default WindowContainer;
