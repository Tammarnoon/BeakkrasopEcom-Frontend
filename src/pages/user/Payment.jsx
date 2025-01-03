import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useStore from "../../store/store";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Qai1eCuJCM6VSEhzfdd8FsLS5tdwODxJcU0mNrAAcI9CUsOqVgRj2OG7JMor8OIxOnOqRXX9dK9je1WG6GoyTLA00r1PolD5o"
);

const Payment = () => {
  const token = useStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    payment(token)
      .then((res) => {
        console.log(res);
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
