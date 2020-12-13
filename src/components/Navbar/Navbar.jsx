import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <nav>
      <div className="div_nav__logo">
        <Link to="/">
          <img
            src="/icons/relabel-logo-nav.png"
            className="nav-logo"
            alt="relabel logo"
          ></img>
        </Link>
      </div>

      <div className="div_nav__icons">
        <Link to="/donate">
          <img
            src="/icons/donate-icon.png"
            className="nav-icon"
            alt="shirt icon"
          ></img>
        </Link>
        <Link to="/shop">
          <img
            src="/icons/search-icon.png"
            className="nav-icon"
            alt="search icon"
          ></img>
        </Link>
        <Link to="/cart">
          <img
            src="/icons/cart-icon.png"
            className="nav-icon"
            alt="cart icon"
          ></img>
        </Link>
        {props.user ? (
          <Link to={`/profile/${props.user._id}`}>
            <img
              src="/icons/profile-icon.png"
              className="nav-icon"
              alt="user icon"
            ></img>
          </Link>
        ) : (
          <Link to="/auth/login">
            <img
              src="/icons/profile-icon.png"
              className="nav-icon"
              alt="user icon"
            ></img>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
