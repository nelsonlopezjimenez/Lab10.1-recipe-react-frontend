// App.js
import { useState, useEffect, useLayoutEffect } from 'react';
import * as apiCalls from './api.js';
import Form from './Form';
import List from './List'
// import './App.css';


function App() {
  const [recipes, setRecipes] = useState([])
  const [formDisplay, setFormDisplay] = useState(true);
  const [oneRecipeEdit, setOneRecipeEdit] = useState(true);
  const [toggleRecipe, setToggleRecipe] = useState(false)

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

  const remoteVariable = () => {
    // To be used also to toggleOneRecipe
    return alert("This is from App component");
  }

  return (
    <>
      <div className="App">

        <NavBar toggleForm={toggleForm} showForm={showForm} hideForm={hideForm} remoteVariable={remoteVariable}/>

        <h1 className='text-center text-[1.5rem] font-bold md:text-[2rem]'>My Recipes List</h1>

        {formDisplay ?  <Form onSave={handleSave} /> : null}



        {oneRecipeEdit ? <Form onEdit={onEdit} /> : null}
        <List recipes={recipes} onDelete1={onDelete1} alertwId={alertWithId} alertOne={alertOne} onEdit={onEdit} />

        {oneRecipeEdit}
        
      </div>
    </>
  )
}
function NavBar(props) {
  const localVariable = "Local Variable in NavBar component"
  const barJSX =
    <>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click1" onClick={e => alert(e)}>event</li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click2" onClick={e => alert(e.target)}>even.target </li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click3" onClick={e => alert(localVariable)}>localVariable </li>
      <li className="border-4-blue rounded hover:bg-blue-600 bg-blue-200" key="click33" onClick={props.remoteVariable}>props.remoteVariable </li>
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
    <ul className='flex flex-col justify-between px-6 py-2 rounded text-lg bg-teal-400 text-white sm:flex-row'>
      {barJSX}
    </ul>
  )
}
export default App;
