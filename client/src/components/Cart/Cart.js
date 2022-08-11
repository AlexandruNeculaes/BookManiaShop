import React, { useState, useEffect } from "react";
import stripe from "../../images/stripe.jpg";
import { Link } from "react-router-dom";
import * as api from "../../api/index.js";

import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import {
  Container,
  Grow,
  Grid,
  Typography,
  Button,
  Paper,
  Box,
} from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { emptyCart } from "../../actions/cart.js";

//stripe key
const KEY = process.env.REACT_APP_STRIPE_KEY;

//component for cary
const Cart = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  //getting the cart state from store
  const { cart } = useSelector((state) => state.cart);

  //states
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [paymentMessage, setPaymentMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    let items = 0;
    let price = 0;
    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);

  //function to make the payment when the checkout button  is clicked
  const makePayment = async (token) => {
    const body = { token, totalPrice };

    const { data } = await api.doPayment(body);
    if (data.status === "succeeded") {
      setPaymentMessage("Payment Successful!");
      dispatch(emptyCart());
    } else {
      setPaymentMessage("Something went wrong!");
    }
    setTimeout(() => {
      setPaymentMessage("");
    }, 2000);
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={8}>
            {cart.length > 0 &&
              cart.map((cartItem) => (
                <CartItem key={cartItem._key} book={cartItem} />
              ))}
            {cart.length <= 0 && (
              <div style={{ marginTop: "20px" }}>
                <Paper elevation={3}>
                  <Box sx={{ padding: "30px 20px !important" }}>
                    <Typography variant="h5" color="primary" component="h1">
                      Your cart is empty
                    </Typography>
                  </Box>
                </Paper>
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div style={{ marginTop: "20px" }}>
              <Paper elevation={3}>
                <Box sx={{ padding: "30px 20px !important" }}>
                  <Typography variant="h5" color="primary" component="h1">
                    Cart Summary
                  </Typography>
                  <div style={{ margin: "30px 0" }}>
                    <Typography variant="h6" color="error" component="h6">
                      Order Total ({totalItems} Item): {totalPrice}€
                    </Typography>
                  </div>
                  {/* stripe component for getting the card info */}
                  {user?.result?.name && totalItems >= 1 && (
                    <StripeCheckout
                      stripeKey={KEY}
                      billingAddress
                      token={makePayment}
                      name="Checkout and Pay"
                      amount={totalPrice * 100}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={totalItems < 1}
                      >
                        Proceed to Checkout
                      </Button>
                      {paymentMessage !== "" && (
                        <div style={{ marginTop: "10px" }}>
                          <Typography variant="body1" component="p">
                            {paymentMessage}
                          </Typography>
                        </div>
                      )}
                    </StripeCheckout>
                  )}
                  {totalItems < 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={totalItems < 1}
                    >
                      Proceed to Checkout
                    </Button>
                  )}
                  {!user?.result?.name && (
                    <Link to="/auth">
                      <Button>Log in to proceede to checkout</Button>
                    </Link>
                  )}
                </Box>
              </Paper>
              <br />
              <br />
              <Paper elevation={3}>
                <Box sx={{ padding: "30px 20px !important" }}>
                  <Typography variant="h5" color="primary" component="h1">
                    For testing purposes please use Stripe credentials!
                  </Typography>
                  <img
                    className={classes.image}
                    src={stripe}
                    alt="icon"
                    height="200px"
                  />
                </Box>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Cart;
