const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Ctext x='150' y='95' font-family='system-ui' font-size='13' fill='%239ca3af' text-anchor='middle'%3E%F0%9F%93%B7%3C/text%3E%3Ctext x='150' y='115' font-family='system-ui' font-size='13' fill='%239ca3af' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
  const { _id, title, img, ingredients = [], instructions } = recipe;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMG;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={img || FALLBACK_IMG}
          alt={title}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Ingredients */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">
            Ingredients ({ingredients.length})
          </h4>
          <ul className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
            {ingredients.slice(0, 5).map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span className="line-clamp-1">{ingredient}</span>
              </li>
            ))}
            {ingredients.length > 5 && (
              <li className="text-gray-400 italic">
                +{ingredients.length - 5} more ingredients...
              </li>
            )}
          </ul>
        </div>

        {/* Instructions Preview */}
        {instructions && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Instructions
            </h4>
            <p className="text-sm text-gray-600 line-clamp-3">
              {instructions}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(recipe)}
            className="flex items-center px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors font-semibold"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>

          <button
            onClick={() => onDelete(_id)}
            className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-semibold"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;