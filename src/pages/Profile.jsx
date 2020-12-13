import React from "react";
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
  return (
    <div>
      <div>
        <h1>PROFILE</h1>
        <button onClick={props.handleLogout}>Logout</button>
      </div>
      <div>
        <h2>MY Orders</h2>
        {/*props.receipts.map((el, i) => (
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
        <Link to={`/update/${_id}`}>
          <button>
            <p>UPDATE PROFILE</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
