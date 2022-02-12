import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import Recipes from "../modules/Recipes";
import IngredientsFields from "./IngredientsFields";

const RecipeCreateForm = () => {
  const fields = { ingredient_id: "", unit: "", amount: "" };
  const [recipe, setRecipe] = useState({});
  const [inputList, setInputList] = useState([fields]);
  const [message, setMessage] = useState();

  const createRecipe = async () => {
    const params = { ...recipe, ingredients_attributes: inputList };
    const response = await Recipes.create(params);
    setMessage(response.message);
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
        data-cy="recipe-name"
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
      <div>
        <IngredientsFields
          fields={fields}
          inputList={inputList}
          setInputList={setInputList}
        />
      </div>
      <Button variant="outlined" data-cy="submit-btn" onClick={createRecipe}>
        Save
      </Button>
      {message && (
        <Alert data-cy="flash-message" severity="info">
          {message}
        </Alert>
      )}
    </div>
  );
};

export default RecipeCreateForm;
