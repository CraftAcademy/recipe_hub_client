import React from "react";
import { Card, CardHeader, CardMedia, CardActionArea } from "@mui/material";

const RecipeCard = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3 }} data-cy="current-user-recipes">
      <CardActionArea>
        <CardHeader
          data-cy={`recipe-header-${recipe.index}`}
          title={recipe.name}
        />
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
