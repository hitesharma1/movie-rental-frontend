import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage, prev, next } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  console.log(currentPage);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li style={{ cursor: "pointer" }} onClick={prev} className="page-item">
          <a className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pages.map((page) => (
          <li
            style={{ cursor: "pointer" }}
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link">{page}</a>
          </li>
        ))}
        <li style={{ cursor: "pointer" }} onClick={next} className="page-item">
          <a className="page-link" aria-label="Previous">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
