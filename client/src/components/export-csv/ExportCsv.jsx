import React from "react";
import { CSVLink } from "react-csv";
import testIcon from "../../assets/svg/gear-white.svg";

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
      <div className={` ${bgColor} ${textColor} flex p-2 rounded gap-2`}>
        <span>
          <img className="h-6 max-w-none" src={testIcon} alt="test" />
        </span>
        <p>{exportName}</p>
        <span>
          <img className="h-6 max-w-none" src={testIcon} alt="test" />
        </span>
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
