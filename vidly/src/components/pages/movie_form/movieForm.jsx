import React from "react";
import Joi from "joi-browser";
import { Form } from "../../common";
import { getMovie, saveMovie } from "../../../services/movieService";
import { getGenres } from "../../../services/genreService";
class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400)
        this.props.history.replace("/not-found");
    }
  }
  componentDidMount() {
    this.populateGenres();
    this.populateMovie();
  }
  mapToViewModel = (movie) => {
    return {
      id: movie.id,
      title: movie.title,
      genreId: movie.genreId,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };
  schema = {
    id: Joi.number().integer(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.number().integer().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .integer()
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .required()
      .label("Rate"),
  };
  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  render() {
    const { genres } = this.state;

    return (
      <div className="container">
        <h1>Movie Form</h1>

        <form onSubmit={this.handleSubmit} className="form">
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres)}

          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
