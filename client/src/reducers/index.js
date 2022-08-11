import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";
import books from "./books";
import cart from "./cart";

//combining all the reducers
export const reducers = combineReducers({ books, posts, auth, cart });
