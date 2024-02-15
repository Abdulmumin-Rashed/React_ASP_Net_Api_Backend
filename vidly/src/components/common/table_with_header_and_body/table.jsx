/* eslint-disable no-unused-vars */
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { useState } from "react";

const Table = ({ columns, sortColumn, onSort, data }) => {
  const [localColumns, setLocalColumns] = useState(columns);
  // console.log(localColumns);
  return (
    <table className="table">
      <TableHeader
        columns={localColumns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody data={data} columns={localColumns} />
    </table>
  );
};

export default Table;
