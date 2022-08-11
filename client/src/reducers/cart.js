import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADJUST_QTY,
  EMPTY_CART,
} from "../constants/actionTypes";

//cart reducer to set the state data for cart
const cartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    //reducer to add the item to the cart
    case ADD_TO_CART:
      //checking if it is already present
      const isAlreadyPresent = state.cart.find((item) =>
        item._id === action.payload.item._id ? true : false
      );
      //if item is new adding it to cart else increasing it's quantity
      return {
        ...state,
        cart: isAlreadyPresent
          ? state.cart.map((item) =>
              item._id === action.payload.item._id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...action.payload.item, qty: 1 }],
      };
    //filtering the cart to remove the item
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload.item._id),
      };
    //empty the cart
    case EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    //adjusting the qty of cart items, it  can use the value to increase or decrease the cart quantity
    case ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload.item._id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
