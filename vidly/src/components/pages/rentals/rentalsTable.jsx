/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Table } from "../../common";
import UserContext from "../../../contexts/userContext";

const RentalsTable = ({ rentals, sortColumn, onSort, onReturn }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([
    {
      path: "customer",
      label: "Customer",
      content: (rent) => (
        <Link to={`/customers/${rent.id}`}>{rent.customer}</Link>
      ),
    },
    { path: "movie", label: "Movie" },
    {
      path: "dateOut",
      label: "Date Out",
    },
    {
      path: "dateReturned",
      label: "Date Returned",
      content: (customer) => (
        <p>
          {customer.dateReturned !== null
            ? customer.dateReturned
            : "not Returned"}
        </p>
      ),
    },
  ]);
  const returnText = {
    key: "actions",
    label: "Actions",
    content: (rent) => (
      <button className="btn btn-danger mx-2" onClick={() => onReturn(rent)}>
        Claim
      </button>
    ),
  };
  const returnButton = {
    path: "rentalFee",
    label: "Rental Fee",
    content: (rent) => (
      <p>
        {rent.rentalFee !== null ? (
          `$${rent.rentalFee.toFixed(2)}`
        ) : (
          <button
            className="btn btn-danger mx-2"
            onClick={() => onReturn(rent)}
          >
            Returned
          </button>
        )}
      </p>
    ),
  };
  const user = useContext(UserContext);
  useEffect(() => {
    if (user?.isAdmin === "True") {
      setColumns([...columns, returnButton]);
    } else {
      setColumns([...columns, returnText]);
    }
    setIsLoading(false);
  }, [user]);
  return !isLoading ? (
    <Table
      data={rentals}
      sortColumn={sortColumn}
      onSort={onSort}
      columns={columns}
    />
  ) : (
    <h1>loading...</h1>
  );
};

export default RentalsTable;
