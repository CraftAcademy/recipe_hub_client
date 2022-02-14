import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled, Typography, Grid, Paper, Button } from "@mui/material";
import Recipes from "../modules/Recipes";
import IngredientsList from "./IngredientsList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

const RecipeFullView = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state);
  const [recipe, setRecipe] = useState({});
  const [showEditDelete, setShowEditDelete] = useState(false);
  const { id } = useParams();

  const fetchRecipe = async () => {
    const data = await Recipes.show(id);
    if (data.recipe) {
      currentUser?.uid === data.recipe?.owner && setShowEditDelete(true);
      setRecipe(data.recipe);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <Paper
      sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1, boxShadow: 3 }}
    >
      {showEditDelete && (
        <Button data-cy="edit-recipe-btn" variant="contained" color="success"
          onClick={() => navigate(`/recipes/${recipe.id}/edit`)}
        >
          Edit
        </Button>
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
  );
};

export default RecipeFullView;
