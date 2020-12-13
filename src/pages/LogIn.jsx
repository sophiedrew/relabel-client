import React, { Component } from "react";
import { login } from "../services/auth";
import { Link } from "react-router-dom";
import "./Signup";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        // handle not great request
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      this.props.authenticate(res.data.user);
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div>
        <h1>LOGIN</h1>
        <form onSubmit={this.handleFormSubmission} className="signup__form">
          <label htmlFor="input-email">E-Mail</label>
          <input
            id="input-email"
            type="text"
            name="email"
            placeholder="email@email.com"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            minLength="8"
          />

          {this.state.error && (
            <div className="error-block">
              <p>There was an error submiting the form:</p>
              <p>{this.state.error.message}</p>
            </div>
          )}

          <button className="button__submit" type="submit">
            Submit
          </button>
        </form>
        <div>
          <p>or</p>
          <Link to="/auth/signup" className="authLink">
            Signup now
          </Link>
        </div>
      </div>
    );
  }
}
