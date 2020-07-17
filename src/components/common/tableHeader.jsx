import React, { Component } from "react";

class TableHeader extends Component {
  sorter = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.sortHandler(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr style={{ cursor: "pointer" }}>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.sorter(column.path)}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
