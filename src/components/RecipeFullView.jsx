import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled, Typography, Grid, Paper, Button, Alert } from "@mui/material";
import Recipes from "../modules/Recipes";
import IngredientsList from "./IngredientsList";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

const RecipeFullView = () => {
  const [showEditDelete, setShowEditDelete] = useState(false);
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state);
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const fetchRecipe = async () => {
    const data = await Recipes.show(id);
    if (data.recipe) {
      currentUser?.uid === data.recipe?.owner && setShowEditDelete(true);
      setRecipe(data.recipe);
    }
  };

  const deleteRecipe = async () => {
    const data = await Recipes.delete(id);
    setMessage(data.message);
    if (data.message === "Your Recipe has been deleted!") {
      setTimeout(() => navigate("/my-recipes"), 2000);
    }
  };

  const confirmDelete = (confirm) => {
    confirm.stopPropagation();
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe();
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <>
      {message && (
        <Alert data-cy="flash-message" severity="info">
          {message}
        </Alert>
      )}
      <Paper
        sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1, boxShadow: 3 }}
      >
        {showEditDelete && (
          <>
            <Button
              sx={{ margin: 1, ml: 44, flexGrow: 1, boxShadow: 3 }}
              data-cy="delete-btn"
              color="inherit"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </>
        )}
        <Grid container spacing={2}>
          <Grid item>
            <Img
              src="https://mui.com/static/images/cards/paella.jpg"
              loading="lazy"
            />
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h5" data-cy="recipe-name">
              {recipe.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <IngredientsList ingredients={recipe.ingredients} />
          </Grid>
          <Grid item>
            <Typography
              gutterBottom
              variant="body1"
              data-cy="recipe-instructions"
            >
              {recipe.instructions}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              data-cy="recipe-created_at"
              variant="caption"
              display="block"
              gutterBottom
            >
              {recipe.created_at}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default RecipeFullView;
