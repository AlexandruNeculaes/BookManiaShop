import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_BOOK,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

//function for actions related to books and dispatching the data to the reducers
export const getBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchBook(id);

    dispatch({ type: FETCH_BOOK, payload: { book: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getBooks = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchBooks(page);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getBooksBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchBooksBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createBook = (book, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createBook(book);

    dispatch({ type: CREATE, payload: data });

    history.push(`/books/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = (id, book) => async (dispatch) => {
  try {
    const { data } = await api.updateBook(id, book);
    console.log(data);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    await await api.deleteBook(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
