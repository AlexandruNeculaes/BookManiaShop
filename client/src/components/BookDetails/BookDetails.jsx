import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getBook, getBooksBySearch } from "../../actions/books";
import { addToCart } from "../../actions/cart";
import { Button } from "@material-ui/core";
import useStyles from "./styles";

//book detail component
const Book = () => {
  //state variables from react redux store
  const { book, books, isLoading } = useSelector((state) => state.books);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBook(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (book) {
      //dispatching the action to search the book
      dispatch(
        getBooksBySearch({ search: "none", tags: book?.tags.join(",") })
      );
    }
  }, [book, dispatch]);

  if (!book) return null;

  const openBook = (_id) => history.push(`/books/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  //filtering the books
  const recommendedBooks = books.filter(({ _id }) => _id !== book._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" color="primary" component="h2">
            {book.title}
          </Typography>
          <Typography variant="h6" component="h2">
            by: {book.author}
          </Typography>
          <Typography variant="h6" component="p">
            year: {book.year}
          </Typography>
          <Typography variant="h6" component="p">
            publisher: {book.publisher}
          </Typography>

          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {book.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography variant="h6" color="error" component="h2">
            Price: {book.price}€
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            Description: {book.message}
          </Typography>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="success"
            size="large"
            type="submit"
            fullWidth
            onClick={() => {
              dispatch(addToCart(book));
            }}
          >
            Add to cart
          </Button>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              book.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={book.title}
          />
        </div>
      </div>
      {!!recommendedBooks.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5" color="success">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedBooks}>
            {recommendedBooks.map(({ title, message, selectedFile, _id }) => (
              <div
                style={{ margin: "20px", cursor: "pointer" }}
                onClick={() => openBook(_id)}
                key={_id}
              >
                <Typography gutterBottom variant="h6">
                  {title}
                </Typography>

                <Typography gutterBottom variant="subtitle2">
                  {message}
                </Typography>
                <img src={selectedFile} width="200px" alt={selectedFile} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Book;
