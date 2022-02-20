import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Comments from "../modules/Comments";
import { useParams } from "react-router-dom";

const AddCommentForm = ({ onCommentAdded }) => {
  const initialComment = { body: "" };
  const { currentUser } = useSelector((state) => state);
  const [comment, setComment] = useState(initialComment);
  const { id } = useParams();

  const handleChange = (event) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value
    });
  };

  const createComment = async () => {
    const response = await Comments.create(id, comment);
    if (response.comment) {
      onCommentAdded();
      setComment(initialComment);
    }
  };

  return (
    <>
      {currentUser && (
        <>
          <TextField
            data-cy="comment-field"
            name="body"
            size="normal"
            value={comment.body}
            variant="outlined"
            fullWidth
            multiline
            placeholder="Leave your comment here ..."
            onChange={handleChange}
          />
          <Button onClick={createComment} data-cy="post-comment-btn">
            Post comment
          </Button>
        </>
      )}
    </>
  );
};

export default AddCommentForm;
