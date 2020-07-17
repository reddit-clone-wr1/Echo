import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Subforum from "./Components/Subforum/Subforum";
import Post from "./Components/Post/Post";
import Profile from "./Components/Profile/Profile";
import CreatePost from "./Components/CreatePost/CreatePost";
import PostDetailed from "./Components/Post/PostDetailed/PostDetailed";
//protected route imports
import ProtectedProfile from "./ProtectedRoutes/ProtectedProfile";
import Search from "./Components/Search/Search";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/subforum/:subforumId" component={Subforum} />
    <Route path="/subforum/:subforumId/posts/:postId" component={Post} />
    <ProtectedProfile path="/user/:username" component={Profile} />
    <Route path="/subforum/:subforumId/post" component={CreatePost} />
    <Route path="/subforum/post" component={CreatePost} />
    <Route path="/subforum/:subforumId/posts/:postId" component={PostDetailed} />
    <Route path="/search" component={Search} />
  </Switch>
);
