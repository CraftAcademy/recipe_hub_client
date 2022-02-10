import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import RecipeCreateForm from "./RecipeCreateForm";

const MyRecipes = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm ? (
        <div>
          <Button data-cy="hide-recipe" onClick={() => setShowForm(!showForm)}>
            Hide create form
          </Button>
          <RecipeCreateForm />
        </div>
      ) : (
        <Button data-cy="create-recipe" onClick={() => setShowForm(!showForm)}>
          Create recipe
        </Button>
      )}
      <Typography>Here will be my recipes</Typography>
    </>
  );
};

export default MyRecipes;
