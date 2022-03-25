import RecipeControls from "./RecipeControls";
import RecipeIngredients from "./RecipeIngredients";

const RecipeCard = ({ id, image, ingredients, instructions, title }) => {
  return (
    <div className="recipe-card">
      <RecipeControls 
        id={id}
      />  

      <div className="recipe-title-wrapper">
        <h1 className="recipe-title">{title}</h1>
      </div>

      <div className="recipe-card-image">
        <img src={image} alt={title} />
      </div>

      <div className="recipe-card-content">

        <RecipeIngredients
          ingredients={ingredients}
        />

        <h2>Instructions:</h2>
        <p>{instructions}</p>
      </div>
    </div> 
  );
};

export default RecipeCard;