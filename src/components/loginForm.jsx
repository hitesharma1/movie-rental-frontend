import React, { Component } from "react";

class LoginForm extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            Username<label htmlFor="username"></label>
            <input id="username" type="text" className="form-control" />
          </div>
          <div className="form-group">
            Password<label htmlFor="password"></label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
