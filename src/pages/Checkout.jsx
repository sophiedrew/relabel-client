import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { addNewReceipt } from "../services/checkout";
import Stripe from "../components/Stripe/Stripe";
import "../App.css";
import "./Checkout.css";

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

  /* handleSubmit = (event) => {
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
  }; */

  totalPrice = (products) => {
    return products.reduce((a, c) => a + c.price, 0.0);
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
        <div className="App-Inner-Header">
          <h2>CHECKOUT</h2>
        </div>
        <div className="App-content">
          <div className="shipping-adress" style={{ textAlign: "left" }}>
            <h3>SHIPPING ADDRESS</h3>
            <p>E-Mail: {email}</p>
            <p>
              {firstName} {lastName}
              <br /> {street} {houseNo} <br /> {postalCode} {city}
            </p>
            <Link to={`/profile/${_id}`}>
              <button className="btn-update">
                <p>UPDATE</p>
              </button>
            </Link>
          </div>
          <div className="order-overview">
            <h3>ORDER OVERVIEW</h3>
          </div>
          <div></div>
          <div>
            <table style={{ width: "300px" }}>
              <tbody>
                {this.state.products.map((el) => (
                  <>
                    <tr>
                      <td style={{ textAlign: "left" }}>{el.name}</td>
                      {/* <td style={{ textAlign: "center" }}>
                        x{el.numberOfProducts}
                      </td> */}
                      <td style={{ textAlign: "right" }}>
                        € {(el.price * 0.01).toFixed(2)}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div className="shipping">
              <p>Shipping</p>
              <p>free</p>
            </div>

            <div className="shipping">
              <p>Donation by us</p>
              <p>
                already included €{" "}
                {(this.totalPrice(this.state.products) * 0.01 * 0.1).toFixed(2)}
              </p>
            </div>

            <div className="order-total">
              <h5>Total</h5>
              <h5>
                € {(this.totalPrice(this.state.products) * 0.01).toFixed(2)}
              </h5>
            </div>
            {/* <form onSubmit={this.handleSubmit}>
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
            </form> */}
          </div>
          <div>
            <Stripe
              products={this.state.products}
              user={this.props.user}
              history={this.props.history}
            />
          </div>
        </div>
      </div>
    );
  }
}
