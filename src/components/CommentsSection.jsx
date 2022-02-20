import React from "react";
import { Box } from "@mui/material";

import AddCommentForm from "./AddCommentForm";
import CommentsList from "./CommentsList";

const CommentsSection = ({ onCommentAdded, commentsList }) => {
  return (
    <Box
      component="form"
      sx={{ p: 2, margin: "auto", maxWidth: 800, flexGrow: 1, boxShadow: 3 }}
      noValidate
      autoComplete="off"
    >
      <AddCommentForm onCommentAdded={onCommentAdded} />
      <CommentsList commentsList={commentsList} />
    </Box>
  );
};

export default CommentsSection;
