const axios = require('axios'); // CommonJS syntax for HTTP requests
const { db } = require('./firebase2'); // Correct CommonJS import path
const { collection, addDoc } = require('firebase/firestore'); // CommonJS import

const EDAMAM_API_KEY = '5757bde43cb6ba1b4bfe70e701101ede';
const EDAMAM_APP_ID = 'a5d5d91a';

// Fetch recipes from Edamam API
async function fetchRecipes(query, limit) {
  const response = await axios.get(
    `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_API_KEY}&to=${limit}`
  );
  return response.data.hits; // Returns the recipe data
}

// Store a recipe in Firestore
async function storeRecipeInFirestore(recipe) {
  try {
    await addDoc(collection(db, 'recipes'), {
      label: recipe.recipe.label,
      calories: recipe.recipe.calories,
      totalTime: recipe.recipe.totalTime,
      yield: recipe.recipe.yield,
      ingredientLines: recipe.recipe.ingredientLines,
      healthLabels: recipe.recipe.healthLabels,
      image: recipe.recipe.image,
      url: recipe.recipe.url,
    });
    console.log('Recipe stored successfully');
  } catch (error) {
    console.error('Error storing recipe:', error);
  }
}

// Fetch and store recipes
async function fetchAndStoreRecipes(query, limit) {
  try {
    const recipes = await fetchRecipes(query, limit);
    for (const hit of recipes) {
      await storeRecipeInFirestore(hit);
    }
    console.log('Recipes fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching and storing recipes:', error);
  }
}

// Example: Fetch and store 5 vegan recipes
fetchAndStoreRecipes('vegan', 5);
