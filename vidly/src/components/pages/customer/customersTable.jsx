/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Table } from "../../common";
import UserContext from "../../../contexts/userContext";

const CustomersTable = ({ customers, sortColumn, onSort, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([
    {
      path: "name",
      label: "Name",
      content: (customer) => (
        <Link to={`/customers/${customer.id}`}>{customer.name}</Link>
      ),
    },
    { path: "phone", label: "Phone" },
    {
      path: "isGold",
      label: "Gold",
      content: (customer) => <p>{customer.isGold ? "True" : "False"}</p>,
    },
  ]);
  const actionsColumn = {
    key: "action",
    label: "Actions",
    content: (customer) => (
      <button
        className="btn btn-danger mx-2"
        onClick={() => onDelete(customer)}
      >
        Delete
      </button>
    ),
  };
  const user = useContext(UserContext);
  useEffect(() => {
    console.log(user);
    if (user?.isAdmin === "True") {
      setIsLoading(false);
      setColumns([...columns, actionsColumn]);
    } else {
      setIsLoading(false);
    }
  }, [user]);
  return !isLoading ? (
    <Table
      data={customers}
      sortColumn={sortColumn}
      onSort={onSort}
      columns={columns}
    />
  ) : (
    <h1>loading...</h1>
  );
};

export default CustomersTable;
