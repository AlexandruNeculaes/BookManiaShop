import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { createBook, updateBook } from "../../actions/books";
import useStyles from "./styles";

const BookForm = ({ currentId, setCurrentId }) => {
  const [bookData, setBookData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const book = useSelector((state) =>
    currentId
      ? state.books.books.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setBookData({ title: "", message: "", tags: [], selectedFile: "" });
  };

  useEffect(() => {
    if (!book?.title) clear();
    if (book) setBookData(book);
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createBook({ ...bookData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(
        updateBook(currentId, { ...bookData, name: user?.result?.name })
      );
      clear();
    }
  };

  const handleAddChip = (tag) => {
    setBookData({ ...bookData, tags: [...bookData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setBookData({
      ...bookData,
      tags: bookData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
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
          label="Title"
          fullWidth
          value={bookData.title}
          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={bookData.message}
          onChange={(e) =>
            setBookData({ ...bookData, message: e.target.value })
          }
        />
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
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
  );
};

export default BookForm;
