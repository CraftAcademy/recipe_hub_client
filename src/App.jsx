import React from "react";
import RecipesMainView from "./components/RecipesMainView";
import RecipeFullView from "./components/RecipeFullView";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import RegistrationForm from "./components/RegistrationForm";
import MyRecipes from "./components/MyRecipes";
import RecipeCreateForm from "./components/RecipeCreateForm";

const App = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path="/" element={<RecipesMainView />} />
          <Route path="recipes/:id" element={<RecipeFullView />} />
          <Route path="signup" element={<RegistrationForm />} />
          <Route path="my-recipes" element={<MyRecipes />} />
          <Route path="recipes/:id/edit" element={<RecipeCreateForm />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
};

export default App;
