import React from 'react'
import useStyles from './styles.js'

function Post() {
    const classes = useStyles();
  return (
    <div className={classes.actionDiv}>Post</div>
  )
}

export default Post