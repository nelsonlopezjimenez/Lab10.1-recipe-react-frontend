//change the imports to allow for use of hooks
import React, { useState, useEffect } from "react";
import Form from "./Form";
import List from "./List";
import * as apiCalls from "./api";
import "./App.css";

//create the functional component rather than class based
function App() {
  const [recipes, setRecipes] = useState([]);

  function useEffect() {
    loadRecipes();
  }

  async function loadRecipes() {
    const recipes = await apiCalls.getRecipes();
    console.log("App loadRecipes: ", recipes);
    setRecipes({ recipes });
  }

  async function handleSave(recipe) {
    console.log("App, handleSave : ", recipe);
    const newRecipe = await apiCalls.createRecipe(recipe);
    setRecipes([...recipes, newRecipe]);
  }

  async function onDelete(id) {
    await apiCalls.deleteRecipe(recipes, id);
    const recipes = recipes.filter((recipe) => recipe._id !== id);
    setRecipes({ recipes });
  }

  //this is the conditional statement for if the recipes array is empty
  if (recipes.length > 0) {
    return (
      <div className="App">
        <Form onSave={handleSave} onDelete={onDelete} />
        <List recipes={recipes} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Form onSave={handleSave} onDelete={onDelete} />
        <h1>
          No recipes found in the database. Please use the form to add your own
          recipe
        </h1>
      </div>
    );
  }
}

export default App;
