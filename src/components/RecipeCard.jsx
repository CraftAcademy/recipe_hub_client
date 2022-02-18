import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Recipes from "../modules/Recipes";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  IconButton,
  Typography,
  Avatar,
  colors
} from "@mui/material";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state);

  const forkRecipe = async () => {
    const params = { id: recipe.id, fork: true };
    const response = await Recipes.create(params);
    if (response.forked) {
      navigate("my-recipes");
      dispatch({ type: "SET_FLASH_MESSAGE", payload: response.message });
      setTimeout(() => {
        dispatch({ type: "SET_FLASH_MESSAGE", payload: "" });
      }, 3500);
    }
  };

  return (
    <Card
      sx={{ maxWidth: 345, boxShadow: 3 }}
      data-cy={`recipe-card-${recipe.index}`}
    >
      <CardActionArea onClick={() => navigate(`/recipes/${recipe.id}`)}>
        <CardHeader
          data-cy={`recipe-header-${recipe.index}`}
          avatar={<Avatar sx={{ bgcolor: colors.red[500] }}>R</Avatar>}
          title={recipe.name}
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
      {currentUser && (
        <CardActions disableSpacing>
          <IconButton
            data-cy={`recipe-fork-btn-${recipe.index}`}
            onClick={forkRecipe}
          >
            <DinnerDiningIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default RecipeCard;
