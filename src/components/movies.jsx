import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Paginate from "./pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  deleteHandler = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });
  };

  likeHandler = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  pageHandler = (page) => {
    this.setState({ currentPage: page });
  };

  prevPage = () => {
    if (this.state.currentPage === 1) return null;
    this.setState({ currentPage: this.state.currentPage - 1 });
  };

  nextPage = () => {
    const { movies, currentPage, pageSize } = this.state;
    const n = Math.ceil(movies.length / pageSize);
    if (currentPage === n) return null;
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  genreHandler = (genre) => {
    this.setState({ selectedGenre: genre.name, currentPage: 1 });
  };

  sortHandler = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies,
    } = this.state;
    const count = allMovies.length;

    if (count === 0) return <p>No movies in Database :(</p>;

    const filtered =
      selectedGenre === "All Genres"
        ? allMovies
        : allMovies.filter((m) => m.genre.name === selectedGenre);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selctedItem={this.state.selctedGenre}
            onItemSelect={this.genreHandler}
          />
        </div>

        <div className="col">
          <p>Showing {filtered.length} movies from Database</p>
          <MoviesTable
            movies={movies}
            likeHandler={this.likeHandler}
            deleteHandler={this.deleteHandler}
            sortHandler={this.sortHandler}
            sortColumn={sortColumn}
          />

          <Paginate
            onPageChange={this.pageHandler}
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            prev={this.prevPage}
            next={this.nextPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
