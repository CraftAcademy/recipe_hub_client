import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import Recipes from "../modules/Recipes";

const RecipeCreateForm = () => {
  const [recipe, setRecipe] = useState({});
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
      <Button variant="outlined" data-cy="submit-btn" onClick={createRecipe}>
        Submit
      </Button>
      {message ? (
        <Alert data-cy="flash-message" severity="info">
          {message}
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
};

export default RecipeCreateForm;
