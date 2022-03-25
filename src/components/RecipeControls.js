import { HiOutlineTrash } from 'react-icons/hi';

const RecipeControls = ({ id }) => {
  return (
    <div className="recipe-card-control-container">
      <button 
        className="recipe-card-delete" 
        id={`recipe-card-delete-${id}`}
      >
        <HiOutlineTrash />
      </button>
    </div>
  );
};

export default RecipeControls;