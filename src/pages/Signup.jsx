import React, { Component } from "react";
import { signup } from "../services/auth";
import "./auth.css";

export default class Signup extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    street: "",
    houseNo: "",
    postalCode: "",
    city: "",
    creditCardNo: "",
    creditCardExpMonth: "",
    creditCardExpYear: "",
    creditCardCVC: "",

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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      street: this.state.street,
      houseNo: this.state.houseNo,
      postalCode: this.state.postalCode,
      city: this.state.city,
      creditCardNo: this.state.creditCardNo,
      creditCardExpMonth: this.state.creditCardExpMont,
      creditCardExpYear: this.state.creditCardExpYear,
      creditCardCVC: this.state.creditCardCVC,
    };
    signup(credentials).then((res) => {
      // successful signup
      console.log(res);
      if (!res.status) {
        return this.setState({ error: res.errorMessage });
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      this.props.authenticate(res.data.user);
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div>
        <h1>SIGNUP</h1>
        {this.state.error && <h4>{this.state.error}</h4>}
        <form onSubmit={this.handleFormSubmission} className="auth__form">
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
            placeholder="Your Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            minLength="8"
          />

          <label htmlFor="input-firstName">First Name</label>
          <input
            id="input-firstName"
            type="firstName"
            name="firstName"
            placeholder="Joe"
            value={this.state.firstName}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-lastName">Last Name</label>
          <input
            id="input-lastName"
            type="lastName"
            name="lastName"
            placeholder="Doe"
            value={this.state.lastName}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="input-street">Street</label>
          <input
            id="input-street"
            type="street"
            name="street"
            placeholder="Main Street"
            value={this.state.street}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-houseNo">House Number</label>
          <input
            id="input-houseNo"
            type="houseNo"
            name="houseNo"
            placeholder="123"
            value={this.state.houseNo}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-postalCode">Postal Code</label>
          <input
            id="input-postalCode"
            type="postalCode"
            name="postalCode"
            placeholder="123456"
            value={this.state.postalCode}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-city">City</label>
          <input
            id="input-city"
            type="city"
            name="city"
            placeholder="Neverland"
            value={this.state.city}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-creditCardNo">Credit Card Number</label>
          <input
            id="input-creditCardNo"
            type="creditCardNo"
            name="creditCardNo"
            placeholder="XXXX XXXX XXXX XXXX"
            value={this.state.creditCardNo}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-creditCardMonth">Expiry Month</label>
          <input
            id="input-creditCardMonth"
            type="creditCardMonth"
            name="creditCardMonth"
            placeholder="12"
            value={this.state.creditCardMonth}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-creditCardYear">Expiry Year</label>
          <input
            id="input-creditCardYear"
            type="creditCardYear"
            name="creditCardYear"
            placeholder="22"
            value={this.state.creditCardYear}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-creditCardCVC">CVC</label>
          <input
            id="input-creditCardCVC"
            type="creditCardCVC"
            name="creditCardCVC"
            placeholder="123"
            value={this.state.creditCardCVC}
            onChange={this.handleInputChange}
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
      </div>
    );
  }
}
