import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  let cartCopy = [];
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload.item;
      let existItem = state.cartItems.find((item) => item.id === newItem.id);
      if (existItem) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem].sort(
            (a, b) => a.year - b.year
          ),
        };
      }
    case CART_REMOVE_ITEM:
      cartCopy = [];
      //check if this is best method to duplicate array of objects
      state.cartItems.forEach((item) => cartCopy.push({ ...item }));
      return {
        ...state,
        cartItems: cartCopy.filter((item) => item.id !== action.payload),
      };
    case INCREASE_QUANTITY:
      cartCopy = [];
      //check if this is best method to duplicate array of objects
      state.cartItems.forEach((item) => cartCopy.push({ ...item }));
      const idxOfItemToIncrease = cartCopy.findIndex(
        (item) => item.id === action.payload
      );
      cartCopy[idxOfItemToIncrease].quantity++;
      return {
        ...state,
        cartItems: [...cartCopy],
      };

    case DECREASE_QUANTITY:
      cartCopy = [];
      //check if this is best method to duplicate array of objects
      state.cartItems.forEach((item) => cartCopy.push({ ...item }));
      const idxOfItemToDecrease = cartCopy.findIndex(
        (item) => item.id === action.payload
      );
      if (cartCopy[idxOfItemToDecrease].quantity === 1) {
        return {
          ...state,
        };
      }
      cartCopy[idxOfItemToDecrease].quantity--;
      return {
        ...state,
        cartItems: [...cartCopy],
      };
    case CLEAR_CART: 
      return { 
        ...state, 
        cartItems: []
      }
    default:
      return state;
  }
};
