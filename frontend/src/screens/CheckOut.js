import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import CustomSnackbar from "../components/CustomSnackbar";
import { clearCart } from '../actions/cartActions'
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { totalPriceCalculation } from "../utils";
import {
  Button,
  Grid,
  Box,
  Typography,
  TextField,
  Container,
  InputLabel,
} from "@mui/material";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Enter a Email")
    .email("Email is invalid")
    .required("Email is required"),
  streetAddressOne: yup
    .string("Enter your Street Address")
    .min(4, "Street Address should be at least 4 characters length")
    .required("Street Address is required"),
  streetAddressTwo: yup
    .string("Enter second line of your Street Address")
    .min(4, "Street Address should be at least 4 characters length"),
  zipCode: yup
    .string("Enter your Zip Code")
    .required("Zip Code is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
  state: yup
    .string("Enter your State")
    .required("State is required")
    .matches(/^[A-Z]+$/, "Must be only letters")
    .min(2, "Must be exactly 2 letters")
    .max(2, "Must be exactly 2 letters"),
});

const initialValues = {
  email: "",
  streetAddressOne: "",
  streetAddressTwo: "",
  zipCode: "",
};

const CARD_OPTIONS = {
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

const defaultSnackbarState = {
  isSnackbarViewable: null,
  message: "",
  snackbarType: null,
};

const CheckOut = () => {
  const [snackbarState, setSnackbarState] = useState(defaultSnackbarState);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { id: userId } = useSelector((state) => state.userLogin);
  const state = useSelector(state => state)

  const cart = useSelector((state) => state.cart);

  const resetSnackbar = (nav) => {
    setTimeout(() => {
      setSnackbarState(defaultSnackbarState);
    }, 2000);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          `${ process.env.REACT_APP_BASE_URL }/orders`,
          {
            email,
            amount: totalPriceCalculation(cart.cartItems) / 100,
            id,
          }
        );

        if (response.data.success) {
          setSnackbarState({
            isSnackbarViewable: true,
            message: 'Payment Successful!',
            snackbarType: "success",
          });
          resetSnackbar()
          dispatch(clearCart())
          try {
            await axios.post(
              `${ process.env.REACT_APP_BASE_URL }/payment`,
              {
                email: formik.values.email,
                addressOne: formik.values.streetAddressOne,
                addressTwo: formik.values.streetAddressTwo,
                state: formik.values.state,
                zipCode: formik.values.zipCode,
                tax: 10.00,
                shipping: 10.00,
                subtotal: totalPriceCalculation(cart.cartItems) / 100,
                id,
              }, {
                headers: {

                }
            })
            setTimeout(() => {
              navigate(`/orders/${ userId }`)
            }, 2000)
          } catch (error) {

          }
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      setSnackbarState({
        isSnackbarViewable: true,
        message: error.message,
        snackbarType: "error",
      });
      resetSnackbar()
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
  });
  return (
    <Container maxWidth="sm">
      <Grid container spacing={ 3 } padding={ 3 }>
        <Grid item xs={ 12 }>
          <Typography variant="h1">Check Out</Typography>
        </Grid>
        <Grid item xs={ 12 }>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="text"
            value={ formik.values.email }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            error={ formik.touched.email && Boolean(formik.errors.email) }
            helperText={ formik.touched.email && formik.errors.email }
          />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField
            fullWidth
            id="streetAddressOne"
            name="streetAddressOne"
            label="Street Address One"
            type="text"
            value={ formik.values.streetAddressOne }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            error={
              formik.touched.streetAddressOne &&
              Boolean(formik.errors.streetAddressOne)
            }
            helperText={
              formik.touched.streetAddressOne && formik.errors.streetAddressOne
            }
          />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField
            fullWidth
            id="streetAddressTwo"
            name="streetAddressTwo"
            label="Street Address Two (optional)"
            type="text"
            value={ formik.values.streetAddressTwo }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            error={
              formik.touched.streetAddressTwo &&
              Boolean(formik.errors.streetAddressTwo)
            }
            helperText={
              formik.touched.streetAddressTwo && formik.errors.streetAddressTwo
            }
          />
        </Grid>
        <Grid item xs={ 6 }>
          <TextField
            fullWidth
            id="state"
            name="state"
            label="State"
            type="text"
            value={ formik.values.state }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            error={ formik.touched.state && Boolean(formik.errors.state) }
            helperText={ formik.touched.state && formik.errors.state }
          />
        </Grid>
        <Grid item xs={ 6 }>
          <TextField
            fullWidth
            id="zipCode"
            name="zipCode"
            label="Zip Code"
            type="text"
            value={ formik.values.zipCode }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            error={ formik.touched.zipCode && Boolean(formik.errors.zipCode) }
            helperText={ formik.touched.zipCode && formik.errors.zipCode }
          />
        </Grid>
        <Grid item xs={ 12 } sx={ { margin: "6px 0" } }>
          <InputLabel>
            Payment
            <Box sx={ { borderTop: " 1px dotted black ", padding: "10px" } }>
              <CardElement options={ CARD_OPTIONS } />
            </Box>
          </InputLabel>
        </Grid>
        <Grid item xs={ 12 } sx={ { textAlign: "right" } }>
          <Button onClick={ handleSubmit } variant="contained">
            Submit Order
          </Button>
        </Grid>
      </Grid>
      { snackbarState.isSnackbarViewable && <CustomSnackbar { ...snackbarState } /> }
    </Container>
  );
};

export default CheckOut;
