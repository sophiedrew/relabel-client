import React, { Component } from "react";
import { getSingleProduct, deleteSingleProduct } from "../services/products";
import { Link } from "react-router-dom";

export default class ProfilePage extends Component {
  /*   state = {
    receipts: [],
  };

  componentDidMount = () => {
    getReceipts(this.props.user._id).then((res) => {
      //console.log("responseBack single product:", res);
      this.setState({
        receipts: res.receipts,
      });
    });
  }; */

  render() {
    const {
      _id,
      email,
      firstName,
      lastName,
      street,
      houseNo,
      postalCode,
      city,
      creditCardNo,
      creditCardExpMonth,
      creditCardExpYear,
      creditCardCVC,
    } = props.user;
    return (
      <div>
        <div>
          <h1>PROFILE</h1>
          <button onClick={props.handleLogout}>Logout</button>
        </div>
        <div>
          <h2>MY Orders</h2>
          {/*populate receipts -> props.receipts.map((el, i) => (
              <ReceiptInProfile
                user={props.user}
                key={el._id}
                {...el}
              />
            ))*/}
        </div>
        <div>
          <h2>MY DETAILS</h2>
          <p>E-MAIL {email}</p>
          <p>
            NAME {firstName} {lastName}
          </p>
          <p>
            ADRESS {street} {houseNo}, {postalCode} {city}
          </p>
          <p>
            CREDIT CARD DETAILS {creditCardNo} {creditCardExpMonth} /
            {creditCardExpYear} {creditCardCVC}
          </p>
        </div>
        <div>
          <Link to={`update/${_id}`}>
            <button>
              <p>UPDATE PROFILE</p>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
