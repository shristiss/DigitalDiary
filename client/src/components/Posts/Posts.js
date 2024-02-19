import React from "react";
import useStyles from "./styles.js";
import Post from "./Post/Post.js";
import {  useSelector } from "react-redux";


function Posts() {
const posts = useSelector((state) => state.posts)

  const classes = useStyles();
  return (
    <>
      <h1 className={classes.actionDiv}>Posts</h1>
      <Post />
      <Post />
      <Post />
    </>
  );
}

export default Posts;
