import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import _ from "lodash";
import {
  changePage,
  changeSize,
  deleteCustomerAsync,
  fetchCustomers,
  searchCustomer,
  sortCustomer,
} from "../../../features/customer/customer-slice";
import { Pagination, Select, Search } from "../../common";
import CustomersTable from "./customersTable";
import UserContext from "../../../contexts/userContext";
import Paginate from "../../../utils/paginate";

const Customers = () => {
  const {
    customers,
    isLoading,
    isError,
    errorMsg,
    pageSize,
    currentPage,
    sortColumn,
    searchQuery,
  } = useSelector((store) => store.customer);
  const dispatch = useDispatch();
  // const [state, dispatch] = useReducer(reducer, defaultState);
  // const [customers, setCustomers] = useState([]);
  // const [isLoading, setIsPending] = useState(true);
  // const [isError, setIsError] = useState(false);
  // const [errorMsg, setError] = useState("");
  // const { data: customers, error, isPending, isError } = useFetchCustomers();
  // const [pageSize, setPageSize] = useState(4);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  // const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);
  const handleDelete = (customer) => {
    console.log(customer);
    dispatch(deleteCustomerAsync(customer.id));

    // setCustomers((currentCustomers) => {
    //   const customers = currentCustomers.filter((c) => c.id !== customer.id);
    //   return customers;
    // });
    // try {
    //   await deleteCustomer(customer.id);
    //   toast.success("Successfully deleted.");
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 404) {
    //     toast.error("This customer has already been deleted");
    //   }
    //   setCustomers((originalCustomer) => {
    //     return originalCustomers;
    //   });
    // }
  };
  const handleSort = useCallback(
    (column) => {
      dispatch(sortCustomer(column));
    },
    [dispatch]
  );
  const handleSearch = (query) => {
    dispatch(searchCustomer(query));
  };
  const handleSizeChange = ({ target }) => {
    dispatch(changeSize(target.value));
  };
  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };
  const getPagedData = () => {
    let filtered = customers;
    if (searchQuery) {
      filtered = customers.filter((customer) =>
        customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
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
  const { data: pagedCustomers, customersCount: totalCount } = getPagedData();
  return (
    <div className="row">
      {customers.length === 0 ? (
        <div className="col">
          <p>There are no customers !</p>
          <UserContext.Consumer>
            {(userContext) =>
              userContext && (
                <Link to="/customers/new" className="btn btn-primary mx-2 mb-2">
                  New customer
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
                  New customer
                </Link>
              )
            }
          </UserContext.Consumer>

          <div className="row m-2">
            <div className="col-6">
              <label htmlFor="search" className="form-label">
                Showing {totalCount} of {customers.length} Customers
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
          <CustomersTable
            customers={pagedCustomers}
            sortColumn={sortColumn}
            onSort={handleSort}
            onDelete={handleDelete}
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

export default Customers;
