import React from 'react';
import './Recipe.css';

function Recipe(props) {
  // const {title, img, instructions,  _id, onDelete} = props;
  const ingredients = props.ingredients.map((ingr) => (
    <li className='text-lg pl-0' key={ingr}>{ingr}</li>
  ));

  const recipeFooter = () => {
    if (!props.oneRecipeEdit){
      return (
        <>
          <button type="button" className='  text-white bg-gray-600 p-l-0 px-4 py-2 mx-4  rounded' style={{ alignSelf: 'flex-end', marginRight: 18, marginBottom: 18 }} onClick={() => props.onDelete1(props._id)}>DELETE</button>
          {/* <button type="button" onClick={() => alert(props._id)}>ALERT</button> */}
          <button type="button" className='  text-white bg-gray-600 p-l-0 px-4 py-2 mx-4  rounded' style={{ alignSelf: 'flex-end', marginRight: 18, marginBottom: 18 }} onClick={() => props.alertwId(props._id)}>ID</button>
          <button type="button" className='  text-white bg-gray-600 p-l-0 px-4 py-2 mx-4  rounded' style={{ alignSelf: 'flex-end', marginRight: 18, marginBottom: 18 }} onClick={() => props.onEdit(props._id)}>EDIT</button>
        </>
      )
    }
    else {
      return (
        <h1>Show the form and {props.title}</h1>
      )
    }

     

  }
  return (
    <div className="recipe-card max-w-sm" >
      <div className="recipe-card-img border-4 border-gray-200 shadow">
        <img src={props.img} alt={props.title} onClick={() => props.alertOne(props._id)} />
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-title text-lg font-bold text-center uppercase" >{props.title}</h3>
        <h4 className='textl-lg font-bold text-center'>Ingredients:</h4>
        <ul className='pl-0'>
          {ingredients}
        </ul>
        <h4 className='text-lg font-bold text-center'>Instructions:</h4>
        <p className='text-lg p-2 pb-4' >{props.instructions}</p>

        {recipeFooter(props.oneRecipeEdit)}

      </div>
    </div>
  );

}


export default Recipe;
