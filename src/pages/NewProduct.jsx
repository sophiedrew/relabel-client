import React, { Component } from "react";
import { addNewProduct } from "../services/products";

export default class NewProduct extends Component {
  state = {
    products: [],
    search: "",
    image: "",
    itemNo: "",
    name: "",
    createdAt: Date.now(),
    quantity: 0,
    price: 0,
    size: "",
    colour: [],
    material: "",
    brand: "",
    origin: "",
    refurbed: "",
    category: "",
    suitable: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const product = {
      image: this.state.image,
      itemNo: this.state.itemNo,
      name: this.state.name,
      createdAt: this.state.createdAt,
      quantity: this.state.quantity,
      price: this.state.price,
      size: this.state.size,
      colour: this.state.colour,
      material: this.state.material,
      brand: this.state.brand,
      origin: this.state.origin,
      refurbed: this.state.refurbed,
      category: this.state.category,
      suitable: this.state.suitable,
    };
    addNewProduct(product).then((res) => {
      console.log("res:", res);
      if (!res.status) {
        // deal with the error
        return;
      }
      this.props.history.push("/shop");
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <>
        <div>
          <h1>Create a new Product</h1>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
              placeholder="Image URL/path"
            />
            <input
              type="text"
              name="itemNo"
              value={this.state.itemNo}
              onChange={this.handleChange}
              placeholder="item number"
            />
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="product name"
            />
            <input
              type="date"
              name="createdAt"
              value={this.state.createdAt}
              onChange={this.handleChange}
            />
            <label htmlFor="quantity">quantity</label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
              placeholder="quantity, available in stock"
            />
            <label htmlFor="price">price</label>
            <input
              id="price"
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
              placeholder="8000 instead of 80.00"
            />
            <input
              type="text"
              name="size"
              value={this.state.size}
              onChange={this.handleChange}
              placeholder="XS,S,M,L or XL"
            />

            <input
              type="text"
              name="colour"
              value={this.state.colour}
              onChange={this.handleChange}
              placeholder="colour(s)"
            />

            <input
              type="text"
              name="material"
              value={this.state.material}
              onChange={this.handleChange}
              placeholder="material"
            />

            <input
              type="text"
              name="brand"
              value={this.state.brand}
              onChange={this.handleChange}
              placeholder="brand"
            />

            <input
              type="text"
              name="origin"
              value={this.state.origin}
              onChange={this.handleChange}
              placeholder="origin: private or industry"
            />

            <input
              type="text"
              name="refurbed"
              value={this.state.refurbed}
              onChange={this.handleChange}
              placeholder="refurbed details"
            />
            <input
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
              placeholder="category: hoodies, jackets, pants, shirts or sweater"
            />

            <input
              type="text"
              name="suitable"
              value={this.state.suitable}
              onChange={this.handleChange}
              placeholder="suitable for"
            />

            <button type="submit">Create new product</button>
          </form>
        </div>
      </>
    );
  }
}
