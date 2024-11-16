import React from 'react';
import './Recipe.css';

function Recipe(props) {
  // const {title, img, instructions,  _id, onDelete} = props;
  const ingredients = props.ingredients.map((ingr) => (
    <li className='' key={ingr}>{ingr}</li>
  ));

  const recipeFooter = (flag) => {
    if (!flag) {
      return (
        <>
          <button className='w-1/3 buttons text-white bg-gray-600 p-l-0 px-4 py-0 mx-4  rounded border-6 border-white text-sm' type="button" onClick={() => props.onDelete1(props._id)}>DELETE</button>
          {/* <button type="button" onClick={() => alert(props._id)}>ALERT</button> */}
          <button className='w-1/3 buttons text-white bg-gray-600 p-l-0 px-4 py-0 mx-4  rounded border-6 border-white text-sm' type="button" onClick={() => props.alertwId(props._id)}>ALERT WITH ID</button>
        </>
      )
    } else {
      return (
        <>
          <button  className='w-1/3 buttons text-white bg-gray-600 p-l-0 px-4 py-0 mx-4  rounded border-6 border-white text-sm'type="button" onClick={() => props.onEdit(props._id)}>EDIT RECIPE</button>
          <button className='w-1/3 buttons text-white bg-gray-600 p-l-0 px-4 py-0 mx-4  rounded border-6 border-white text-sm' type="button" onClick={() => props.onEdit(props._id)}>CANCEL</button>
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
        <h3 className="recipe-title text-lg font-bold text-center uppercase">{props.title}</h3>
        <h4 className="recipe-title text-lg font-bold text-center ">Ingredients:</h4>
        <ul>
          {ingredients}
        </ul>
        <h4  className="recipe-title text-lg font-bold text-center ">Instructions:</h4>
        <p>{props.instructions}</p>
        <div className='flex '>
          {recipeFooter(props.oneRecipeEdit)}
        </div>

      </div>
    </div>
  );

}


export default Recipe;
