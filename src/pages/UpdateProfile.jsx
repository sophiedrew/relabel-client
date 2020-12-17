import React, { Component } from "react";
import { updateUser } from "../services/profile";

export default class UpdateProfile extends Component {
  state = {
    user: this.props.user,
    error: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: { [name]: value },
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    updateUser(this.props.user._id, this.state.user).then((res) => {
      // successful signup
      console.log(res);
      this.props.history.push("/profile/:id");
      if (!res.status) {
        return;
      }
    });
  };

  render() {
    if (!this.state.user) {
      return <div>Loading ...</div>;
    }
    return (
      <div>
        <h1>EDIT PROFILE</h1>
        {
          <form onSubmit={this.handleFormSubmission}>
            <label htmlFor="input-email">E-Mail</label>
            <input
              id="input-email"
              type="text"
              name="email"
              value={this.state.user.email}
              onChange={this.handleInputChange}
              required
            />

            <label htmlFor="input-firstName">First Name</label>
            <input
              id="input-firstName"
              type="firstName"
              name="firstName"
              value={this.state.user.firstName}
              onChange={this.handleInputChange}
              required
            />

            <label htmlFor="input-lastName">Last Name</label>
            <input
              id="input-lastName"
              type="lastName"
              name="lastName"
              value={this.state.user.lastName}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="input-street">Street</label>
            <input
              id="input-street"
              type="street"
              name="street"
              value={this.state.user.street}
              onChange={this.handleInputChange}
              required
            />

            <label htmlFor="input-houseNo">House Number</label>
            <input
              id="input-houseNo"
              type="houseNo"
              name="houseNo"
              value={this.state.user.houseNo}
              onChange={this.handleInputChange}
              required
            />

            <label htmlFor="input-postalCode">Postal Code</label>
            <input
              id="input-postalCode"
              type="postalCode"
              name="postalCode"
              value={this.state.user.postalCode}
              onChange={this.handleInputChange}
              required
            />

            <label htmlFor="input-city">City</label>
            <input
              id="input-city"
              type="city"
              name="city"
              value={this.state.user.city}
              onChange={this.handleInputChange}
              required
            />

            {/* <label htmlFor="input-creditCardNo">Credit Card Number</label>
            <input
              id="input-creditCardNo"
              type="creditCardNo"
              name="creditCardNo"
              value={this.state.user.creditCardNo}
              onChange={this.handleInputChange}
            />

            <label htmlFor="input-creditCardMonth">Expiry Month</label>
            <input
              id="input-creditCardMonth"
              type="creditCardMonth"
              name="creditCardMonth"
              value={this.state.user.creditCardMonth}
              onChange={this.handleInputChange}
            />

            <label htmlFor="input-creditCardYear">Expiry Year</label>
            <input
              id="input-creditCardYear"
              type="creditCardYear"
              name="creditCardYear"
              value={this.state.user.creditCardYear}
              onChange={this.handleInputChange}
            />

            <label htmlFor="input-creditCardCVC">CVC</label>
            <input
              id="input-creditCardCVC"
              type="creditCardCVC"
              name="creditCardCVC"
              value={this.state.user.creditCardCVC}
              onChange={this.handleInputChange}
            /> */}

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
        }
      </div>
    );
  }
}
