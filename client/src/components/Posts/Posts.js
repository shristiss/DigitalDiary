import React from "react";
import useStyles from "./styles.js";
import Post from "./Post/Post.js";
import {  useSelector } from "react-redux";
import {Grid, CircularProgress} from '@material-ui/core'

function Posts({currentId, setCurrentId}) {
const posts = useSelector((state) => state.posts)
  const classes = useStyles();
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={5} lg={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
