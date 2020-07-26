import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "inStock", label: "Stock" },
    { path: "dailyRent", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          onClick={() => this.props.likeHandler(movie)}
          liked={movie.liked}
        ></Like>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.deleteHandler(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, sortHandler, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        sortHandler={sortHandler}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
