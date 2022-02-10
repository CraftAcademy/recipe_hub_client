import React from "react";
import { TextField } from "@mui/material";

const RecipeCreateForm = () => {
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Recipe name"
        variant="outlined"
        data-cy="name-input"
      />
      <div>
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          data-cy="ingredient-name-input"
        />
        <TextField id="outlined-basic" label="Unit" variant="outlined" />
        <TextField id="outlined-basic" label="Name" variant="outlined" />
      </div>
      <TextField
        id="outlined-basic"
        label="Instructions"
        variant="outlined"
        data-cy="instructions"
      />
    </div>
  );
};

export default RecipeCreateForm;
