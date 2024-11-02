// App.js
import { useState, useEffect } from 'react';
import * as apiCalls from './api.js';
import Form from './Form';
import List from './List'
import './App.css';


function App() {
  const [recipes, setRecipes] = useState([])
  const [oneRecipeEdit, setOneRecipeEdit] = useState(false);

  const loadRecipes = async () => {
    // const data = await apiCalls.getAllRecipes();
    const data = await apiCalls.getAllData();
    // console.log(data); // [{},{},{},{}] from mongoDb
    setRecipes(data);
  }

  const handleSaveX = item => (alert());

  const handleSave = async (recipe) => {
    console.log('App, handleSave : ', recipe);
    try {
      const newRecipe = await apiCalls.createRecipe(recipe);
      setRecipes([...recipes, newRecipe]);
    } catch (error) {
      console.log(error)
    }
  }

  const onDelete1 = async (id) => {
    await apiCalls.removeRecipe(id);
    const filteredRecipes = recipes.filter((recipe) => recipe._id !== id);
    setRecipes(filteredRecipes);
  }
  const alertWithId = async (id) => {
    alert(id);
  }
  const alertOne = async (id) => {
    const filteredRecipes = recipes.filter((recipe) => recipe._id === id);
    console.log(filteredRecipes)
    setRecipes(filteredRecipes)
  }
  const onEdit = async id => {
    const toEdit = recipes.filter(item => item._id === id);
    // const data = await apiCalls.onEdit(id);
    console.log(toEdit)
    // console.log(data);
    return toEdit[0]
  }

  useEffect(() => {
    loadRecipes();
    // console.log(recipes);// []
  }, []);

  // useEffect(() => {
  //   apiCalls.getAllRecipes().then(response => setRecipes(response));
  // }, []);

  // useEffect(() => {
  //   getAllRecipes().then(response => setRecipes(response));
  // }, []);

  return (
    <>
      <div className="App">
        <h1>My Recipes List</h1>
        <Form onSave={handleSave} />

        {oneRecipeEdit ? <Form onEdit={onEdit} /> : 'list or recipes'}
        <List recipes={recipes} onDelete1={onDelete1} alertwId={alertWithId} alertOne={alertOne} onEdit={onEdit} />
        {oneRecipeEdit}
      </div>
    </>
  )
}

export default App;
