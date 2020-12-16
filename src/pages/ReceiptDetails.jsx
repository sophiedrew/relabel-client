import React, { Component } from "react";
import { getUser } from "../services/profile";
import { Link } from "react-router-dom";
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
        <h1>ORDER {this.state.createdAt.slice(0, 10)}</h1>
        <div>
          {this.state.products.map((el, i) => (
            <div key={el._id}>
              <div>
                <p>Product</p>
                <Link
                  to={`/product/${el.id}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <p>{el.name}</p>
                </Link>
              </div>
              <div>
                <p>Price</p>
                <p>€ {(el.price * 0.01).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div>
            <h2>ORDER TOTAL</h2>
          </div>
          <div>
            <p>Total: </p>
            <p>€ {(totalPrice * 0.01).toFixed(2)}</p>
          </div>
          <div>
            <p>Shipping: </p>
            <p>free</p>
          </div>
          <div>incl. 16% tax</div>
        </div>
      </div>
    );
  }
}
