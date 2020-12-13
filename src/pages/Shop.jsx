import React, { Component } from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product/Product";
import { getAllProducts } from "../services/products";

export default class Shop extends Component {
  state = {
    products: [],
    search: "",
    sort: "",
    name: "",
    size: "",
    colour: [],
    origin: "",
    category: "",
    suitable: [],
    createdAt: Date.now(),
  };

  componentDidMount = () => {
    getAllProducts().then((responseBack) => {
      console.log("responseBack all products:", responseBack);
      this.setState({ products: responseBack });
    });
  };

  handleChange = (event) => {
    console.log("HANDLE CHANGE ", event.target.name, ": ", event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const filteredProducts = this.state.products.filter((el) => {
      return (
        el.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
        el.size.toLowerCase().includes(this.state.search.toLowerCase()) ||
        el.colour.includes(this.state.search.toLowerCase()) ||
        el.origin.toLowerCase().includes(this.state.search.toLowerCase()) ||
        el.category.toLowerCase().includes(this.state.search.toLowerCase()) ||
        el.suitable.includes(this.state.search.toLowerCase())
      );
    });

    const filteredAndSortedProducts = filteredProducts.sort((a, b) => {
      if (this.state.sort === "Price ↑") {
        return a.price > b.price ? 1 : -1;
      }
      if (this.state.sort === "Price ↓") {
        return a.price < b.price ? 1 : -1;
      } else {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
    });

    return (
      <div>
        <div>
          <h1>SHOP</h1>
        </div>
        <div>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            style={{ width: "50%" }}
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <select name="sort" onChange={this.handleChange}>
            <option value="Latest">Latest</option>
            <option value="Price ↑">Price ↑</option>
            <option value="Price ↓">Price ↓</option>
          </select>
        </div>
        <div>
          <Link to="/new-product">Add new product</Link>
        </div>
        <div>
          {filteredAndSortedProducts.map((el, i) => (
            <Product key={el._id} {...el} />
          ))}
        </div>
      </div>
    );
  }
}
