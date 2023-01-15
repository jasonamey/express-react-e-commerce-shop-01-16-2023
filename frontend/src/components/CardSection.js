import React from "react";
import StripeInput from "./StripeInput";
import { TextField, Grid, Typography, InputLabel, Button } from "@mui/material";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

const CARD_ELEMENT_OPTIONS = {
  // For more styling details, see https://stripe.com/docs/js/appendix/style
  style: {
    base: {
      fontSize: 16,
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

function CardSection({ isSubmitting, stripe, error, handleChange }) {
  const total = useSelector((state) => state.cart.total);

  return (
    <div className="cardSection">
      <InputLabel>
        Card number
        <CardNumberElement
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
      </InputLabel>
      <InputLabel>
        Expiration date
        <CardExpiryElement
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
      </InputLabel>
      <InputLabel>
        CVC
        <CardCvcElement
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
      </InputLabel>

      <Button type="submit" variant="contained">
        {isSubmitting ? "Submitting..." : `Pay S$ ${total}`}
      </Button>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default CardSection;
