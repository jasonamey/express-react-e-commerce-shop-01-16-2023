import * as React from "react";
import CartItem from "../components/CartItem";
import { List, Typography, Container, Box, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { totalPriceCalculation } from "../utils";

// const totalPriceCalculation = (items) => items.reduce((sum,item) => sum + (item.quantity * item.price), 0)

export function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const totalPrice = totalPriceCalculation(cartItems);
  const navigate = useNavigate();
  const checkoutClickHandler = () => {
    navigate("/checkout");
  };
  return (
    <Container sx={{ textAlign: "center" }}>
      <Box
        p={1}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {cartItems?.length === 0 ? (
          <Alert severity="info">There are no items in your cart</Alert>
        ) : (
          <>
            <List
              sx={{
                width: "100%",
                maxWidth: "1000px",
                bgcolor: "background.paper",
              }}
            >
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </List>
            <Typography
              variant="h6"
              sx={{
                maxWidth: "1000px",
                width: "100%",
                textAlign: "right",
                boxSizing: "border-box",
                paddingRight: "20px",
                marginBottom: "10px",
              }}
            >{`TOTAL: $${totalPrice / 100}`}</Typography>
            <Box
              width="100%"
              maxWidth="1000px"
              textAlign="right"
              paddingRight="30px"
            >
              <Button variant="contained" onClick={checkoutClickHandler}>
                Check Out
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
