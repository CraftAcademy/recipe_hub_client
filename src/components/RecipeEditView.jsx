import React, { useState, useEffect } from "react";
import { TextField, Button, Alert, Typography } from "@mui/material";
import Recipes from "../modules/Recipes";
import utilities from "../modules/utilities";
import { styled } from "@mui/material/styles";
import IngredientsFields from "./IngredientsFields";
import { useParams } from "react-router-dom";

const Input = styled("input")({
  display: "none"
});

const RecipeCreateForm = () => {
  const { id } = useParams();
  const fields = { ingredient_id: "", unit: "", amount: "" };
  const [recipe, setRecipe] = useState({});
  const [inputList, setInputList] = useState([fields]);
  const [message, setMessage] = useState();
  const [fileName, setFileName] = useState("");

  const handleChange = (event) => {
    setRecipe({
      ...recipe,
      [event.target.name]: event.target.value
    });
  };

  const handleImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    file.name && setFileName(file.name);
    const encodedFile = await utilities.imageEncoder(file);
    setRecipe({ ...recipe, image: encodedFile });
  };

  const fetchRecipe = async () => {
    const data = await Recipes.show(id);
    if (data.recipe) {
      setRecipe(data.recipe);
      setInputList([...data.recipe?.ingredients]);
    }
  };

  const updateRecipe = async () => {
    const data = await Recipes.update(recipe);
    setMessage(data.message);
    setTimeout(() => { setMessage("") }, 4000);
  };

  useEffect(() => {
    id && fetchRecipe();
  }, []);

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Recipe name"
        variant="outlined"
        data-cy="recipe-name"
        name="name"
        InputLabelProps={{
          shrink: true
        }}
        value={recipe.name}
        onChange={handleChange}
      />
      <div>
        <TextField
          id="outlined-basic"
          label="Instructions"
          value={recipe.instructions}
          multiline
          rows={4}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
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
      <Button variant="outlined" data-cy="submit-btn" onClick={updateRecipe}>
        Save
      </Button>
      <div>
        <label htmlFor="contained-button-file">
          <Input
            id="contained-button-file"
            data-cy="attach-image"
            accept="image/*"
            onChange={handleImage}
            name="image"
            multiple
            type="file"
          />
          <Button variant="contained" component="span">
            Image
          </Button>
        </label>
        <Typography
          variant="caption"
          gutterBottom
          style={{ marginLeft: "10px" }}
        >
          {fileName}
        </Typography>
      </div>
      {message && (
        <Alert data-cy="flash-message" severity="info">
          {message}
        </Alert>
      )}
    </div>
  );
};

export default RecipeCreateForm;
