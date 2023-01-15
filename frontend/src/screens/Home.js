import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

const url = process.env.REACT_APP_BASE_URL;

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const adminStatus = useSelector((state) => state.adminStatus);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios(`${url}/products`);
      const { products } = response.data;
      setProducts(products);
    };
    getProducts();
  }, []);

  return (
    <Grid container spacing={2} p={4}>
      {products?.map((product) => (
        <Grid
          key={product._id}
          item
          xs={12}
          sm={6}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <Product
            key={product._id}
            {...product}
            isAdmin={adminStatus.isAdmin}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeScreen;

// <Container sx={{ backgroundColor: 'green'}}>
