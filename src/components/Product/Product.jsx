import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  console.log("props each filtered Products:", props);
  return (
    <div>
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
        <h5>{props.name}</h5>
        <div>€{(props.price * 0.01).toFixed(2)}</div>
      </Link>
    </div>
  );
};

export default Product;
