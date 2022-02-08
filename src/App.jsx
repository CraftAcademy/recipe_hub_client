import React from "react";
import RecipesMainView from "./components/RecipesMainView";
import RecipeFullView from "./components/RecipeFullView";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import RegistrationForm from "./components/RegistrationForm";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path="/" element={<RecipesMainView />} />
          <Route path="recipes/:id" element={<RecipeFullView />} />
          <Route path="signup" element={<RegistrationForm />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
};

export default App;
