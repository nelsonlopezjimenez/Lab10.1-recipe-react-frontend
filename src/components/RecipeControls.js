import { HiOutlineTrash } from 'react-icons/hi';

import { removeRecipe } from '../api';

const RecipeControls = ({ id, recipes, setRecipes }) => {
  const handleDelete = e => {
    removeRecipe(id)
      .then(() => setRecipes(recipes.filter(recipe => recipe._id !== id)));
  }

  return (
    <div className="recipe-card-control-container">
      <button 
        className="recipe-card-delete" 
        id={`recipe-card-delete-${id}`}
        onClick={e => handleDelete(e)}
      >
        <HiOutlineTrash />
      </button>
    </div>
  );
};

export default RecipeControls;