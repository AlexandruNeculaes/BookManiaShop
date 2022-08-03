import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core/";

import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { deleteBook } from "../../../actions/books";
import useStyles from "./styles";

const Book = ({ book, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const openBook = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/books/${book._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openBook}
      >
        <CardMedia
          className={classes.media}
          image={
            book.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={book.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{book.name}</Typography>
          <Typography variant="body2">
            {moment(book.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === book?.creator ||
          user?.result?._id === book?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(book._id);
              }}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {book.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {book.title}
        </Typography>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {book.author}
        </Typography>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {book.year}
        </Typography>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {book.publisher}
        </Typography>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {book.price}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {book.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === book?.creator ||
          user?.result?._id === book?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deleteBook(book._id))}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Book;
