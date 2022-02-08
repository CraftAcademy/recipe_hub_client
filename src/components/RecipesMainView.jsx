import React, { useState, useEffect } from "react";
import Recipes from "../modules/Recipes";
import RecipeCard from "./RecipeCard";
import { Grid } from "@mui/material";


const RecipesMainView = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const response = await Recipes.index();
    if (!response.message) {
      setRecipes(response);
    }
  };

  const recipesList = recipes.map((recipe, index) => {
    recipe.index = index + 1;
    return (
      
      <Grid item key={recipe.id}>
  
        <RecipeCard recipe={recipe} />
      </Grid>
    );
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} data-cy="recipes-list">
      {recipesList}
    </Grid>
  );
};

export default RecipesMainView;
