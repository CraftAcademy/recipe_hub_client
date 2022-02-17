import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  colors,
  CardActionArea,
  Collapse,
  IconButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 345, boxShadow: 3 }}
      data-cy={`recipe-card-${recipe.index}`}
    >
      <CardActionArea>
        <CardHeader
          onClick={() => navigate(`/recipes/${recipe.id}`)}
          data-cy={`recipe-header-${recipe.index}`}
          avatar={<Avatar sx={{ bgcolor: colors.red[500] }}>R</Avatar>}
          title={recipe.name}
          subheader={recipe.created_at}
        />
        <CardMedia
          component="img"
          height="194"
          image={recipe.image}
        />
        <ExpandMore
          data-cy={`recipe-expand-${recipe.index}`}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              data-cy={`recipe-description-${recipe.index}`}
            >
              {recipe.instructions}
            </Typography>
          </CardContent>
        </Collapse>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
