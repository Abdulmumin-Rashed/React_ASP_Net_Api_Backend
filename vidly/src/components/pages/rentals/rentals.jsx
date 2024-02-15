import React, { useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Pagination, Select, Search } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../../utils/paginate";
import UserContext from "../../../contexts/userContext";
import {
  changePage,
  changeSize,
  claimMovie,
  fetchRentals,
  searchRentals,
  sortRentals,
} from "../../../features/rentals/rentals-slice";
import RentalsTable from "./rentalsTable";

const Rentals = () => {
  const {
    rentals,
    pageSize,
    currentPage,
    sortColumn,
    searchQuery,
    isLoading,
    isError,
    errorMsg,
  } = useSelector((store) => store.rental);
  const dispatch = useDispatch();
  // const [rentals, setRentals] = useState([]);
  // const [pageSize, setPageSize] = useState(4);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  // const [searchQuery, setSearchQuery] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  // const [errorMsg, setError] = useState("");

  useEffect(() => {
    dispatch(fetchRentals());
  }, [dispatch]);
  const handleReturn = async (rent) => {
    console.log(rent);
    dispatch(claimMovie(rent.id));
  };
  const handleSort = (column) => {
    dispatch(sortRentals(column));
  };
  const handleSearch = (query) => {
    dispatch(searchRentals(query));
  };
  const handleSizeChange = ({ target }) => {
    dispatch(changeSize(target.value));
  };
  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };
  const getPagedData = () => {
    let filtered = rentals;
    if (searchQuery) {
      filtered = rentals.filter((rent) =>
        rent.customer.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    const orderedCustomers = _.orderBy(
      filtered,
      sortColumn.path,
      sortColumn.order
    );
    const data = Paginate(orderedCustomers, currentPage, pageSize);
    return {
      data,
      customersCount: filtered.length,
    };
  };
  if (isLoading) {
    return (
      <div className="col">
        <span className="display-6">loading data </span>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="col">
        <span className="display-6 text-danger">Error: {errorMsg} </span>
      </div>
    );
  }
  const { data: pagedRents, customersCount: totalCount } = getPagedData();
  return (
    <div className="row">
      {rentals.length === 0 ? (
        <div className="col">
          <h1>There are no Rents !</h1>
          <UserContext.Consumer>
            {(userContext) =>
              userContext && (
                <Link to="/customers/new" className="btn btn-primary mx-2 mb-2">
                  New Rent
                </Link>
              )
            }
          </UserContext.Consumer>
        </div>
      ) : (
        <div className="col">
          <UserContext.Consumer>
            {(userContext) =>
              userContext && (
                <Link to="/customers/new" className="btn btn-primary mx-2 mb-2">
                  New Rent
                </Link>
              )
            }
          </UserContext.Consumer>
          <div className="row m-2">
            <div className="col-6">
              <label htmlFor="search" className="form-label">
                Showing {totalCount} of {rentals.length} Customers
              </label>
              <Search
                name={"search"}
                value={searchQuery}
                label="Search for customer"
                onChange={handleSearch}
              />
            </div>
            <div className="col-6">
              <Select
                name="pageSize"
                label="Rows"
                //errorMessage={errorMessage}
                onChange={handleSizeChange}
                options={[
                  { id: 2, name: 2 },
                  { id: 3, name: 3 },
                  { id: 4, name: 4 },
                  { id: 5, name: 5 },
                  { id: 10, name: 10 },
                  { id: 20, name: 20 },
                ]}
              />
            </div>
          </div>
          <RentalsTable
            rentals={pagedRents}
            sortColumn={sortColumn}
            onSort={handleSort}
            onReturn={handleReturn}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          ></Pagination>
        </div>
      )}
    </div>
  );
};

export default Rentals;
