import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADJUST_QTY,
  EMPTY_CART,
} from "../constants/actionTypes";

//function for actions related to cart and dispatching the data to the reducers
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: {
      item: item,
    },
  };
};

export const removeFromCart = (item) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      item: item,
    },
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export const adjustQty = (item, value) => {
  return {
    type: ADJUST_QTY,
    payload: {
      item: item,
      qty: value,
    },
  };
};
