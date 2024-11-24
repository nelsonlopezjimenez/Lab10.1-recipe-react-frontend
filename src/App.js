// App.js
import { useState, useEffect } from 'react';
import * as apiCalls from './api.js';
import Form from './Form';
import List from './List';
import EditForm from './EditForm.js';

function App() {
  const [recipes, setRecipes] = useState([])
  const [formDisplay, setFormDisplay] = useState(false);
  const [oneRecipeEdit, setOneRecipeEdit] = useState(false);
  const [toggleOne, setToggleOne ] = useState(false);
  const [oneRecipe, setOneRecipe] = useState({
    title: '',
    instructions: '',
    ingredients: [''],
    img: ''
  })

  const loadRecipes = async () => {
    try {
      const data = await apiCalls.getAllData();
      setRecipes(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSave = async (recipe) => {
    console.log('App, handleSave : ', recipe);
    try {
      const newRecipe = await apiCalls.createRecipe(recipe);
      setRecipes([...recipes, newRecipe]);
      setFormDisplay(!formDisplay);
    } catch (error) {
      console.log(error)
    }
  }

  const onDelete = async (id) => {
    await apiCalls.removeRecipe(id);
    const filteredRecipes = recipes.filter((recipe) => recipe._id !== id);
    setRecipes(filteredRecipes);
  }
  const alertWithId = async (id) => {
    // alert(id);
    console.log(`Recipe id : ${id}`)
  }
  const alertOne = async (id) => {
    const filteredRecipes = recipes.filter((recipe) => recipe._id === id);
    setToggleOne(!toggleOne);
    console.log(filteredRecipes)
    setRecipes(filteredRecipes);
    if (toggleOne) {
      loadRecipes();
    }
  }
  const onEdit = async id => {
    const toEdit = recipes.filter(item => item._id === id);
    // const data = await apiCalls.onEdit(id);
    console.log(toEdit)
    setOneRecipeEdit(true);
    setOneRecipe(toEdit[0]);
    setRecipes(toEdit)

  }

  useEffect(() => {
    loadRecipes();
  }, []);

  // useEffect(() => {
  //   apiCalls.getAllRecipes().then(response => setRecipes(response));
  // }, []);

  // useEffect(() => {
  //   getAllRecipes().then(response => setRecipes(response));
  // }, []);

  function toggleForm(e) {
    setFormDisplay(!formDisplay);
  }
  function showForm() {
    setFormDisplay(true)
  }
  function hideForm() {
    setFormDisplay(false);
  }

  function onSubmitPatch() {
    setOneRecipeEdit(!oneRecipeEdit);
    hideForm();
    loadRecipes();
    console.log(`onSubmitPatch : `, recipes)
  }
  
  return (
    <>
      <div className="App">

        <NavBar toggleForm={toggleForm} showForm={showForm} hideForm={hideForm} />

        <h1 className='text-center text-[2rem] font-bold'>My Recipes List</h1>

        {formDisplay ? <Form onSave={handleSave} /> : null}

        {oneRecipeEdit ?
          <div className='flex flex-row'>
            <List recipes={recipes} onDelete1={onDelete} alertwId={alertWithId} alertOne={alertOne} onEdit={onEdit} oneRecipeEdit={onemptied} />
            <EditForm oneRecipe={oneRecipe} flag={true} onSubmit={onSubmitPatch} />
          </div>
          :
          <List recipes={recipes} onDelete1={onDelete} alertwId={alertWithId} alertOne={alertOne} onEdit={onEdit} oneRecipeEdit={onemptied} />
        }

      </div>
    </>
  )
}
function NavBar(props) {
  const localVariable = "Local Variable"
  const barJSX =
    <>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-400" key="click1" onClick={e => alert(e)}>event</li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-400" key="click2" onClick={e => alert(e.target)}>even.target </li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-400" key="click3" onClick={e => alert(localVariable)}>{localVariable} </li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-400" key="click4" onClick={showInConsole}>Show console</li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-400" key="click5" onClick={toggleForm}>Toggle Form</li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-400" key="click6" onClick={() => showForm(props.formDisplay)}>Show Form</li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-400" key="click7" onClick={() => hideForm(props.formDisplay)}>Hide Form</li>

    </>

  function showForm(isShown) {
    if (!isShown) return props.showForm()
  }
  function hideForm(isHidden) {
    if (!isHidden) return props.hideForm()
  }
  function showInConsole(e) {
    console.log(`e : ${e}`)
    console.log(e)
    console.log(`e.target : ${e.target}`)
    console.log(`e.target.value : ${e.target.value}`)
  }
  function toggleForm() {
    props.toggleForm()
  }
  return (
    <ul className='flex flex-col justify-between px-6 py-2 rounded text-lg bg-teal-400 text-white sm:flex-row'>
      {barJSX}
    </ul>
  )
}
export default App;
