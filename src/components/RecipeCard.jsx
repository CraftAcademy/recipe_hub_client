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
        avatar={
          <Avatar sx={{ bgcolor: colors.red[500] }}>
            R
          </Avatar>
        }
        title={recipe.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://mui.com/static/images/cards/paella.jpg"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.instructions}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
