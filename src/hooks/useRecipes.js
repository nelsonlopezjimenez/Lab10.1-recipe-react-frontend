import { useState, useEffect, useCallback } from 'react';
import * as api from '../api';

/**
 * ============================================================================
 *  CUSTOM HOOK — sharing stateful logic between components
 * ============================================================================
 * A "custom hook" is just a regular JavaScript function that:
 *   1. Has a name starting with `use` (a convention React's tooling and
 *      linter rely on to know it's allowed to call OTHER hooks inside it)
 *   2. Calls built-in hooks (useState, useEffect, useCallback...) to manage
 *      state and side effects
 *
 * Why bother? `App.jsx` needs to know the list of recipes, whether they're
 * loading, whether something went wrong, AND needs functions to add/edit/
 * remove recipes. All of that could live directly inside the `App` component
 * — but bundling it into `useRecipes` means:
 *   • `App.jsx` reads as "show a nav, a form, and a list" instead of being
 *     cluttered with fetch logic and state wiring
 *   • this exact same data + behavior could be reused by a totally different
 *     component (e.g. a `<Dashboard>` or `<SearchResults>`) with one line:
 *     `const { recipes, loading } = useRecipes()`
 *   • the data-fetching logic can be reasoned about (and tested) in isolation
 *
 * This is the React equivalent of the "service layer" idea in api.js: keep
 * concerns separated so each piece is easier to understand on its own.
 * ============================================================================
 */
export const useRecipes = () => {
  // useState returns a [currentValue, setterFunction] pair. Calling the
  // setter schedules a re-render with the new value — React doesn't mutate
  // `recipes` in place, it replaces it, which is what makes the UI update.
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * useCallback(fn, deps) returns the SAME function reference across
   * re-renders as long as `deps` hasn't changed (here, `[]` means "never
   * changes"). Without it, `loadRecipes` would be a brand-new function on
   * every render, which would make the `useEffect` below re-run on every
   * single render too — an infinite loop of fetch → re-render → fetch → ...
   * `useCallback` is the fix that breaks that cycle.
   *
   * try / catch / finally here mirrors the backend controllers: `await`
   * re-throws network or HTTP errors from `api.getAllRecipes`, `catch`
   * converts that into user-facing state (`setError`) instead of letting it
   * crash the app, and `finally` guarantees `setLoading(false)` runs whether
   * the request succeeded OR failed — the spinner shouldn't spin forever
   * either way.
   */
  const loadRecipes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError('Failed to load recipes');
      console.error('Error loading recipes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * "Optimistic-ish" update: rather than re-fetching the entire list after
   * creating a recipe (an extra round trip to the server), we take the
   * record the server just confirmed it created — including the `_id`
   * MongoDB generated for it — and append it to local state directly.
   * `setRecipes(prev => [...prev, newRecipe])` builds a brand-new array
   * (spreading the old one, then adding to it) rather than mutating
   * `prev` in place — React relies on detecting a *new* array reference
   * to know it should re-render.
   */
  const addRecipe = useCallback(async (recipe) => {
    try {
      const newRecipe = await api.createRecipe(recipe);
      setRecipes(prev => [...prev, newRecipe]);
      return newRecipe;
    } catch (err) {
      setError('Failed to create recipe');
      throw err; // let the caller (App.jsx) know the save failed too
    }
  }, []);

  // Same idea as addRecipe, but we replace one entry in place by matching
  // on `_id` — `.map` returns a new array where every item is either the
  // freshly-updated recipe or untouched, again giving React a new reference
  // to detect and re-render from.
  const updateRecipe = useCallback(async (id, recipe) => {
    try {
      const updatedRecipe = await api.updateRecipe(id, recipe);
      setRecipes(prev =>
        prev.map(r => r._id === id ? updatedRecipe : r)
      );
      return updatedRecipe;
    } catch (err) {
      setError('Failed to update recipe');
      throw err;
    }
  }, []);

  // `.filter` keeps everything EXCEPT the deleted recipe — the array shrinks
  // by exactly one, instantly, without waiting on a second network round trip
  // to refresh the whole list.
  const removeRecipe = useCallback(async (id) => {
    try {
      await api.deleteRecipe(id);
      setRecipes(prev => prev.filter(recipe => recipe._id !== id));
    } catch (err) {
      setError('Failed to delete recipe');
      throw err;
    }
  }, []);

  /**
   * useEffect(fn, deps) runs `fn` after the component (re)renders, but only
   * when something in `deps` has changed since the last render. `[loadRecipes]`
   * means "run once when this hook is first used, and again only if
   * `loadRecipes` itself ever changes" — which, thanks to `useCallback`
   * above, it never does. Net effect: fetch the recipes exactly once, when
   * the component mounts. This is the React idiom for "do something when the
   * component first appears on screen" (the closest equivalent to
   * `componentDidMount` in older class-based React).
   */
  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  // Expose state and actions as a single object — this is the entire public
  // "API" of the hook. `App.jsx` destructures exactly what it needs from it.
  return {
    recipes,
    loading,
    error,
    addRecipe,
    updateRecipe,
    removeRecipe,
    refreshRecipes: loadRecipes,
  };
};
