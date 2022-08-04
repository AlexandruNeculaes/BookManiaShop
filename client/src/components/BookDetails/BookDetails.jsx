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
import { Button } from "@material-ui/core";
import useStyles from "./styles";

const Book = () => {
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

  const recommendedBooks = books.filter(({ _id }) => _id !== book._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {book.title}
          </Typography>
          <Typography variant="h6" component="h2">
            {book.author}
          </Typography>
          <Typography variant="h6" component="p">
            {book.year}
          </Typography>
          <Typography variant="h6" component="p">
            {book.publisher}
          </Typography>

          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {book.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography variant="h6" component="h2">
            {book.price}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {book.message}
          </Typography>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
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
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedBooks}>
            {recommendedBooks.map(
              ({ title, name, message, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openBook(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <img src={selectedFile} width="200px" alt={selectedFile} />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Book;
