import { useState, useEffect, useCallback } from 'react';
import * as api from '../api';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all recipes
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

  // Add new recipe
  const addRecipe = useCallback(async (recipe) => {
    try {
      const newRecipe = await api.createRecipe(recipe);
      setRecipes(prev => [...prev, newRecipe]);
      return newRecipe;
    } catch (err) {
      setError('Failed to create recipe');
      throw err;
    }
  }, []);

  // Update existing recipe
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

  // Delete recipe
  const removeRecipe = useCallback(async (id) => {
    try {
      await api.deleteRecipe(id);
      setRecipes(prev => prev.filter(recipe => recipe._id !== id));
    } catch (err) {
      setError('Failed to delete recipe');
      throw err;
    }
  }, []);

  // Load recipes on mount
  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

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