# Log of Lab10.1-recipe-react-frontend
This is the frontend for Lab10.1-recipe-api backend

## tree
~~~
C:.
│   .gitignore
│   eslint.config.js
│   package-lock.json
│   package.json
│   README.md
│   tailwind.config.js
│
├───public
│       avocado_toast.jpg
│       favicon.ico
│       index.html
│       logo192.png
│       logo512.png
│       manifest.json
│       milkshake.jpg
│       robots.txt
│       spaghetti.jpg
│       vite.svg
│
└───src
    │   api.js
    │   App.css
    │   App.js
    │   Form.css
    │   Form.js
    │   index.css
    │   index.js
    │   List.css
    │   List.js
    │   logo.svg
    │   practice-exercises.js
    │   Recipe.css
    │   Recipe.js
    │
    └───assets
            avocado_toast.jpg
            favicon.ico
            index.html
            logo192.png
            logo512.png
            manifest.json
            milkshake.jpg
            react.svg
            robots.txt
            spaghetti.jpg


C:\Users\localepsilon\Documents\2025-APRIL-Q3-PM\Lab10.1-recipe-react-frontend>
~~~
## package.json
```js
{
  "name": "lab10.1-recipe-react-frontend",
  "version": "0.2.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "tailwindcss": "^3.4.15"
  }
}

```
## code
```js
// ============= /src/Api.js
// const APIURL = '/api/v1/recipes/';
let APIURL = 'http://10.0.0.104:3999/api/v1/recipe/';
APIURL = 'http://192.168.0.105:3999/api/v1/recipe/';
APIURL = 'http://localhost:3999/api/v1/recipe/';
// const APIURL = '/api/v1/recipe'; // when using a proxy in frontend package.json file

export async function getAllData() {
  try {
    const data = await fetch(APIURL);
    if (!data.ok) {
      throw new Error(`Response status: ${data.status}`);
    }
    const result = await data.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export const getAllRecipes = async () => {
  let result = null;
  // let error = null; //is assigned a value but never used
  try{
    let data = await fetch(APIURL);
    console.log(data.status)
    result = await data.json();
    return result;
  } catch (error){
    console.log(error);
  }
}

export const createRecipeX = async newItem => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const data = await fetch(APIURL, {
    method: "post",
    body: JSON.stringify(newItem),
    headers: myHeaders,
  });
  const result = await data.json()
  console.log(result)
}
export const createRecipe =  ( async (recipe) => {
  console.log(recipe);
  console.log(JSON.stringify(recipe));
  try {
    let data = await fetch(APIURL, {
      method: 'post', headers: {"Content-Type":"application/json"},
      body: JSON.stringify(recipe),
    })
    let result = await data.json();
    return result;
  } catch (error){
    console.log(error);
  }
})

export const onEdit = async id => {
  const data = await fetch(APIURL + id);
  const result = await data.json();
  return result;
}

export const removeRecipe = ( async (id) => {
  try {
    let data = await fetch(APIURL + id, { method: 'delete'})
    let result = await data.json();
    console.log(result)
    return result;
  } catch (error){
    console.log(error)
  }
})

export const getOneRecipe = ( async (id) => {
  try {
    let data = await fetch(APIURL + id, { method: 'get'})
    let result = await data.json();
    return result;
  } catch (error){
    console.log(error)
  }
})


//  ============== ================= ================= ===========
// ============= /src/App.js
// App.js
import { useState, useEffect, useLayoutEffect } from 'react';
import * as apiCalls from './api.js';
import Form from './Form';
import List from './List'
import './App.css';


function App() {
  const [recipes, setRecipes] = useState([])
  const [formDisplay, setFormDisplay] = useState(true);
  const [oneRecipeEdit, setOneRecipeEdit] = useState(false);

  const loadRecipes = async () => {
    // const data = await apiCalls.getAllRecipes();
    try {
      const data = await apiCalls.getAllData();
      // console.log(data); // [{},{},{},{}] from mongoDb
      setRecipes(data);
    } catch (error) {
      console.log(error)
    }
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
  function toggleForm (e){
    setFormDisplay(!formDisplay);
  }
  function showForm (){
    setFormDisplay(true)
  }
  function hideForm(){
    setFormDisplay(false);
  }

  return (
    <>
      <div className="App">

        <NavBar toggleForm={toggleForm} showForm={showForm} hideForm={hideForm} />

        {formDisplay ?  <Form onSave={handleSave} /> : null}



        <h1>My Recipes List</h1>



        {oneRecipeEdit ? <Form onEdit={onEdit} /> : 'list or recipes'}
        <List recipes={recipes} onDelete1={onDelete1} alertwId={alertWithId} alertOne={alertOne} onEdit={onEdit} />
        {oneRecipeEdit}
      </div>
    </>
  )
}
function NavBar(props) {
  const localVariable = "Local Variable"
  const barJSX =
    <>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click1" onClick={e => alert(e)}>event</li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click2" onClick={e => alert(e.target)}>even.target </li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click3" onClick={e => alert(localVariable)}>{localVariable} </li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click4" onClick={showInConsole}>Show console</li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click5" onClick={toggleForm}>Toggle Form</li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click6" onClick={()=>showForm(props.formDisplay)}>Show Form</li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click7" onClick={()=>hideForm(props.formDisplay)}>Hide Form</li>

    </>

  function showForm (isShown){
    if (!isShown) return props.showForm()
  }
  function hideForm (isHidden){
    if (!isHidden) return props.hideForm()
  }
  function showInConsole(e){
    console.log(`e : ${e}`)
    console.log(e)
    console.log(`e.target : ${e.target}`)
    console.log(`e.target.value : ${e.target.value}`)
  }
  function toggleForm(){
    props.toggleForm()
  }

  const resultJSX = props.formDisplay ? <button>{props.title}</button> : <button>{props.title}</button>
  return (
    <ul className='flex flex-row justify-between px-6 py-2 rounded text-lg bg-teal-400 text-white'>
      {barJSX}
    </ul>
  )
}
export default App;

//  ============== ================= ================= ===========
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
  
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

//  ============== ================= ================= ===========
// ============= /src/Form.js
import { useState } from 'react';
import './Form.css'

function Form(props) {
  const [oneRecipe, setOneRecipe] = useState({
    title: '',
    instructions: '',
    ingredients: [''],
    img: ''
  })
  const handleChangeIng = (event) => {
    const index = Number(event.target.name.split('-')[1]);
    const ingredients = oneRecipe.ingredients.map((ingr, i) => (
      i === index ? event.target.value : ingr
    ))
    setOneRecipe((prevItem) => {
      return { ...prevItem, ingredients }
    })
  }
  const handleChange = (event) => {
    setOneRecipe((prevItem) => {
      return { ...prevItem, [event.target.name]: event.target.value }
    })
  }

  let inputs = oneRecipe.ingredients.map((ing, i) => (
    <div
      className="recipe-form-line"
      key={`ingredient-${i}`}
    >
      <label>{i + 1}.
        <input
          type="text"
          name={`ingredient-${i}`}
          value={ing}
          size={45}
          autoComplete="off"
          placeholder=" Ingredient"
          onChange={handleChangeIng} />
      </label>
    </div>
  ));
  const handleNewIngredient = (event) => {
    setOneRecipe(prevItem => {
      return { ...prevItem, ingredients: [...prevItem.ingredients, ""] }
    })
  }

  const handleAlert = (event) => {
    console.log(oneRecipe)
    // alert(event.target)
  }
  const onSave = (event) => {
    event.preventDefault();
    console.log(oneRecipe);
    props.onSave({ ...oneRecipe })
    setOneRecipe({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    })
  }
  return (
    <>
      <div className="recipe-form-container">
      <button onClick={e => handleAlert(e)}>ALERT</button>
        <form className='recipe-form' onSubmit={onSave} >
          {/* <form className='recipe-form' onClick={(e)=> handleAlert(e)}> */}
          {/* <form className='recipe-form' onSubmit={() => alert()}> */}
          <button
            type="button"
            className="close-button"
          // onClick={onClose}
          >
            X
          </button>
          <div className='recipe-form-line'>
            <label htmlFor='recipe-title-input'>Title</label>
            <input
              id='recipe-title-input'
              key='title'
              name='title'
              type='text'
              value={oneRecipe.title}
              size={42}
              autoComplete="off"
              onChange={handleChange} />
          </div>
          <label
            htmlFor='recipe-instructions-input'
            style={{ marginTop: '5px' }}
          >
            Instructions
          </label>
          <textarea
            key='instructions'
            id='recipe-instructions-input'
            type='Instructions'
            name='instructions'
            rows='8'
            cols='50'
            autoComplete='off'
            value={oneRecipe.instructions}
            onChange={handleChange} />
          {inputs}
          <button
            type="button"
            onClick={handleNewIngredient}
            className="buttons"
          >
            +
          </button>
          <div className='recipe-form-line'>
            <label htmlFor='recipe-img-input'>Image Url</label>
            <input
              id='recipe-img-input'
              type='text'
              placeholder=''
              name='img'
              value={oneRecipe.img}
              size={36}
              autoComplete='off'
              onChange={handleChange} />
          </div>
          <button
            type="submit"
            className="buttons"
            style={{ alignSelf: 'flex-end', marginRight: 0 }}
          >
            SAVE
          </button>
        </form>

      </div>
    </>
  )
}
export default Form;

//  ============== ================= ================= ===========
.recipe-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  border: 7px solid #2c3e50;
}

.recipe-form input[type=text] {
    padding: 5px 8px;
    box-sizing: border-box;
}

.recipe-form-line {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5px;
}

.recipe-form-line input {
  margin-left: 15px;
}

.buttons {
  color: white;
  background-color: #2c3e50;
  border-radius: 6px;
  padding: 0 10px 1px 10px;
  margin: 8px 0;
  align-self: flex-end;
  font-size: 1.1em;
}

.close-button {
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  font-size: 0.9em;
  color: #777;
  text-shadow: 0 1px 0 #fff;
  align-self: flex-end;
}

.recipe-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

//  ============== ================= ================= ===========
// ============= /src/List.js
import React from 'react';
import Recipe from './Recipe';
import './List.css';

function List(props) {
  // console.log(props.recipes?.length); // props.recipe.length = 7
  const data = props.recipes?.map(recipe => (
    <Recipe key={recipe.id || recipe._id} {...recipe} onDelete1={props.onDelete1} onEdit={props.onEdit} alertwId={props.alertwId} alertOne={props.alertOne} />
  ));
  return (
    <div className='recipe-list'>
      {data}
    </div>
  )
}
export default List;
//  ============== ================= ================= ===========
.recipe-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

@media (max-width: 580px) {
  .recipe-list {
    display: block;
  }
}

//  ============== ================= ================= ===========
// ============= /src/Recipe.js
import React from 'react';
import './Recipe.css';

function Recipe(props) {
  // const {title, img, instructions,  _id, onDelete} = props;
  const ingredients = props.ingredients.map((ingr) => (
    <li key={ingr}>{ingr}</li>
  ));

  const recipeFooter = (flag) => {
    if (!flag) {
      return (
        <>
          <button type="button" onClick={() => props.onDelete1(props._id)}>DELETE</button>
          {/* <button type="button" onClick={() => alert(props._id)}>ALERT</button> */}
          <button type="button" onClick={() => props.alertwId(props._id)}>ALERT WITH ID</button>
        </>
      )
    } else {
      return (
        <>
          <button type="button" onClick={() => props.onEdit(props._id)}>EDIT RECIPE</button>
          <button type="button" onClick={() => props.onEdit(props._id)}>CANCEL</button>
        </>
      )
    }

  }
  return (
    <div className="recipe-card" >
      <div className="recipe-card-img">
        <img src={props.img} alt={props.title} onClick={() => props.alertOne(props._id)} />
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-title">{props.title}</h3>
        <h4>Ingredients:</h4>
        <ul>
          {ingredients}
        </ul>
        <h4>Instructions:</h4>
        <p>{props.instructions}</p>

        {recipeFooter(props.oneRecipeEdit)}

      </div>
    </div>
  );

}


export default Recipe;

//  ============== ================= ================= ===========
.recipe-card {
  width: 31%;
  min-width: 240px;
  margin: 1%;
  border: 1px solid rgba(160,160,160,0.2);
  background: white;
  border-radius: 0 0 2px 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
}


.recipe-card-content {
  padding: 16px;
}


.recipe-card-image {
  overflow: hidden;
  height: 50%;
}

.recipe-card img {
  width: 100%;
  max-height: 250px;
}

.recipe-title {
  margin: 0;
}
//  ============== ================= ================= ===========
// ============= /src/App.js
//  ============== ================= ================= ===========


```
## 11.2.2024 mdy
1. Start  cleaning. Get rid of vite files and refactor class components into function components
1. npm update before running npm install
1. This is the frontend of Lab10.1-recipe-api backend. 

## 8.23.2024 m.d.y

1. vite-react branch cors issues unresolved
1. lab10.1-recipe-react-frontend branch main externally installed
1. npx create-react-app
1. But before
```sh
source nvs.sh
nvs
```
1. selection b: node 20.11.0
1. npm version: 10.2.4
1. package*.* copied to Lab10.1-recipe-react-frontend
1. 

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
