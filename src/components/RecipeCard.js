import RecipeControls from "./RecipeControls";
import RecipeIngredients from "./RecipeIngredients";

const RecipeCard = ({ id, image, ingredients, instructions, lastId, recipes, setRecipes, title }) => {
  const getClassNames = () => lastId === id ? "recipe-card newly-added" : "recipe-card";
  
  return (
    <div className={getClassNames()}>
      <RecipeControls 
        id={id}
        recipes={recipes}
        setRecipes={setRecipes}
      />  

      <div className="recipe-title-wrapper">
        <h1 className="recipe-title">{title}</h1>
      </div>

      <div className="recipe-card-image">
        <img src={`img/${image}`} alt={title} />
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