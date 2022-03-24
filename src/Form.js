//This may not be fully functioning, however, it implements some of what a functional compononent
//should include when changed from the class component structure

//change the imports to allow for use of hooks
import React, { useState, useEffects } from "react";
import "./Form.css";

function Form() {
  // save the following props to the form
  const { onSave, onDelete } = props;
  //create hooks for the features of a recipe
  const [recipe, setRecipe] = useState([]);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [img, setImg] = useState("");

  //create change handler for each feature of a recipe
  function handleChangeTitle(e) {
    setTitle({ [title]: value });
  }

  function handleChangeInstructions(e) {
    setInstructions({ [instructions]: value });
  }

  function handleChangeImg(e) {
    setImg({ [img]: value });
  }

  function handleNewIngredient(ingredient) {
    setIngredients([...ingredients, ingredient]);
  }

  function handleChangeIng(e) {
    const index = Number(e.target.name.split("-")[1]);
    const ingredients = ingredients.map((ing, i) =>
      i === index ? e.target.value : ing
    );
    setIngredients({ ingredients });
  }

  function handleSubmit(e) {
    console.log("RecipeInput, handleSubmit");
    e.preventDefault();
    //creating the object to pass into save into the form
    const recipe = {
      title: title,
      instructions: instructions,
      ingredients: ingredients,
      img: img,
    };
    onSave({ recipe });
  }

  const { onClose } = props;
  let inputs = ingredients.map((ing, i) => (
    <div className="recipe-form-line" key={`ingredient-${i}`}>
      <label>
        {i + 1}.
        <input
          type="text"
          name={`ingredient-${i}`}
          value={ing}
          size={45}
          autoComplete="off"
          placeholder=" Ingredient"
          onChange={handleChangeIng}
        />
      </label>
    </div>
  ));

  return (
    <div className="recipe-form-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <button type="button" className="close-button" onClick={onClose}>
          X
        </button>
        <div className="recipe-form-line">
          <label htmlFor="recipe-title-input">Title</label>
          <input
            id="recipe-title-input"
            key="title"
            name="title"
            type="text"
            value={title}
            size={42}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="recipe-instructions-input" style={{ marginTop: "5px" }}>
          Instructions
        </label>
        <textarea
          key="instructions"
          id="recipe-instructions-input"
          type="Instructions"
          name="instructions"
          rows="8"
          cols="50"
          autoComplete="off"
          value={instructions}
          onChange={handleChange}
        />
        {inputs}
        <button type="button" onClick={handleNewIngredient} className="buttons">
          +
        </button>
        <div className="recipe-form-line">
          <label htmlFor="recipe-img-input">Image Url</label>
          <input
            id="recipe-img-input"
            type="text"
            placeholder=""
            name="img"
            value={img}
            size={36}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="buttons"
          style={{ alignSelf: "flex-end", marginRight: 0 }}
        >
          SAVE
        </button>
      </form>
    </div>
  );
}

export default Form;
