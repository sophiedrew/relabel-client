import React, { Component } from "react";
import { getUser } from "../services/profile";
import { Link } from "react-router-dom";
import "../App.css";
import "./ReceiptDetails.css";
export default class ReceiptDetails extends Component {
  state = {
    createdAt: "",
    products: [],
    id: this.props.computedMatch.params.id,
  };

  componentDidMount = () => {
    getUser(this.props.user._id).then((res) => {
      console.log("receipts in DETAILS:", res);
      console.log("RECEIPT ID", this.props.computedMatch.params.id);
      const thisReceipt = res.receipts.filter(
        (el) => el._id === this.props.computedMatch.params.id
      );
      console.log("THIS RECEIPT", thisReceipt);
      this.setState({
        createdAt: thisReceipt[0].createdAt,
        products: thisReceipt[0].products,
      });
    });
  };
  render() {
    const totalPrice = this.state.products.reduce((acc, el) => {
      return acc + el.price;
    }, 0);
    return (
      <div>
        <div className="App-Inner-Header">
          <h2>ORDER {this.state.createdAt.slice(0, 10)}</h2>
        </div>
        <div className="App-content">
          <div className="order-total">
            <h3>PRODUCTS</h3>
          </div>
          <div className="receipt-details">
            {this.state.products.map((el, i) => (
              <div className="single-product" key={el._id}>
                <div className="product-price">
                  <p>Product</p>
                  <Link
                    to={`/product/${el.id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <p>{el.name}</p>
                  </Link>
                </div>
                <div className="product-price">
                  <p>Price</p>
                  <p>€ {(el.price * 0.01).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="order-total">
              <h3>ORDER TOTAL</h3>
            </div>
            <div className="product-price">
              <p>Total: </p>
              <p>€ {(totalPrice * 0.01).toFixed(2)}</p>
            </div>
            <div className="product-price">
              <p>Shipping: </p>
              <p>free</p>
            </div>
            <div className="tax">
              <p>incl. 16% tax</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
