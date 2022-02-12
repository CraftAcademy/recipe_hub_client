import React from "react";
import { Card, CardHeader, CardMedia, CardActionArea } from "@mui/material";

const RecipeCard = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 525, boxShadow: 5 }} data-cy="current-user-recipes">
      <CardActionArea>
        <CardHeader data-cy="recipe-title" title={recipe.name} />
        <CardMedia
          component="img"
          height="194"
          image="https://mui.com/static/images/cards/paella.jpg"
        />
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
