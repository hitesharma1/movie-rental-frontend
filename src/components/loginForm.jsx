import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  changeHandler = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.id] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            Username<label htmlFor="username"></label>
            <input
              value={account.username}
              onChange={this.changeHandler}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            Password<label htmlFor="password"></label>
            <input
              value={account.password}
              onChange={this.changeHandler}
              id="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
