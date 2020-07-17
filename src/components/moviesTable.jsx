import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "inStock", label: "Stock" },
    { path: "dailyRent", label: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];

  render() {
    const {
      movies,
      deleteHandler,
      likeHandler,
      sortHandler,
      sortColumn,
    } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortHandler={sortHandler}
          sortColumn={sortColumn}
        />
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.inStock}</td>
              <td>{movie.dailyRent}</td>
              <td>
                <Like
                  onClick={() => likeHandler(movie)}
                  liked={movie.liked}
                ></Like>
              </td>
              <td>
                <button
                  onClick={() => deleteHandler(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
