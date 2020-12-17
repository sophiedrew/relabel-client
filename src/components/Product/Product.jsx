import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
  //console.log("props each filtered Products:", props);
  return (
    <div className="Single-Product">
      <Link
        to={`/product/${props._id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <img
          src={props.image}
          alt="product"
          style={{
            width: "150px",
            height: "200px",
          }}
        />
        <h3>{props.name}</h3>
        <p>€{(props.price * 0.01).toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default Product;
