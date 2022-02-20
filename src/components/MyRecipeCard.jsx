import React from "react";
import { Card, CardHeader, CardMedia, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 525, boxShadow: 5 }} data-cy={`recipe-card-${recipe.index}`}>
      <CardActionArea onClick={() => navigate(`/recipes/${recipe.id}`)}>
        <CardHeader data-cy={`recipe-name-${recipe.index}`} title={recipe.name} />
        <CardMedia
          component="img"
          height="194"
          image={recipe.image}
        />
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
