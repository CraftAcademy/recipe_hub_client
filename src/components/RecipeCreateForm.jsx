import React, { useState } from "react";
import Recipes from "../modules/Recipes";
import utilities from "../modules/utilities";
import IngredientsFields from "./IngredientsFields";
import {
  TextField,
  Button,
  Alert,
  Typography,
  Box,
  styled
} from "@mui/material";
import { PhotoCamera, Save } from "@mui/icons-material";

const Input = styled("input")({
  display: "none"
});

const RecipeCreateForm = () => {
  const fields = { ingredient_id: "", unit: "", amount: "" };
  const [recipe, setRecipe] = useState({});
  const [inputList, setInputList] = useState([fields]);
  const [message, setMessage] = useState();
  const [fileName, setFileName] = useState("");

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

  const handleImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    file.name && setFileName(file.name);
    const encodedFile = await utilities.imageEncoder(file);
    setRecipe({ ...recipe, image: encodedFile });
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 2 },
        boxShadow: 3,
        paddingRight: 4,
        marginTop: 2
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        data-cy="recipe-name"
        label="Recipe name"
        name="name"
        value={recipe.name}
        onChange={handleChange}
        fullWidth
        size="small"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        fullWidth
        size="small"
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
      <Typography
        data-cy="ingredients-label"
        variant="body1"
        gutterBottom
        component="div"
      >
        Ingredients
      </Typography>
      <IngredientsFields
        fields={fields}
        inputList={inputList}
        setInputList={setInputList}
      />
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
          <Button
            startIcon={<PhotoCamera />}
            variant="contained"
            component="span"
            color="success"
            style={{ margin: 10 }}
          >
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
      <Button
        data-cy="submit-btn"
        onClick={createRecipe}
        endIcon={<Save />}
        variant="contained"
        color="secondary"
        style={{ marginLeft: 26 }}
      >
        Save
      </Button>
      {message && (
        <Alert data-cy="flash-message" severity="info">
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default RecipeCreateForm;
