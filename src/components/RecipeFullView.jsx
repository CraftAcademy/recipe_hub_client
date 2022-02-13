import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import ShowFullRecipe from "./ShowFullRecipe";

const RecipeFullView = () => {
  const { currentUser } = useSelector((state) => state);
  return (
    <>
      {currentUser ? (
        <>
          <Button
            sx={{ margin: 1, ml: 77, flexGrow: 1, boxShadow: 3 }}
            color="inherit"
            data-cy="delete-btn"
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <ShowFullRecipe />
        </>
      ) : (
        <ShowFullRecipe />
      )}
    </>
  );
};

export default RecipeFullView;
