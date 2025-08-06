import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onEdit, onDelete }) => {
  return (
    <div className="w-full max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id || recipe.id}
            recipe={recipe}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;