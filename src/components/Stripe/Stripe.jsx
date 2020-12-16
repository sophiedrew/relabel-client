import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm";
import "./Stripe.css";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(
  "pk_test_51Hyf8SJKyKSco4KGnZQ2NOO9gkUgBCbDkzobWe05MQWb1ygwBGuJbqYPQMutZZpbIrKXhAryl2yF3HdGD2U8Madb00m2BuAATD"
);
export default function App(props) {
  console.log("Products in Stripe Component: ", props);
  return (
    <div className="App">
      <Elements stripe={promise}>
        <CheckoutForm {...props} />
      </Elements>
    </div>
  );
}
