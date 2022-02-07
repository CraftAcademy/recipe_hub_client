import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  colors
} from "@mui/material";

const RecipeCard = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
      <CardHeader
        data-cy={`recipe-header-${recipe.index}`}
        avatar={<Avatar sx={{ bgcolor: colors.red[500] }}>R</Avatar>}
        title={recipe.title}
        subheader={recipe.created_at}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://mui.com/static/images/cards/paella.jpg"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          data-cy={`recipe-description-${recipe.index}`}
        >
          {recipe.instructions}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
