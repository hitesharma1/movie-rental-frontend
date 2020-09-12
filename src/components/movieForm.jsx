import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

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

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
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

  doSubmit = async () => {
    let { title, genreId, inStock, dailyRent } = this.state.data;
    await saveMovie({
      title,
      genre: {
        _id: genreId
      },
      inStock,
      dailyRent,
    });
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
