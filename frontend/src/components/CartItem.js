import React from "react";
import { useDispatch } from "react-redux";
import {
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CART_REMOVE_ITEM,
} from "../constants/cartConstants";
import { 
  addToQuantity, subtractFromQuantity
} from '../actions/cartActions'
import {
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ButtonGroup,
  Button,
  Typography,
  Divider,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = ({ title, image, quantity, price, format, id }) => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <>
      <ListItem style={{ width: "100%" }}>
        <ListItemAvatar sx={{ flex: 1, display: matches ? "block" : "none" }}>
          <Avatar
            alt="Remy Sharp"
            src={`${process.env.REACT_APP_BASE_URL}/${image}`}
            variant="rounded"
          />
        </ListItemAvatar>
        <ListItemText
          sx={{ flex: 1 }}
          disableTypography
          primary={<Typography variant="body2">{title}</Typography>}
        />
        <ListItemText
          sx={{ flex: 1 }}
          primary={<Typography variant="body2">{format}</Typography>}
        />
        <ListItemText
          sx={{ flex: 1 }}
          primary={<Typography variant="body2">{`$${price / 100}`}</Typography>}
        />
        <Box flex="1" textAlign="center">
          <ButtonGroup
            size="small"
            aria-label="small outlined button group"
            orientation={matches ? "horizontal" : "vertical"}
          >
            <Button
              variant="contained"
              sx={{ boxShadow: "none" }}
              // onClick={() => dispatch({ type: INCREASE_QUANTITY, payload: id })}
              onClick={() => dispatch(subtractFromQuantity(id))}
            >
              -
            </Button>
            <Button variant="outlined" disableRipple>
              {quantity}
            </Button>
            <Button
              variant="contained"
              sx={{ boxShadow: "none" }}
              onClick={() => dispatch(addToQuantity(id))}
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
        <Box
          textAlign={matches ? "center" : "left"}
          flex={matches ? "1" : ".2"}
        >
          <IconButton
            color="primary"
            onClick={() => dispatch({ type: CART_REMOVE_ITEM, payload: id })}
            // aria-label="open drawer"
            // edge="start"
            // onClick={handleDrawerToggle}
            // sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
        <ListItemText
          sx={{ flex: 1, display: { xs: "none", sm: "flex" } }}
          primary={
            <Typography variant="body2" textAlign="right">{`subtotal: $${
              (quantity * price) / 100
            }`}</Typography>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default CartItem;
