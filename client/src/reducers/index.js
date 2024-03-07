import { combineReducers } from "@reduxjs/toolkit";
import posts from "./posts";
import auth from "./Auth";
export default combineReducers({
  posts,auth
});
