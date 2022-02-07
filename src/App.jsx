import React from "react";
import RecipesMainView from "./components/RecipesMainView";

const App = () => {
  return (
    <div>
      <h1 data-cy="title">Recipe Hub</h1>
      <RecipesMainView />
    </div>
  );
};

export default App;
