import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";
import books from "./books";

export const reducers = combineReducers({ books, posts, auth });
