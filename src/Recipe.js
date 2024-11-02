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
