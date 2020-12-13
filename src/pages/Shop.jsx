import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Shop extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>SHOP</h1>
        </div>
        <div>
          <Link to="/new-product">Add new product</Link>
        </div>
      </div>
    );
  }
}
