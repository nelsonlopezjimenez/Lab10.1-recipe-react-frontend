import React, { useEffect, useState } from 'react';

import './style/style.scss';

import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";

import { getRecipes } from './api';

const App = () => {
  const [ formIsToggled, setFormIsToggled ]   = useState(false);
  const [ recipes, setRecipes ]               = useState([]);
  const [ lastId, setLastId ]                 = useState();


  useEffect(() => {
    getRecipes().then(response => setRecipes(response));
  }, []);

  return (
    <div className="App">
      <Header 
        formIsToggled={formIsToggled}
        setFormIsToggled={setFormIsToggled}
      />

      <RecipeForm
        isToggled={formIsToggled}
        lastId={lastId}
        recipes={recipes}
        setIsToggled={setFormIsToggled}
        setLastId={setLastId}
        setRecipes={setRecipes}
      />

      <RecipeList
        formIsToggled={formIsToggled}
        lastId={lastId}
        recipes={recipes}
        setFormIsToggled={setFormIsToggled}
        setRecipes={setRecipes}
      />

      <Footer 
        formIsToggled={formIsToggled}
      />
    </div>
  );
};

export default App;
