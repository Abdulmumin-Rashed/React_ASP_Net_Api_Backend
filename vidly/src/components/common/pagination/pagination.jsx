import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount <= 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <div aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item ">
          <a
            href="#"
            className={`page-link ${currentPage === 1 ? "disabled" : null}`}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {pages.map((p) => (
          <li key={p} className="page-item">
            <a
              className={`page-link ${currentPage === p ? "active" : null}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className={`page-link ${
              currentPage === pageCount ? "disabled" : null
            }`}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
