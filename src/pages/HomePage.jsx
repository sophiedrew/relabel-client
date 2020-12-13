import relabelHeader from "../relabelHeader.png";
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>RE.LABEL</h2>
        <img
          src={relabelHeader}
          className="App-logo"
          alt="girl with labeled yellow hoodie"
        />
        <h1>RE.FURBED CLOTHES</h1>
        <p>
          Buy refurbed clothes,
          <br />
          relieve the environment,
          <br />
          change children lives
        </p>
      </header>
      <section>
        <div className="App-content">
          <h3>01.</h3>
          <h3>RE.FURBED CLOTHES</h3>
          <p>
            We collect second hand clothes and clothes from overproduction, and
            upgrade them for you. Find your new favorite or give new life to
            your old favorites by donating them.
          </p>
          <div>
            <Link to="/shop">
              <button>
                <p>FIND</p>
              </button>
            </Link>
            <Link to="/donate">
              <button>
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
