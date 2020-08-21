import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", inStock: "", dailyRent: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Title'),
    inStock: Joi.number().min(0).max(99).required().label('In Stock'),
    dailyRent: Joi.number().min(0).max(99).required().label('Daily Rent'),
  }

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      inStock: movie.inStock,
      dailyRent: movie.dailyRent
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  }

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('inStock', 'In Stock', 'number')}
          {this.renderInput('dailyRent', 'Daily Rent')}
          {this.renderButton('Save')}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
