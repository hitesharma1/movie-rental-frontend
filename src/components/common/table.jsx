import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortHandler, sortColumn, data }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortHandler={sortHandler}
        sortColumn={sortColumn}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
