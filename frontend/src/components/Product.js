import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import { addToCart } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {
  Typography,
  Button,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      maxWidth: "300px",
      marginTop: "5%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  })
);

const Product = ({
  description,
  image,
  price,
  year,
  title,
  isAdmin,
  _id: id,
}) => {
  const [format, setFormat] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const cartClickHanlder = () => {
    const item = {
      title,
      image,
      price: price * 100,
      id: `${id}&${format}`,
      format,
      year,
      quantity: 1,
    };
    dispatch(addToCart(item, 1));
  };
  const changeHandler = (e) => {
    setFormat(e.target.value);
  };

  const editClickHandler = () => {
    navigate(`product/${id}`);
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        image={`${process.env.REACT_APP_BASE_URL}/${image}`}
        title={`${title}-album-cover`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography gutterBottom>{year}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          height="4em"
        >
          {description}
        </Typography>
        <Typography marginBottom="30px">{`$${price}`}</Typography>
        {!isAdmin && (
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="format">Format</InputLabel>
            <Select
              id="format"
              name="format"
              defaultValue="cd"
              label="Format"
              value={format}
              // value={formik.values.format}
              onChange={changeHandler}
              // error={formik.touched.format && Boolean(formik.errors.format)}
              // helpertext={formik.touched.format && formik.errors.format}
            >
              {["vinyl", "cd", "mp3", "8-track"].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Box width="100%" marginTop={"1em"}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={cartClickHanlder}
            disabled={format.length === 0}
          >
            ADD TO CART
          </Button>
          {isAdmin && (
            <Button
              size="small"
              color="primary"
              variant="outlined"
              sx={{ position: "absolute", right: "10px" }}
              onClick={editClickHandler}
            >
              EDIT
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Product;
