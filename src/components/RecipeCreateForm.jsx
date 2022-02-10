import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Recipes from "../modules/Recipes";

const RecipeCreateForm = () => {
  const [recipe, setRecipe] = useState({});

  const createRecipe = async () => {
    const response = await Recipes.create(recipe);
  };

  const handleChange = (event) => {
    setRecipe({
      ...recipe,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Recipe name"
        variant="outlined"
        data-cy="name-input"
        name="name"
        onChange={handleChange}
      />
      <>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          data-cy="ingredient-name-input"
          name="ingredient-name"
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          data-cy="ingredient-amount-input"
          name="ingredient-amount"
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Unit"
          variant="outlined"
          data-cy="ingredient-unit-input"
          name="ingredient-unit"
          onChange={handleChange}
        />
      </>
      <TextField
        id="outlined-basic"
        label="Instructions"
        variant="outlined"
        data-cy="instructions"
        name="instructions"
        onChange={handleChange}
      />
      <Button variant="outlined" data-cy="submit-btn" onClick={createRecipe}>
        Submit
      </Button>
    </div>
  );
};

export default RecipeCreateForm;
