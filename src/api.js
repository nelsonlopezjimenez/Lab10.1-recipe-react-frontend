// API service with modern best practices
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3999/api/v1/recipe';

// Generic fetch wrapper with error handling
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Get all recipes
export const getAllRecipes = async () => {
  return apiRequest(API_BASE_URL);
};

// Get single recipe by ID
export const getRecipeById = async (id) => {
  return apiRequest(`${API_BASE_URL}/${id}`);
};

// Create new recipe
export const createRecipe = async (recipe) => {
  return apiRequest(API_BASE_URL, {
    method: 'POST',
    body: JSON.stringify(recipe),
  });
};

// Update existing recipe
export const updateRecipe = async (id, recipe) => {
  return apiRequest(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(recipe),
  });
};

// Delete recipe
export const deleteRecipe = async (id) => {
  return apiRequest(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};