import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "../stripe.css";

import { saveOrder } from "../api/user";
import useStore from "../store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = useStore((state) => state.token);
  const clearCart = useStore((state) => state.clearCart);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true); // Set loading to true

    try {
      const payload = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      console.log("payload", payload);

      if (payload.error) {
        setMessage(payload.error.message);
        toast.error(payload.error.message);
      } else if (payload.paymentIntent.status === "succeeded") {
        console.log("create order", payload);
        // Create order if payment is successful
        clearCart();
        await saveOrder(token, payload);
        toast.success("Payment successfully!");
        navigate("/user/history");
      } else {
        console.log("something wrong");
        toast.warning("Payment failed");
      }
    } catch (error) {
      console.error("🚀 ~ handleSubmit ~ unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Always reset loading to false
    }
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <div className="flex items-center justify-center mt-8 ">
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="space-y-8 stripe-form bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Payment
        </h1>
        <h1 className="text-sm text-gray-500 ">
          4242 4242 4242 4242 -- 12 / 34 -- 567
        </h1>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="stripe-button w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
