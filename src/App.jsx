import React from "react";
import RecipesMainView from "./components/RecipesMainView";
import RecipeFullView from "./components/RecipeFullView";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  return (
    <React.StrictMode>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path="/" element={<RecipesMainView />} />
          <Route path="recipes/:id" element={<RecipeFullView />} />
        </Routes>
      </Container>
    </React.StrictMode>
  );
};

export default App;
