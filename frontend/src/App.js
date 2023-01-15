import { useEffect } from "react";
import { Cart } from "./screens";
import LoginM from "./screens/LoginM";
import RegisterM from "./screens/RegisterM";
import Home from "./screens/Home";
import AddProduct from "./screens/AddProdcut";
import EditProduct from "./screens/EditProduct";
import UsersScreen from "./screens/UsersScreen";
import Orders from './screens/Orders'
import CheckOut from "./screens/CheckOut";
import Header from "./components/Header";
import PrivateRoute from "./auth/PrivateRoute";
import { createTheme, ThemeProvider } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ADMIN, USER } from "./constants/utilConstants";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
});

function App () {
  return (
    <ThemeProvider theme={ theme }>
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Routes>
            <Route path="/login" element={ <LoginM /> } />
            <Route path="/register" element={ <RegisterM /> } />
            <Route
              path="/addProduct"
              element={
                <PrivateRoute userRole={ ADMIN }>
                  <AddProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PrivateRoute userRole={ ADMIN }>
                  <EditProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute userRole={ ADMIN }>
                  <UsersScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <Orders />
              }
            />
            <Route
              path="/checkout"
              element={
                <Elements stripe={ stripePromise }>
                  <CheckOut />
                </Elements>
              }
            />
            <Route path="/cart" element={ <Cart /> } />
            <Route path="/" element={ <Home /> } />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
