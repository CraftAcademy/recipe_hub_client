import {
  styled,
  Typography,
  Grid,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Table
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Recipes from "../modules/Recipes";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

const RecipeFullView = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  const fetchRecipe = async () => {
    const data = await Recipes.show(id);
    setRecipe(data.recipe);
  };
  useEffect(() => {
    fetchRecipe();
  }, []);

  const ingredientsList = recipe.ingredients?.map((ingredient, index) => {
    ingredient.index = index + 1;
    return (
      <TableRow
        key={ingredient.index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell
          component="th"
          scope="row"
          data-cy={`ingredient-name-${ingredient.index}`}
        >
          {ingredient.name}
        </TableCell>
        <TableCell
          align="right"
          data-cy={`ingredient-quantity-${ingredient.index}`}
        >
          {`${ingredient.amount} ${ingredient.unit}`}
        </TableCell>
      </TableRow>
    );
  });
  return (
    <Paper
      sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1, boxShadow: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Img
            src="https://mui.com/static/images/cards/paella.jpg"
            loading="lazy"
          />
        </Grid>
        <Grid item>
          <Typography gutterBottom variant="h5" data-cy="recipe-title">
            {recipe.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Table sx={{ width: 230 }}>
            <TableBody data-cy="ingredients-list">{ingredientsList}</TableBody>
          </Table>
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
