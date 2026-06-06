import { useState } from "react";
import { useRecipes } from "./hooks/useRecipes";
import NavBar from "./components/NavBar";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

/**
 * ============================================================================
 *  APP — the root component, wired together by COMPOSITION
 * ============================================================================
 * Notice what `App` does and doesn't do:
 *   • it does NOT know how to fetch recipes (that's `useRecipes`)
 *   • it does NOT know how to render a recipe card (that's `RecipeCard`,
 *     rendered by `RecipeList`)
 *   • it does NOT know how form fields validate (that's `RecipeForm`)
 *
 * Instead, `App` is the "conductor": it holds the small slice of state that
 * genuinely belongs at this level (which UI is currently visible — the form?
 * which recipe, if any, is being edited?), and hands everything else off to
 * focused child components via PROPS. This pattern — small, single-purpose
 * components composed together by a parent that coordinates them — is the
 * core idea of building UIs in React. Read each child component
 * (NavBar, RecipeForm, RecipeList, RecipeCard...) to see how the pieces
 * fit; then come back here to see how they're assembled.
 * ============================================================================
 */
function App() {
  // UI-only state: doesn't come from the server, doesn't need to be shared
  // outside this component tree, so plain `useState` here is the right tool
  // (compare with `useRecipes`, where state needs sharable async behavior).
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Pull everything recipe-related out of the custom hook in one line.
  // `App` doesn't need to know HOW any of this works — only that it exists.
  const {
    recipes,
    loading,
    error,
    addRecipe,
    updateRecipe,
    removeRecipe,
    refreshRecipes,
  } = useRecipes();

  // try/catch here serves a different purpose than in the hook: the hook
  // already turned the failure into `error` state for the *list* view, but
  // a failed save shouldn't silently close the form and lose the user's
  // input. Catching it here means the form stays open so they can retry —
  // we just log it for now (a good spot to later show an inline form error).
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
      console.error("Error saving recipe:", err);
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
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await removeRecipe(id);
      } catch (err) {
        console.error("Error deleting recipe:", err);
      }
    }
  };

  /**
   * CONDITIONAL RENDERING — `{condition && <Thing />}` is the most common
   * JSX idiom for "render this only if that's true". JavaScript's `&&`
   * short-circuits: if `condition` is falsy, it evaluates to `condition`
   * itself (which React renders as nothing); if truthy, it evaluates to
   * — and therefore renders — the JSX on the right. You'll see this pattern
   * repeatedly below for the form, the loading spinner, the error message,
   * and the empty-state vs. populated list.
   */
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
          {error && <ErrorMessage message={error} onRetry={refreshRecipes} />}

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
