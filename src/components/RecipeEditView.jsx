import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Recipes from "../modules/Recipes";
import utilities from "../modules/utilities";
import IngredientsFields from "./IngredientsFields";
import {
  Container,
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  styled
} from "@mui/material";
import {
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon
} from "@mui/icons-material";

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
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  useEffect(() => {
    id && fetchRecipe();
  }, []);

  return (
    <Container style={{ margin: "auto", width: "50%" }}>
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
          name="name"
          value={recipe.name}
          onChange={handleChange}
          label="Recipe name"
          fullWidth
          size="small"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          data-cy="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          fullWidth
          size="small"
          label="Instructions"
          multiline
          rows={4}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
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
              startIcon={<PhotoCameraIcon />}
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
          onClick={updateRecipe}
          endIcon={<SaveIcon />}
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
    </Container>
  );
};

export default RecipeCreateForm;
