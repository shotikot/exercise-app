import React from "react";
import "./Pagination.css";

interface IPaginationProps {
  totalPages?: number;
  pageNumber: number;
  changePage: (pageNumber: number) => void;
  changePageSize: (pageSize: number) => void;
  pageSize: number;
  prevPageNumber: { current?: number };
}

export const Pagination: React.FC<IPaginationProps> = ({
  totalPages,
  pageNumber,
  changePage,
  changePageSize,
  pageSize,
  prevPageNumber,
}) => {
  if (!totalPages) {
    return null;
  }

  const increment = () => {
    prevPageNumber.current = pageNumber;
    changePage(pageNumber + 1);
  };

  const decrement = () => {
    prevPageNumber.current = pageNumber;
    changePage(pageNumber - 1);
  };

  return (
    <div className="pagination">
      <button disabled={pageNumber === 1} onClick={decrement}>
        {"<"}
      </button>
      <span>
        {pageNumber}/{totalPages}
      </span>
      <button disabled={pageNumber === totalPages} onClick={increment}>
        {">"}
      </button>
      <select
        value={pageSize}
        onChange={(ev) => changePageSize(Number(ev.target.value))}
      >
        <option value="25">25/page</option>
        <option value="50">50/page</option>
      </select>
    </div>
  );
};
