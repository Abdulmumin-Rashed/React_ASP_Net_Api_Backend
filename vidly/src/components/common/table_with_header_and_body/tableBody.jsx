import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  };
  const createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };
  return (
    <tbody>
      {data &&
        data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      {data.length <= 0 && (
        <tr>
          <td colSpan="6" className="text-center text-danger">
            There are no Data !
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
