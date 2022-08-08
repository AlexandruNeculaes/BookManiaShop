import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, adjustQty } from "../../../actions/cart";
import { Paper, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import "./CartItem.css";

const CartItem = ({ book }) => {
  const dispatch = useDispatch();

  const increaseQtyHandler = () => {
    dispatch(adjustQty(book, book.qty + 1));
  };

  const decreaseQtyHandler = () => {
    if (book.qty === 1) {
      dispatch(removeFromCart(book));
    }
    dispatch(adjustQty(book, book.qty - 1));
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Paper elevation={4}>
        <div className="itemContainer">
          <div className="imageContainer">
            <img src={book.selectedFile} alt="" />
          </div>
          <div className="contentContainer">
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            <h4>{book.price}€</h4>
            <div className="btnContainer">
              <div className="qtyContainer">
                <IconButton onClick={decreaseQtyHandler}>
                  <RemoveIcon />
                </IconButton>
                <h4>{book.qty}</h4>
                <IconButton onClick={increaseQtyHandler}>
                  <AddIcon />
                </IconButton>
              </div>
              <div className="deleteContainer">
                <IconButton
                  onClick={() => {
                    dispatch(removeFromCart(book));
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default CartItem;
