import React from "react";
import { Link } from "react-router-dom";

const Receipt = (props) => {
  console.log("props each filtered receipt:", props);
  const totalPrice = props.products.reduce((acc, el) => {
    return acc + el.price;
  }, 0);
  return (
    <div>
      <Link
        to={`/receipt/${props._id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <h5>{props.createdAt.slice(0, 10)}</h5>
      </Link>
      <h5>Pieces {props.products.length}</h5>
      <h5>Total € {(totalPrice * 0.01).toFixed(2)}</h5>
    </div>
  );
};

export default Receipt;
