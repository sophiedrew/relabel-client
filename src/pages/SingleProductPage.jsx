import React, { Component } from "react";
import { getSingleProduct, deleteSingleProduct } from "../services/products";
import { Link } from "react-router-dom";
import "../App.css";
import "./SingleProduct.css";

export default class SingleProductPage extends Component {
  state = {
    name: "",
    itemNo: "",
    price: "",
    size: "",
    colour: "",
    origin: "",
    brand: "",
    material: "",
    suitable: "",
    refurbed: "",
    category: "",
    image: "",
    //numberOfProducts: 1,
    quantity: 0,
    id: "",
  };

  componentDidMount = () => {
    getSingleProduct(this.props.match.params.id).then((res) => {
      //console.log("responseBack single product:", res);
      this.setState({
        image: res.image,
        itemNo: res.itemNo,
        name: res.name,
        price: res.price,
        size: res.size,
        colour: res.colour,
        material: res.material,
        brand: res.brand,
        origin: res.origin,
        refurbed: res.refurbed,
        category: res.category,
        suitable: res.suitable,
        quantity: res.quantity,
        id: res._id,
      });
    });
  };

  /*   handleChangeIncrement() {
    this.setState({
      numberOfProducts: this.state.numberOfProducts - 1,
    });
  }

  handleChangeDecrement() {
    this.setState({
      numberOfProducts: this.state.numberOfProducts + 1,
    });
  } */

  saveDataToLocalStorage() {
    const productForCart = {
      image: this.state.image,
      itemNo: this.state.itemNo,
      name: this.state.name,
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
      id: this.state.id,
      //numberOfProducts: this.state.numberOfProducts,
    };
    //console.log(productForCart);
    const allCurrentProducts = JSON.parse(localStorage.getItem("products"));
    if (!allCurrentProducts) {
      return localStorage.setItem(
        "products",
        JSON.stringify([productForCart]),
        this.props.history.push("/cart")
      );
    }
    return localStorage.setItem(
      "products",
      JSON.stringify([...allCurrentProducts, productForCart]),
      this.props.history.push("/cart")
    );
  }

  handleDelete = (id) => {
    deleteSingleProduct(id).then((res) => {
      if (!res.status) {
        //  deal with the error
        return;
      }
      console.log("deleted Product:", res);
      this.props.history.push("/shop");
      //  was successful
    });
  };

  render() {
    if (!this.state) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div className="App-Inner-Header">
          <h2>PRODUCT</h2>
        </div>
        <div className="App-content">
          <div className="product-details">
            <div>
              <img
                src={this.state.image}
                alt="product"
                style={{ width: "300px", height: "400px" }}
              ></img>
            </div>
            <div className="product-name-no">
              <h3>{this.state.name}</h3>
              <p>{this.state.itemNo}</p>
            </div>
            <div className="product-main-btn">
              <div>
                <p>€ {(this.state.price * 0.01).toFixed(2)}</p>
                <p>{this.state.size}</p>
                <p>Colour(s): {this.state.colour}</p>
              </div>
              <div className="btn-add-to-cart-div">
                {/* <button onClick={(e) => this.handleChangeIncrement(e)}>-</button>
            <button onClick={(e) => this.handleChangeDecrement(e)}>+</button>
            <h1>{this.state.numberOfProducts}</h1> */}
                <button
                  className="btn"
                  onClick={() => this.saveDataToLocalStorage()}
                >
                  <p>ADD TO CART</p>
                </button>
              </div>
            </div>
            <div className="Stroke">
              <h5>Product Information</h5>
            </div>
            <div>
              <p>Origin: {this.state.origin}</p>
              <p>Brand: {this.state.brand}</p>
              <p>Material: {this.state.material}</p>
              <p>Suitable for: {this.state.suitable}</p>
            </div>
            <div>
              {this.props.user && this.props.user.userType === "admin" && (
                <Link to={`edit/${this.state.id}`}>
                  <button className="btn-admin">
                    <p>EDIT</p>
                  </button>
                </Link>
              )}
            </div>
            <div>
              {this.props.user && this.props.user.userType === "admin" && (
                <button
                  className="btn-admin"
                  onClick={() => this.handleDelete(this.state.id)}
                >
                  <p>DELETE</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
