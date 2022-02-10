import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import Recipes from "../modules/Recipes";

const RecipeCreateForm = () => {
  const [recipe, setRecipe] = useState({});
  const [ingredientLines, setIngredientLines] = useState(1);
  const [message, setMessage] = useState();

  const createRecipe = async () => {
    const response = await Recipes.create(recipe);
    setMessage(response.data.message);
  };

  const handleChange = (event) => {
    setRecipe({
      ...recipe,
      [event.target.name]: event.target.value
    });
  };

  const addIngredientLine = () => {
    setIngredientLines(ingredientLines + 1);
  };

  const ingredientFields = () => {
    return (
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
    );
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

      <div>
        <TextField
          id="outlined-basic"
          label="Instructions"
          multiline
          rows={4}
          variant="outlined"
          data-cy="instructions"
          name="instructions"
          onChange={handleChange}
        />
      </div>

      <div data-cy="ingredients-section">
        <h1>Ingredients</h1>
        {ingredientFields()}

        <Button
          data-cy="add-new-ingredient-line"
          onClick={() => addIngredientLine()}
          variant="outlined"
        >
          +
        </Button>
      </div>

      <Button variant="outlined" data-cy="submit-btn" onClick={createRecipe}>
        Submit
      </Button>

      {message ? (
        <Alert data-cy="flash-message" severity="success">
          {message}
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
};

export default RecipeCreateForm;
