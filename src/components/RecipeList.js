import RecipeCard from "./RecipeCard";

const RecipeList = ({ formIsToggled, recipes, setFormIsToggled }) => {
  const getClasses = () => `recipe-list ${formIsToggled ? "form-toggled" : ""}`;
  
  return (
    <div className={getClasses()}>
      {
        recipes !== undefined && recipes !== null && 
        recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            image={recipe.img}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            title={recipe.title}
          />
        ))
      }
    </div>
  )
}

export default RecipeList

/*



*/