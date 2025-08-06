import { useState } from 'react';
import { useRecipes } from './hooks/useRecipes';
import NavBar from './components/NavBar';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  
  const {
    recipes,
    loading,
    error,
    addRecipe,
    updateRecipe,
    removeRecipe,
    refreshRecipes,
  } = useRecipes();

  const handleSaveRecipe = async (recipeData) => {
    try {
      if (editingRecipe) {
        await updateRecipe(editingRecipe._id, recipeData);
        setEditingRecipe(null);
      } else {
        await addRecipe(recipeData);
      }
      setShowForm(false);
    } catch (err) {
      console.error('Error saving recipe:', err);
    }
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingRecipe(null);
    setShowForm(false);
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await removeRecipe(id);
      } catch (err) {
        console.error('Error deleting recipe:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        onToggleForm={() => setShowForm(!showForm)}
        onShowForm={() => setShowForm(true)}
        onHideForm={() => setShowForm(false)}
        showForm={showForm}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Recipe Form */}
        {showForm && (
          <div className="mb-8">
            <RecipeForm
              recipe={editingRecipe}
              onSave={handleSaveRecipe}
              onCancel={handleCancelEdit}
              isEditing={!!editingRecipe}
            />
          </div>
        )}

        {/* Content Area */}
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            My Recipe Collection
          </h1>

          {/* Loading State */}
          {loading && <LoadingSpinner />}

          {/* Error State */}
          {error && (
            <ErrorMessage 
              message={error} 
              onRetry={refreshRecipes}
            />
          )}

          {/* Recipe List */}
          {!loading && !error && (
            <>
              {recipes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👨‍🍳</div>
                  <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                    No recipes yet!
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Start by adding your first recipe.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Add Your First Recipe
                  </button>
                </div>
              ) : (
                <RecipeList
                  recipes={recipes}
                  onEdit={handleEditRecipe}
                  onDelete={handleDeleteRecipe}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;