import React from "react";
import "../App.css";

const Donate = () => {
  return (
    <>
      <section className="App-Inner-Header">
        <h2>DONATE</h2>
      </section>
      <section className="App-content">
        <div className="text-boxes">
          <section>
            <div>
              <img
                src="/images/donation.png"
                className="img-donation"
                alt="girl with clothes in a box"
              ></img>
            </div>
            <div>
              <h3>NEW LIFE</h3>
              <p>
                We do not only give a new life to your clothes: After we have
                pimped your clothes, we put them up for sale. With every sale we
                donate 10% to the SOS Kinderdörfer weltweit. The clothes that
                are not for sale are given away to people in need.
              </p>
            </div>
          </section>
          <section>
            <h3>SEND Clothes</h3>
            <p>
              Send us the clothes you no longer need and receive a voucher for
              our shop.
            </p>
            <p>
              RE.LABEL
              <br />
              Frauenstraße 55
              <br />
              80333 München
            </p>
          </section>
          <section>
            <p>
              Want to donate more than 20 Items? <br />
              Awesome. We will pick up the clothes from you. <br />
              Just let us know where and when: <br />
              donation@relabel.de
            </p>
          </section>
        </div>
      </section>
    </>
  );
};

export default Donate;
