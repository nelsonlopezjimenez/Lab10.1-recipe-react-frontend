import { useState, useEffect } from 'react';

/**
 * ============================================================================
 *  CONTROLLED COMPONENTS — React owns the form's state, not the DOM
 * ============================================================================
 * In plain HTML, an <input> keeps track of its own value internally; you'd
 * read it only when needed (e.g. on submit). React generally avoids that —
 * instead, EVERY keystroke updates a piece of React state (`formData`), and
 * the input's `value` is always set FROM that state. The data flows in a
 * single, predictable loop:
 *
 *     state (formData.title)
 *        │
 *        ▼ rendered into
 *     <input value={formData.title} onChange={handleInputChange} />
 *        │
 *        ▼ user types → onChange fires
 *     handleInputChange → setFormData({ ...prev, title: <new value> })
 *        │
 *        └──────────────► back to the top: state updates, input re-renders
 *
 * This is called a CONTROLLED component, and it's why this form can do things
 * a plain HTML form can't trivially do: validate as-you-type, derive one
 * field from another, reset everything with one `setFormData` call, or
 * pre-fill every field at once when editing an existing recipe (see the
 * `useEffect` right below).
 * ============================================================================
 */
const RecipeForm = ({ recipe, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    instructions: '',
    ingredients: [''],
    img: ''
  });

  // Runs whenever the `recipe` prop changes — i.e. when the user clicks
  // "Edit" on a different card (see App.jsx's `handleEditRecipe`, which sets
  // `editingRecipe` and re-renders this form with a new `recipe` prop). We
  // copy the recipe's fields into local `formData` so the user can freely
  // edit a DRAFT without mutating the original object — nothing is sent back
  // to the server until they submit.
  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || '',
        instructions: recipe.instructions || '',
        ingredients: recipe.ingredients || [''],
        img: recipe.img || ''
      });
    }
  }, [recipe]);

  // ONE handler for every text/url/textarea field. It works for all of them
  // because each input's `name` attribute matches a key in `formData`
  // (`name="title"`, `name="instructions"`, `name="img"`...). The computed
  // property `[name]: value` updates exactly that key — a common trick that
  // avoids writing a near-identical handler per field.
  //
  // `setFormData(prev => ({ ...prev, [name]: value }))`: spreading `prev`
  // first copies every existing field, then `[name]: value` overwrites just
  // one. This produces a brand-new object (React state should never be
  // mutated directly) while preserving every field we didn't touch.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Arrays need the same "copy, then change one slot" treatment as objects
  // do above — `[...formData.ingredients]` makes a shallow copy so the
  // original array (and therefore the previous render's state) is left
  // untouched, then we overwrite just the edited index.
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }));
    }
  };

  /**
   * `e.preventDefault()` stops the browser's DEFAULT behavior for a form
   * submission — a full-page reload/navigation to the form's `action` URL.
   * That default makes sense for plain HTML forms; it would be disastrous
   * here, wiping out our React app and any in-flight state. Preventing it is
   * what lets us instead hand the data to `onSave` and let React/JS decide
   * what happens next (an async API call, in App.jsx → useRecipes).
   *
   * Note this function ISN'T `async` — it does its own lightweight,
   * synchronous validation and then calls `onSave(cleanedData)`. The actual
   * network request (and its try/catch) happens one level up, in
   * `App.jsx`'s `handleSaveRecipe`. Validating here, before any network
   * call, gives the user instant feedback instead of a round trip to the
   * server and back just to be told "title is required".
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out empty ingredients
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(ing => ing.trim() !== '')
    };

    // Basic validation
    if (!cleanedData.title.trim()) {
      alert('Please enter a recipe title');
      return;
    }

    if (cleanedData.ingredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }

    onSave(cleanedData);
    
    // Reset form if not editing
    if (!isEditing) {
      setFormData({
        title: '',
        instructions: '',
        ingredients: [''],
        img: ''
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Recipe' : 'Add New Recipe'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter recipe title"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="img" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingredients *
          </label>
          <div className="space-y-3">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500 w-8">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter ingredient"
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-red-500 hover:text-red-700 font-bold text-lg px-2"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addIngredient}
            className="mt-3 text-primary-600 hover:text-primary-700 font-semibold flex items-center"
          >
            <span className="text-xl mr-1">+</span>
            Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter cooking instructions..."
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            {isEditing ? 'Update Recipe' : 'Save Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;