import React, { useEffect, useMemo, useState } from "react";
import mData from "../../../data/MOCK_DATA.json";
import BasicTable from "../../../components/ui/BasicTable";

const StudentManagementResult = ({ searchResult, columns }) => {
  // const data = useMemo(() => mData, []);

  /** @type import('@tanstack/react-table').ColumnDef<any> */

  return (
    <div className="result-container p-3 w-full overflow-x-scroll">
      <div className="table-container">
        <BasicTable data={searchResult} columns={columns} />
      </div>
    </div>
  );
};

export default StudentManagementResult;
