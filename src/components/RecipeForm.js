import { useState } from "react";
import { MdCancel } from "react-icons/md";

import RecipeFormControls from './RecipeFormControls';
import RecipeFormIngredientInput from './RecipeFormIngredientInput';

// TODO: probably need to add more props
const RecipeForm = ({ isToggled, setIsToggled }) => {
  const [ instructions, setInstructions ] = useState("");
  const [ ingredients, setIngredients ]   = useState([]);
  const [ img, setImg ]                   = useState("");
  const [ title, setTitle ]               = useState("");

  const focusOnInstructions = () => document.getElementById("recipe-instructions-input").focus();

  const handleSubmit = e => {

  };

  const resetAllStates = () => {
    setInstructions("");
    setIngredients([]);
    setImg("");
    setTitle("");
  };

  // TODO: Make some way to reset the form when blurred

  // TODO: Hide labels in favor of placeholders

  return (
    <div className={`recipe-form-container ${isToggled ? "toggled" : ""}`}>
      {/* <div className="recipe-form-close">
        <span 
          className="recipe-form-close-link"
          onClick={e => setIsToggled(!isToggled)}
        >
          <MdCancel />
        </span>
      </div> */}

      <form 
        className="recipe-form"
        onSubmit={handleSubmit}
      >
      
        <div className="recipe-form-title-container recipe-form-input-container">
          <label htmlFor="recipe-title-input">Title:</label>
          <p>
            <input
              autoComplete="off"
              id="recipe-title-input"
              key="title"
              name="recipe-title-input"
              onChange={(e) => setTitle(e.target.value)} 
              type="text"
              value={title} 
            />
          </p>
        </div>


        <RecipeFormIngredientInput
          focusOnInstructions={focusOnInstructions}
          ingredients={ingredients}
          setIngredients={setIngredients}
        />

        <div className="recipe-form-image-container">
          <label htmlFor="recipe-image-input">Image:</label>
          <p>
            <input 
              id="recipe-image-input"
              key="recipe-image-input"
              name="recipe-image-input"
              onChange={(e) => setImg(e.target.value)}
              value={img}
              type="text" 
            />
          </p>
        </div>

        <div className="recipe-form-instructions-container recipe-form-input-container">
          <label htmlFor="recipe-instructions-input">Instructions:</label>
          <p>
            <textarea
              id="recipe-instructions-input"
              key="instructions"
              name="instructions"
              onChange={(e) => setInstructions(e.target.value)}
              value={instructions}
            />
          </p>
        </div>
      </form>

      <RecipeFormControls 
        handleReset={resetAllStates}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default RecipeForm;