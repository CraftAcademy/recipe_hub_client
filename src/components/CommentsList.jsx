import React from "react";
import { Grid, Typography, Paper } from "@mui/material";

const CommentsList = ({ commentsList }) => {
  const commentsFeed = commentsList.map((comment, index) => {
    comment.index = index + 1;
    return (
      <Grid item xs={12} key={comment.index}>
        <Typography
          data-cy={`comment-user-${comment.index}`}
          variant="h6"
          gutterBottom
          component="div"
        >
          {comment.user}
        </Typography>
        <Typography
          data-cy={`comment-body-${comment.index}`}
          variant="body1"
          gutterBottom
          component="div"
        >
          {comment.body}
        </Typography>
      </Grid>
    );
  });

  return (
    <Paper style={{ padding: "40px 20px" }}>
      <Grid container data-cy="comment-feed" spacing={2}>
        {commentsFeed}
      </Grid>
    </Paper>
  );
};

export default CommentsList;
