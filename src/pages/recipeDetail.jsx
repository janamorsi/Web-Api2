import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipe, fetchRecipes } from '../utils/api';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { AiFillPushpin } from 'react-icons/ai';
import { BsPatchCheck } from 'react-icons/bs';
import RecipeCard from '../components/recipeCard';  

// Function to generate difficulty level
const getRandomDifficulty = () => {
    const levels = ['Easy', 'Medium', 'Hard'];
    const randomIndex = Math.floor(Math.random() * levels.length);
    return levels[randomIndex];
};

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const getRecipe = async (recipeId) => {
        setLoading(true);
        try {
            const data = await fetchRecipe(recipeId);
            setRecipe(data);

            const recommendedRecipes = await fetchRecipes({
                query: data?.label,
                limit: 5,
            });

            setRecipes(recommendedRecipes);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipe:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getRecipe(id);
    }, [id]);  // Fetch the recipe when the component mounts or when the ID changes

    if (loading) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center">
                <Loading />  // Display loading when fetching data
            </div>
        );
    }

    const difficultyLevel = getRandomDifficulty();  // Get difficulty level

    return (
        <div className="w-full">
            {recipe && (
                <div className="w-full px-4 lg:px-20 pt-5">
                    {/* Header with the recipe title and image */}
                    <Header
                        title={recipe.label}
                        image={recipe.image}
                        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                    />

                    {/* Section for recipe link */}
                    <div className="w-full flex justify-center py-5">
                        <a
                            href={recipe.url}  // Link to the original recipe
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-700 underline text-lg"
                        >
                            Find the instructions and how to make this recipe here!
                        </a>
                    </div>

                    {/* Calories and other information */}
                    <div className="flex gap-10 items-center justify-center px-4">
                        <div className="flex flex-col justify-between">
                            <span className="text-white text-center border border-blue-700 py-1 px-2 rounded-full mb-2">
                                {recipe.calories?.toFixed(0)}
                            </span>
                            <p className="text-white text-[12px] md:text-md">Happy Calories!</p>
                        </div>

                        <div className="flex flex-col justify-between">
                            <span className="text-white text-center border border-blue-700 py-1 px-4 rounded-full mb-2">
                                {recipe?.totalTime}
                            </span>
                            <p className="text-white text-[12px] md:text-md text-center">Time (minutes)</p>
                        </div>

                        {/* Servings Section */}
                        <div className="flex flex-col justify-between">
                            <span className="text-white text-center border border-blue-700 py-1 px-2 rounded-full mb-2">
                                {recipe?.yield}
                            </span>
                            <p className="text-white text-[12px] md:text-md">Servings</p>
                        </div>

                        {/* Difficulty Section */}
                        <div className="flex flex-col justify-between">
                            <span className="text-white text-center border border-red-700 py-1 px-4 rounded-full mb-2">  {/* Unique border color */}
                                Difficulty: {difficultyLevel}
                            </span>
                            <p className="text-white text-[12px] md:text-md text-center">Recipe Difficulty</p>
                        </div>

                        {/* Total Nutrients Section */}
                        <div className="flex flex-col justify-between">
                            <span className="text-white text-center border border-blue-700 py-1 px-4 rounded-full mb-2">
                                Total Nutrients
                            </span>
                            <div className="flex flex-wrap gap-2 text-white text-[12px] md:text-md">
                                {recipe?.totalNutrients?.PROCNT && (
                                    <p>Protein: {recipe.totalNutrients.PROCNT.quantity.toFixed(2)} {recipe.totalNutrients.PROCNT.unit}</p>
                                )}
                                {recipe?.totalNutrients?.FAT && (
                                    <p>Fat: {recipe.totalNutrients.FAT.quantity.toFixed(2)} {recipe.totalNutrients.FAT.unit}</p>
                                )}
                                {recipe?.totalNutrients?.CHOCDF && (
                                    <p>Carbohydrates: {recipe.totalNutrients.CHOCDF.quantity.toFixed(2)} {recipe.totalNutrients.CHOCDF.unit}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section with ingredients */}
                    <div className="w-full flex flex-col md:flex-row gap-8 py-20 px-4 md:px-10">
                        {/* LEFT SIDE */}
                        <div className="w-full md:w-2/4 md:border-r border-blue-700 pr-1">
                            <div className="flex flex-col gap-5">
                                <p className="text-blue-600 text-2xl underline">Ingredients you'll need:</p>
                                {recipe?.ingredientLines?.map((ingredient, index) => (
                                    <p key={index} className="text-white flex gap-2">
                                        <AiFillPushpin className="text-blue-700 text-xl" />
                                        {ingredient}
                                    </p>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3 mt-20">
                                <p className="text-blue-600 text-2xl underline">Health Labels</p>
                                <div className="flex flex-wrap gap-4">
                                    {recipe?.healthLabels.map((item, index) => (
                                        <p key={index} className="text-white flex gap-2 bg-gray-800 px-4 py-1 rounded-full">
                                            <BsPatchCheck color="green" /> {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="w-full md:w-2/4 2xl:pl-10 mt-20 md:mt-0">
                            {recipes.length > 0 ? (
                                <>
                                    <p className="text-white text-2xl">Check out other recipes from our kitchen!</p>
                                    <div className="flex flex-wrap gap-6 px-1 pt-3">
                                        {recipes.map((item, index) => (
                                            <RecipeCard recipe={item} key={index} />  // Render recipe cards
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="text-white text-xl">No recommended recipes found</p>  // If no recommended recipes
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetail;
