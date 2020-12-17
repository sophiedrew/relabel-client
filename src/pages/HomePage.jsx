import relabelHeader from "../relabelHeader.png";
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>RE.LABEL</h1>
        <img
          src={relabelHeader}
          className="Header-img"
          alt="girl with labeled yellow hoodie"
        />
        <h2>RE.FURBED CLOTHES</h2>
        <h5>
          Buy refurbed clothes,
          <br />
          relieve the environment,
          <br />
          change children lives
        </h5>
      </header>
      <section className="Refurbed-div">
        <div>
          <h3>RE.FURBED CLOTHES</h3>
          <p>
            We collect second hand clothes and clothes from overproduction, and
            upgrade them for you. Find your new favorite or give new life to
            your old favorites by donating them.
          </p>
          <div>
            <Link to="/shop">
              <button className="btn">
                <p>FIND</p>
              </button>
            </Link>
            <Link to="/donate">
              <button className="btn">
                <p>DONATE</p>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
