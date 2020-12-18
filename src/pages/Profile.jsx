import React, { Component } from "react";
import { getUser } from "../services/profile";
import { Link } from "react-router-dom";
import Receipt from "../components/Receipt/Receipt";
import "../App.css";
import "./Profile.css";

export default class ProfilePage extends Component {
  state = {
    receipts: [],
  };

  componentDidMount = () => {
    getUser(this.props.user._id).then((res) => {
      console.log("receipts from backend:", res);
      this.setState({
        receipts: res.receipts,
      });
    });
  };

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
    } = this.props.user;
    return (
      <div>
        <div className="App-Inner-Header-Logout">
          <h2>PROFILE</h2>
          <button onClick={this.props.handleLogout}>Logout</button>
        </div>
        <div className="App-content">
          <div className="my-orders">
            {this.state.receipts && (
              <div>
                <h3>MY ORDERS</h3>
                {this.state.receipts.map((el, i) => (
                  <Receipt key={el._id} {...el} />
                ))}
              </div>
            )}
          </div>
          <div className="my-details">
            <h3>MY DETAILS</h3>
            <p>E-Mail: {email}</p>
            <p>
              {firstName} {lastName} <br />
              {street} {houseNo}
              <br />
              {postalCode} {city}
            </p>
            {/* <p>
            CREDIT CARD DETAILS {creditCardNo} {creditCardExpMonth} /
            {creditCardExpYear} {creditCardCVC}
          </p> */}
          </div>
          <div className="update-div-btn">
            <Link to={`update/${_id}`}>
              <button className="btn-update">
                <p>UPDATE PROFILE</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
/* import React from "react";
import { Link } from "react-router-dom";

const Profile = (props) => {
  //console.log("props:", props);
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
  return ( */
//{
/* <div>
      <div>
        <h1>PROFILE</h1>
        <button onClick={props.handleLogout}>Logout</button>
      </div>
      <div>
        <h2>MY Orders</h2> */
//}
//{
/*populate receipts -> props.receipts.map((el, i) => (
          <ReceiptInProfile
            user={props.user}
            key={el._id}
            {...el}
          />
        ))*/
//}
/* </div>
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
    </div> */
/*   );
};

export default Profile; */
