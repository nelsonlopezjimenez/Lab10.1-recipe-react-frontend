import RecipeCard from "./RecipeCard";
import NoRecipes from "./NoRecipes";

const RecipeList = ({ formIsToggled, lastId, recipes, setFormIsToggled, setRecipes }) => {
  const getClasses = () => `recipe-list ${formIsToggled ? "form-toggled" : ""}`;

  const recipeCheck = () => 
    recipes !== undefined && recipes !== null && recipes.length > 0;

  return (
    <div className={getClasses()}>
      {
        recipeCheck() ? 
        recipes.map(recipe => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            image={recipe.img}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            lastId={lastId}
            recipes={recipes}
            setRecipes={setRecipes}
            title={recipe.title}
          />
        )) : 
        (
          <NoRecipes />
        )
      }
    </div>
  )
}

export default RecipeList

/*



*/