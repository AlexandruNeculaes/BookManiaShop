import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { createBook, updateBook } from "../../actions/books";
import useStyles from "./styles";

//book form component
const BookForm = ({ currentId, setCurrentId }) => {
  //state for book data
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    year: "",
    publisher: "",
    price: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  //getting the book data from store
  const book = useSelector((state) =>
    currentId
      ? state.books.books.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  //clear function to set the book data to intial state
  const clear = () => {
    setCurrentId(0);
    setBookData({
      title: "",
      author: "",
      year: "",
      publisher: "",
      price: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (!book?.title);
    if (book) setBookData(book);
  }, [book]);

  //submit function to create a new book
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bookData);
    if (currentId === 0) {
      //dispatching an action to create a new book
      dispatch(createBook({ ...bookData, name: user?.result?.name }, history));
      clear();
    } else {
      //disptaching action to update the exisitng book
      dispatch(
        updateBook(currentId, { ...bookData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Discover our full range of books.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setBookData({ ...bookData, tags: [...bookData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setBookData({
      ...bookData,
      tags: bookData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  //checking if the user is admin
  const isAdmin = user.result.role === "admin";

  return (
    isAdmin && (
      <Paper className={classes.paper} elevation={6}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" color="primary">
            {currentId ? `Editing "${book?.title}"` : "Add Book"}
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Book Title"
            fullWidth
            value={bookData.title}
            onChange={(e) =>
              setBookData({ ...bookData, title: e.target.value })
            }
          />
          <TextField
            name="author"
            variant="outlined"
            label="Book Author"
            fullWidth
            value={bookData.author}
            onChange={(e) =>
              setBookData({ ...bookData, author: e.target.value })
            }
          />
          <TextField
            name="year"
            variant="outlined"
            label="Year"
            fullWidth
            value={bookData.year}
            onChange={(e) => setBookData({ ...bookData, year: e.target.value })}
          />
          <TextField
            name="publisher"
            variant="outlined"
            label="Book Publisher"
            fullWidth
            value={bookData.publisher}
            onChange={(e) =>
              setBookData({ ...bookData, publisher: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Book description"
            fullWidth
            multiline
            rows={4}
            value={bookData.message}
            onChange={(e) =>
              setBookData({ ...bookData, message: e.target.value })
            }
          />
          <TextField
            name="price"
            variant="outlined"
            label="Book Price"
            fullWidth
            value={bookData.price}
            onChange={(e) =>
              setBookData({ ...bookData, price: e.target.value })
            }
          />
          <div style={{ padding: "5px 0", width: "94%" }}>
            <ChipInput
              name="tags"
              variant="outlined"
              label="Book tags"
              fullWidth
              value={bookData.tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
            />
          </div>
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setBookData({ ...bookData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    )
  );
};

export default BookForm;
