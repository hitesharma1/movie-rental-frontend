import React, { Component } from "react";
import Input from "./common/input";

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
          <Input
            id="username"
            value={account.username}
            label="Username"
            onChange={this.changeHandler}
          />
          <Input
            id="password"
            value={account.password}
            label="Password"
            onChange={this.changeHandler}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
