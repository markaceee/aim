import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";

const BasicTable = ({ data, columns, openModal, setOpenModal, setSelectedUser}) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  return (
    <div>
      <div className="flex items-center justify-center w-full m-2">
        <label htmlFor="searchFilter">Search: </label>
        <input
          className="w-3/4 outline outline-0 p-0 pl-2 m-1 rounded-sm"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <table className="w3-school-table w-full border border-solid">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "↑", desc: "↓" }[
                        header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {cell.column.columnDef.accessorKey === "fullName" ? (
                    <Link
                      to={`/student-management/show-student?id=${cell.getContext().row.original.id}`}
                      className="text-blue-500"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Link>
                  ) : cell.column.columnDef.accessorKey === 'action' ? (
                    <button className="px-2 py-1 bg-blue-500 rounded text-white text-sm " onClick={() => {
                      const selectedUser = flexRender(cell.column.columnDef.cell, cell.getContext()).props.row.original;
                      setSelectedUser(selectedUser);
                      setOpenModal(!openModal)
                    }}>Payout</button>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}

        </tbody>
        {/* <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
      </table>
      <div hidden>
        <button onClick={() => table.setPageIndex(0)}>First Page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous Page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last Page
        </button>
      </div>

    </div>
  );
};

export default BasicTable;
