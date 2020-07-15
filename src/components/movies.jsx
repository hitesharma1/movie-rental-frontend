import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Paginate from "./pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: "All Genres",
  };
  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
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

  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
    } = this.state;
    const count = allMovies.length;

    if (count === 0) return <p>No movies in Database :(</p>;

    const filtered =
      selectedGenre === "All Genres"
        ? allMovies
        : allMovies.filter((m) => m.genre.name === selectedGenre);

    const movies = paginate(filtered, currentPage, pageSize);

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
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      onClick={() => this.likeHandler(movie)}
                      liked={movie.liked}
                    ></Like>
                  </td>
                  <td>
                    <button
                      onClick={() => this.deleteHandler(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
