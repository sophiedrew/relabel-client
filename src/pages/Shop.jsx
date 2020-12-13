import React, { Component } from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product/Product";
import { getAllProducts } from "../services/products";

export default class Shop extends Component {
  state = {
    products: [],
    search: "",
    name: "",
    size: "",
    colour: [],
    origin: "",
    category: "",
    suitable: [],
  };

  componentDidMount = () => {
    getAllProducts().then((responseBack) => {
      console.log("responseBack all products:", responseBack);
      this.setState({ products: responseBack });
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const filteredProducts = this.state.products.filter((el) => {
      return (
        el.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
        el.size.toLowerCase().includes(this.state.search.toLowerCase()) ||
        el.colour.toLowerCase().includes(this.state.search.toLowerCase()) ||
        el.origin.toLowerCase().includes(this.state.search.toLowerCase()) ||
        el.category.toLowerCase().includes(this.state.search.toLowerCase()) ||
        el.suitable.toLowerCase().includes(this.state.search.toLowerCase())
      );
    });
    return (
      <div>
        <div>
          <h1>SHOP</h1>
        </div>
        <div>
          <Link to="/new-product">Add new product</Link>
        </div>
        <div>
          {filteredProducts.map((el, i) => (
            <Product key={el._id} {...el} />
          ))}
        </div>
      </div>
    );
  }
}
