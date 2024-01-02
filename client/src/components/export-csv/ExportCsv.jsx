import React from "react";
import { CSVLink } from "react-csv";
import { FcUpload } from "react-icons/fc";

const ExportCsv = ({
  headers,
  data,
  filename,
  exportName,
  bgColor,
  textColor,
}) => {
  return (
    <CSVLink data={data} headers={headers} filename={filename}>
      <div className={` ${bgColor} ${textColor} flex p-2 rounded gap-2 items-center`}>
        <span >
          <FcUpload size='30' style={{color: 'yellow'}} />
        </span>
        <p>{exportName}</p>
        <div className="bg-blue-950 rounded-full h-0 w-0 p-2 flex justify-center items-center"><p className="text-center">+</p></div>
      </div>
    </CSVLink>
  );
};
export default ExportCsv;

// import React from "react";
// import testIcon from "../../assets/svg/gear-white.svg";

// const ActionButton = ({
//   bgColor,
//   textColor,
//   textContent,
//   customFunction,
// }) => {
//   return (
//     <button
//       onClick={() => customFunction()}
//       className={` ${bgColor} ${textColor} flex p-2 rounded gap-2`}
//     >
//       <span>
//         <img className="h-6 max-w-none" src={testIcon} alt="test" />
//       </span>
//       <p>{textContent}</p>
//       <span>
//         <img className="h-6 max-w-none" src={testIcon} alt="test" />
//       </span>
//     </button>
//   );
// };

// export default ActionButton;
