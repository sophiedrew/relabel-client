import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Cart extends Component {
  state = {
    products: [],
  };

  componentDidMount = () => {
    const productsFromLocalStorage = JSON.parse(
      localStorage.getItem("products")
    );
    console.log("From Local Storage", productsFromLocalStorage);
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
      /* this.props.history.push("/cart") */
      window.location.reload()
    );
  };

  render() {
    console.log("PRODUCTS IN STATE", this.state.products);
    return (
      <div>
        <div>
          <h1>CART</h1>
        </div>
        <div>
          <table style={{ width: "300px" }}>
            <tbody>
              {this.state.products.map((el, i) => (
                <>
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
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <button onClick={() => this.handleDelete(el.id)}>
                        <p>Remove</p>
                      </button>
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
              <tr>
                <td style={{ textAlign: "left" }}>Total</td>
                <td style={{ textAlign: "right" }}>
                  €{(this.totalPrice(this.state.products) * 0.01).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <Link to="/shop">
            <button>
              <p>SHOP MORE</p>
            </button>
          </Link>
          <Link to="/checkout">
            <button>
              <p>CHECKOUT</p>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
