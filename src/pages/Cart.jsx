import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Cart.css";

export default class Cart extends Component {
  state = {
    products: [],
  };

  componentDidMount = () => {
    const productsFromLocalStorage = JSON.parse(
      localStorage.getItem("products")
    );
    //console.log("From Local Storage", productsFromLocalStorage);
    this.setState({ products: productsFromLocalStorage });
  };

  totalPrice = (products) => {
    return products.reduce(
      (a, c) => a + /* c.numberOfProducts * */ c.price,
      0.0
    );
  };

  handleDelete = (id) => {
    const allCurrentProducts = JSON.parse(localStorage.getItem("products"));
    const updatedProducts = allCurrentProducts.filter((el) => el.id !== id);
    return localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts),
      this.props.history.push("/shop")
      //window.location.reload()
    );
  };

  render() {
    //console.log("PRODUCTS IN STATE", this.state.products);
    if (!this.state.products) {
      return (
        <div>
          <div>
            <p>Your Shopping Cart is empty.</p>
          </div>
          <Link to="/shop">
            <button className="btn">
              <p>GO SHOPPING</p>
            </button>
          </Link>
        </div>
      );
    }
    return (
      <div>
        <div className="App-Inner-Header">
          <h2>CART</h2>
        </div>
        <div className="App-content">
          <table style={{ width: "300px" }}>
            <tbody>
              {this.state.products.map((el, i) => (
                <>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <button
                        className="btn-remove"
                        onClick={() => this.handleDelete(el.id)}
                      >
                        <p>X</p>
                      </button>
                    </td>
                  </tr>
                  <tr key={i}>
                    <td style={{ textAlign: "left" }}>Product</td>
                    <td style={{ textAlign: "right" }}>{el.name}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>Price</td>
                    <td style={{ textAlign: "right" }}>
                      € {(el.price * 0.01).toFixed(2)}
                    </td>
                  </tr>

                  {/* <tr>
                    <td style={{ textAlign: "left" }}>Quantity</td>
                    <td style={{ textAlign: "right" }}>
                      {el.numberOfProducts}
                    </td>
                  </tr> */}
                  {/* <tr>
                    <td style={{ textAlign: "left" }}>Subtotal</td>
                    <td style={{ textAlign: "right" }}>
                      €{(el.price * 0.01 * el.numberOfProducts).toFixed(2)}
                    </td>
                  </tr> */}
                </>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <h5>Total</h5>
            <h5>
              € {(this.totalPrice(this.state.products) * 0.01).toFixed(2)}
            </h5>
          </div>

          <div>
            <Link to="/shop">
              <button className="btn">
                <p>SHOP MORE</p>
              </button>
            </Link>
            <Link to="/checkout">
              <button className="btn">
                <p>CHECKOUT</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
