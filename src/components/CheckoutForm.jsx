import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
export default function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    //console.log("Products in CheckoutForm: ", props);
    //console.log("Products in CheckoutForm: ", props.products);
    // Create PaymentIntent as soon as the page loads
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/payment/create-payment-intent`,
        { products: props.products },
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then(({ data }) => {
        setClientSecret(data.clientSecret);
      });
  }, [props]);
  /* window
      .fetch(
        `${process.env.REACT_APP_SERVER_URL}/payment/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products: props.products, user: props.user }),
        }
      )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //localStorage.removeItem("products");
        setClientSecret(data.clientSecret);
      });
  }, [props]); */
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // if successful, make an axios call to create a transaction, for a date, spot, for a user)
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/payment/success`,
        { products: props.products },
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      );
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        localStorage.removeItem("products");
        props.history.push(`/profile/${props.user.id}`);
      }, 1000);
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
    </form>
  );
}
