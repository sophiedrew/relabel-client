import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addNewReceipt } from "../services/checkout";

export default class Checkout extends Component {
  state = {
    products: [],
    createdAt: Date.now(),
    user: null,
  };

  componentDidMount = () => {
    const productsFromLocalStorage = JSON.parse(
      localStorage.getItem("products")
    );
    const user = this.props.user;
    console.log("From Local Storage", productsFromLocalStorage);
    this.setState({
      products: productsFromLocalStorage,
      user: user._id,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const productsAndDate = {
      products: this.state.products,
      createdAt: this.state.createdAt,
      user: this.state.user,
    };
    addNewReceipt(productsAndDate).then((res) => {
      console.log("res:", res);
      if (!res.status) {
        // deal with the error
        return;
      }
      this.props.history.push("/shop");
    });
  };

  totalPrice = (products) => {
    return products.reduce((a, c) => a + c.numberOfProducts * c.price, 0.0);
  };
  render() {
    const {
      _id,
      email,
      firstName,
      lastName,
      street,
      houseNo,
      postalCode,
      city,
    } = this.props.user;
    return (
      <div>
        <div>
          <h1>CHECKOUT</h1>
        </div>
        <div>
          <div style={{ textAlign: "left" }}>
            <h2>SHIPPING ADDRESS</h2>
            <p>E-Mail: {email}</p>
            <p>
              {firstName} {lastName}
            </p>
            <p>
              {street} {houseNo}, {postalCode} {city}
            </p>
            <Link to={`/profile/${_id}`}>
              <button>
                <p>UPDATE PROFILE</p>
              </button>
            </Link>
          </div>
          <div>
            <h2>ORDER OVERVIEW</h2>
          </div>
          <div></div>
          <div>
            <table style={{ width: "300px" }}>
              <tbody>
                {this.state.products.map((el) => (
                  <>
                    <tr>
                      <td style={{ textAlign: "left" }}>{el.name}</td>
                      <td style={{ textAlign: "center" }}>
                        x{el.numberOfProducts}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        €{(el.price * 0.01 * el.numberOfProducts).toFixed(2)}
                      </td>
                    </tr>
                  </>
                ))}
                <tr>
                  <td style={{ textAlign: "left" }}>Total</td>
                  <td style={{ textAlign: "right" }}>
                    €{(this.totalPrice(this.state.products) * 0.01).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="total">Total</label>
              <input
                readOnly
                type="number"
                name="total"
                value={(this.totalPrice(this.state.products) * 0.01).toFixed(2)}
                onChange={this.handleChange}
                placeholder="Image URL/path"
              />
              <button type="submit">CHECKOUT</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
