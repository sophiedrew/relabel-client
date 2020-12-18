import React from "react";
import { Link } from "react-router-dom";
import "./Receipt.css";

const Receipt = (props) => {
  console.log("props each filtered receipt:", props);
  const totalPrice = props.products.reduce((acc, el) => {
    return acc + el.price;
  }, 0);
  return (
    <div className="profile-receipt">
      <Link
        to={`/receipt/${props._id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <p>{props.createdAt.slice(0, 10)}</p>
      </Link>
      <p>Pieces {props.products.length}</p>
      <p>Total € {(totalPrice * 0.01).toFixed(2)}</p>
    </div>
  );
};

export default Receipt;
