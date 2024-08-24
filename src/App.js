// App.js
import { useState, useEffect } from 'react';
import * as apiCalls from './api.js';
import './Form.css'
import './App.css';
import './List.css'
import './Recipe.css'



function Form (props) {
  const [oneRecipe, setOneRecipe] = useState({
    title:'',
    instructions:'',
    ingredients: [''],
    img:''
  })
  const handleChangeIng = (event) => {
    const index = Number(event.target.name.split('-')[1]);
    const ingredients = oneRecipe.ingredients.map( (ingr, i) => {
      console.log(event.target.name + " ===== " + event.target.value)
      return i === index  ? event.target.value: ingr
    })
    setOneRecipe((prevItem) => {
      return {...prevItem, ingredients}
    })
  }
    // =========== error in mapping ingredients
  const handleChangeX = (event) => {
    setOneRecipe({[event.target.name]: event.target.value})
  }
  const handleChange = (event) => {
    console.log(event.target.name + " -----  " + event.target.value);
    // console.log(event.target)
    setOneRecipe((prevItem) => {
      return {...prevItem, [event.target.name]: event.target.value }
    })
  }

  let inputs = oneRecipe.ingredients.map((ing, i) => (
    <div
      className="recipe-form-line"
      key={`ingredient-${i}`}
    >
      <label>{i+1}.
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
  const handleNewIngredient= (event) => {
    setOneRecipe( prevItem => {
      return {...prevItem, ingredients: [...prevItem.ingredients, ""]}
    })
  }

  const handleSubmit= (event) => {
    event.preventdefault();
    console.log(event.target.name)
    return null;
  }
  return (
    <>
       <div className="recipe-form-container">
        <form className='recipe-form' onSubmit={handleSubmit}>
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
              onChange={handleChange}/>
          </div>
          <label
            htmlFor='recipe-instructions-input'
            style={{marginTop: '5px'}}
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
            onChange={handleChange}/>
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
            style={{alignSelf: 'flex-end', marginRight: 0}}
          >
            SAVE
          </button>
        </form>
      </div>
    </>
  )
}
function List (props){
  console.log(props.recipes.length); // props.recipe.length = 7
  const data = props.recipes.map( recipe => (
    <Recipe key={recipe._id} {...recipe} onDelete1={props.onDelete1} alertwId={props.alertwId} alertOne={props.alertOne}/>
  ));
  return(
    <div className='recipe-list'>
       {data}
    </div>
  )
}
function Recipe(props) {
    // const {title, img, instructions,  _id, onDelete} = props;
    const ingredients = props.ingredients.map((ingr) => (
      <li key={ingr}>{ingr}</li>
    ));
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
          <button type="button" onClick={() => props.onDelete1(props._id)}>DELETE</button>
          {/* <button type="button" onClick={() => alert(props._id)}>ALERT</button> */}
          <button type="button" onClick={() => props.alertwId(props._id)}>ALERT WITH ID</button>
        </div>
      </div>
    );

}

function App() {
  const [recipes, setRecipes] = useState([])
  const [oneRecipe, setOneRecipe ] = useState([]);

  const loadRecipes = async () => {
    const data = await apiCalls.getAllRecipes();
    // console.log(data); // [{},{},{},{}] from mongoDb
    setRecipes( data );
  }

  const handleSave = async (recipe) =>  {
    console.log('App, handleSave : ', recipe);
    const newRecipe = await apiCalls.createRecipe(recipe);
    setRecipes([...recipes, newRecipe]);
  }

  const onDelete1 = async (id) => {
    await apiCalls.removeRecipe(id);
    const filteredRecipes = recipes.filter((recipe) => recipe._id !== id);
    setRecipes(filteredRecipes);
  }
  const alertWithId = async (id) => {
    alert(`<h1>${id}</h1>`);
  }
  const alertOne = async (id) => {
    const filteredRecipes = recipes.filter((recipe) => recipe._id === id);
    console.log(filteredRecipes)
    setRecipes(filteredRecipes)
  }


  useEffect ( () => {
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
        <Form  handleSubmit={handleSave}/>
       
        {oneRecipe? "one recipe": 'list or recipes'}
        <List recipes={recipes} onDelete1={onDelete1} alertwId={alertWithId} alertOne={alertOne} />
        {oneRecipe}
      </div>
    </>
  )
}
 
export default App;
