import { useState } from "react";

const RecipeFormIngredientInput = ({ focusOnInstructions, ingredients, setIngredients }) => {
  const [ newIngredient, setNewIngredient ] = useState("");

  // hacky, but why not?
  const forceContainerScroll = () =>
    document.getElementsByClassName("recipe-form-ingredient-container")[0].scrollTop = 1000000;


  const resetNewIngredient = () => setNewIngredient("");

  const focusOnNewIngredient = () => document.getElementById("new-ingredient").focus();

  const getNewIngredientArray = () => {
    const newIngredientArray = [];
    
    Array.from(document.getElementsByClassName("existing-ingredient")).forEach(ingredient =>
      ingredient !== undefined && ingredient.value.length !== 0 && 
      newIngredientArray.push(ingredient.value));

    newIngredient.length > 0 && newIngredientArray.push(newIngredient);
    
    return newIngredientArray;
  }

  const handleIngredientChange = e => {
    setIngredients(getNewIngredientArray());
    resetNewIngredient();
    forceContainerScroll();
  };

  const handleKeyDown = e => {
    if (["Enter", "Tab"].includes(e.key) && !e.shiftKey){
      e.preventDefault();

      if (e.target.value.length > 0){
        handleIngredientChange(e);
        focusOnNewIngredient();
        forceContainerScroll();
      }
      else {
        focusOnInstructions();
      }
    }
  }
  
  return (
    <div className="recipe-form-ingredient-container">
      <label htmlFor="new-ingredient">Ingredients: </label>
      <ol className="ingredient-input-list">
        {
          ingredients?.map((ingredient, index) => (
            <li>
              <input
                className="existing-ingredient"
                id={`ingredient-${index}`}
                key={`ingredient-${index}`}
                // onBlur={e => handleIngredientChange(e)}
                onChange={e => handleIngredientChange(e)}
                type="text"
                value={ingredient}
              />
            </li>
          ))
        }
        <li>
          <input 
            id="new-ingredient"
            key="new-ingredient"
            name="new-ingredient"
            onBlur={e => handleIngredientChange(e)}
            onChange={e => setNewIngredient(e.target.value)}
            onFocus={e => forceContainerScroll()}
            onKeyDown={e => handleKeyDown(e)}
            type="text"
            value={newIngredient} 
          />
        </li>
      </ol>
    </div>
  );
};

export default RecipeFormIngredientInput