import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Avatar,
  Typography,
  Toolbar,
  Button,
  Badge,
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { emptyCart } from "../../actions/cart";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";
import BookTalk from "../../images/BookTalk.png";
import About from "../../images/about.jpg";
import BookManiaLogo from "../../images/BookManiaLogo.png";
import cartImage from "../../images/cart.jpg";

/* eslint-disable */
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  

  const { cart } = useSelector((state) => state.cart);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart]);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    dispatch(emptyCart());

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          component={Link}
          to="/"
          src={BookManiaLogo}
          alt="icon"
          height="60px"
        />
      </Link>
      <Link to="/posts" className={classes.brandContainer}>
        <img
          className={classes.image}
          src={BookTalk}
          alt="icon"
          height="70px"
        />
      </Link>
      <Link to="/about" className={classes.brandContainer}>
        <img className={classes.image} src={About} alt="icon" height="70px" />
      </Link>

      <Link to="/cart" className={classes.cart}>
        <Badge badgeContent={cartCount} color="primary">
          <img
            className={classes.image}
            src={cartImage}
            alt="icon"
            height="70px"
          />
        </Badge>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
