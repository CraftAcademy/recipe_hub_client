import React from "react";
import RecipesMainView from "./components/RecipesMainView";
import RecipeFullView from "./components/RecipeFullView";
import { Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const App = () => {
  return (
    <Container>
      <Typography data-cy="title" variant="h2" component="div" gutterBottom>
        Recipe Hub
      </Typography>
      <Routes>
        <Route path="/" element={<RecipesMainView />} />
        <Route path="recipes/:id" element={<RecipeFullView />} />
      </Routes>
    </Container>
  );
};

export default App;
