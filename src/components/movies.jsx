import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBar from "./searchBar";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    searchQuery: "",
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
    this.setState({
      selectedGenre: genre.name,
      searchQuery: "",
      currentPage: 1,
    });
  };

  sortHandler = (sortColumn) => {
    this.setState({ sortColumn });
  };

  searchHandler = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  filteredData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre === "All Genres") {
      filtered = allMovies;
    } else {
      allMovies.filter((m) => m.genre.name === selectedGenre);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, movies } = this.filteredData();

    const { length } = this.state.movies;
    if (length === 0) return <p>No movies in Database :(</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selctedItem={this.state.selctedGenre}
            onItemSelect={this.genreHandler}
          />
          <Link
            to={"/movies/new"}
            className="btn btn-primary"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            Add Movie
          </Link>
        </div>

        <div className="col">
          <p>Listing {totalCount} movies</p>
          <SearchBar value={searchQuery} onChange={this.searchHandler} />
          <MoviesTable
            movies={movies}
            likeHandler={this.likeHandler}
            deleteHandler={this.deleteHandler}
            sortHandler={this.sortHandler}
            sortColumn={sortColumn}
          />
          <br />
          <Pagination
            onPageChange={this.pageHandler}
            itemsCount={totalCount}
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
