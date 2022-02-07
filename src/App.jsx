import React from "react";
import RecipesMainView from "./components/RecipesMainView";
import RecipeFullView from "./components/RecipeFullView";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1 data-cy="title">Recipe Hub</h1>
      <Routes>
        <Route path="/" element={<RecipesMainView />} />
        <Route path="recipes/:id" element={<RecipeFullView />} />
      </Routes>
    </div>
  );
};

export default App;
