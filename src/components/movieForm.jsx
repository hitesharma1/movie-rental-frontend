import React from "react";

const MovieForm = ({ match, history }) => {
  return (
    <React.Fragment>
      <h1>Movie Form </h1>
      <h2>ID: {match.params.id}</h2>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        {" "}
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieForm;
