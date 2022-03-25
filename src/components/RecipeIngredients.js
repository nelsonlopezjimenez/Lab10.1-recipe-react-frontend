const RecipeIngredients = ({ ingredients }) => {
  return (
    ingredients !== undefined && ingredients !== null && (
    <div className="recipe-ingredients">
      <h2>Ingredients:</h2>

      <ul>
        {
          ingredients.map((ingredient, index) => (
            <li className="ingredient" key={index}>{ingredient}</li>
          ))
        }
      </ul>
    </div>
  ));
};

export default RecipeIngredients;