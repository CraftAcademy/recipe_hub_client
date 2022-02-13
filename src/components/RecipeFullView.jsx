import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import ShowFullRecipe from "./ShowFullRecipe";
import Recipes from "../modules/Recipes";
import { useNavigate } from "react-router-dom";

const RecipeFullView = () => {
  const { currentUser } = useSelector((state) => state);
  const [message, setMessage] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteRecipe = async () => {
    const data = await Recipes.delete(id);
    setMessage(data.message);
    debugger;
    return data;
  };

  const confirmDelete = (confirm) => {
    confirm.stopPropagation();
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe();
      setTimeout(() => navigate("/my-recipes"), 1500);
    }
  };

  return (
    <>
      {currentUser ? (
        <>
          <Button
            onClick={confirmDelete}
            sx={{ margin: 1, ml: 77, flexGrow: 1, boxShadow: 3 }}
            color="inherit"
            data-cy="delete-btn"
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <ShowFullRecipe />
          <Alert data-cy="flash-message">{message}</Alert>
        </>
      ) : (
        <ShowFullRecipe />
      )}
    </>
  );
};

export default RecipeFullView;
