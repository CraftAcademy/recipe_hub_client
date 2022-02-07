import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  colors,
  CardActionArea
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 345, boxShadow: 3 }}
      data-cy={`recipe-card-${recipe.index}`}
    >
      <CardActionArea onClick={() => navigate(`/recipes/${recipe.id}`)}>
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
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
