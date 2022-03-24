import React, { useState, useEffect } from 'react';
import Form from './Form';
import List from './List';
import * as apiCalls from './api';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    componentDidMount();
  }, [])

  useEffect(() => {
    loadRecipes();
  }, [recipes])

  const componentDidMount = () => {
    console.log("App this.props: ", props)
    loadRecipes();
  }

  const loadRecipes = async () => {
    const recipes = await apiCalls.getRecipes();
    if (recipes.length === 0) {
      console.log("No recipes found in the database. Please use the form to add your own recipe")
    } else {
      console.log("App loadRecipes: ", recipes);
    }
    setRecipes(recipes);
  }

  const handleSave = async (recipe) => {
    console.log("App, handleSave : ", recipe)
    const newRecipe = await apiCalls.createRecipe(recipe);
    setRecipes({ recipes: [...recipes, newRecipe] });
  }

  const onDelete = async (id) => {
    await apiCalls.removeRecipe(id);
    const recipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes({ recipes });
  }

  return (
    <div className="App">
      <Form
        onSave={handleSave}
      />
      <List recipes={recipes} onDelete={onDelete} />
    </div>
  );
}

export default App;
