/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Like, Table } from "../../common";
import UserContext from "../../../contexts/userContext";

const MoviesTable = ({ movies, onSort, sortColumn, onDelete, onLike }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([
    {
      path: "title",
      label: "Title",
      content: (movie) => <Link to={`/movies/${movie.id}`}>{movie.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      label: "Like",
      content: (movie) => <Like liked={movie.liked} />,
    },
  ]);
  const actionsColumn = {
    key: "actions",
    label: "Actions",
    content: (movie) => (
      <button className="btn btn-danger mx-2" onClick={() => onDelete(movie)}>
        Delete
      </button>
    ),
  };
  const user = useContext(UserContext);
  useEffect(() => {
    if (user?.isAdmin === "True") {
      setColumns([...columns, actionsColumn]);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);
  return !isLoading ? (
    <Table
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
      columns={columns}
    />
  ) : (
    <h1>loading...</h1>
  );
};

export default MoviesTable;
