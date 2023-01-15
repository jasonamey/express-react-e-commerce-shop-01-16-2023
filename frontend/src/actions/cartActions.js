import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART
} from "../constants/cartConstants";

export const addToCart = (item) => (dispatch, getState) => {
  console.log("been added")
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      item,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const subtractFromQuantity = (id) => (dispatch, getState) => {
  dispatch({
    type: DECREASE_QUANTITY,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addToQuantity = (id) => (dispatch, getState) => {
  dispatch({
    type: INCREASE_QUANTITY,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch, getState) => {
  dispatch({
    type: CLEAR_CART
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}
