import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import PostsPage from "./components/PostsPage/PostsPage";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import BookDetails from "./components/BookDetails/BookDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/books" />} />
          <Route path="/books" exact component={Home} />
          <Route path="/books/search" exact component={Home} />
          <Route path="/books/:id" exact component={BookDetails} />
          <Route path="/posts" exact component={PostsPage} />
          <Route path="/posts/search" exact component={PostsPage} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
