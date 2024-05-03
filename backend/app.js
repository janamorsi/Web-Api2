const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const axios = require('axios'); // For HTTP requests

const app = express();
const port = 3000;

// Edamam API key and App ID
const EDAMAM_API_KEY = '5757bde43cb6ba1b4bfe70e701101ede';
const EDAMAM_APP_ID = 'a5d5d91a';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Recipe API',
    version: '1.0.0',
    description: 'API for fetching recipe details, recommended recipes, and categories/tags',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./app.js'], // Points to this file for Swagger documentation
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve Swagger UI

// Define the GET endpoint for fetching a list of recipes
/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Fetch a list of recipes
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search term for filtering recipes
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of recipes to return
 *     responses:
 *       200:
 *         description: List of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   label:
 *                     type: string
 *                   image:
 *                     type: string
 *                   calories:
 *                     type: number
 *                   totalTime:
 *                     type: number
 *                   yield:
 *                     type: number
 *       500:
 *         description: Internal server error
 */

// Define the GET endpoint for fetching detailed recipe information
/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     summary: Fetch detailed information about a specific recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the recipe to fetch
 *     responses:
 *       200:
 *         description: Detailed recipe information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 label:
 *                   type: string
 *                 image:
 *                   type: string
 *                 url:
 *                   type: string
 *                 calories:
 *                     type: number
 *                 totalTime:
 *                     type: number
 *                 yield:
 *                     type: number
 *                 totalNutrients:
 *                   type: object
 *                   properties:
 *                     PROCNT:
 *                       type: object
 *                       properties:
 *                         quantity:
 *                           type: number
 *                         unit:
 *                           type: string
 *                     FAT:
 *                       type: object
 *                       properties:
 *                         quantity:
 *                           type: number
 *                         unit:
 *                           type: string
 *                     CHOCDF:
 *                       type: object
 *                       properties:
 *                         quantity:
 *                           type: number
 *                         unit:
 *                           type: string
 *                 ingredientLines:
 *                   type: array
 *                   items:
 *                     type: string
 *                 healthLabels:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Recipe not found
 */

// Define the GET endpoint for fetching recommended recipes
/**
 * @swagger
 * /recipes/recommended:
 *   get:
 *     summary: Fetch recommended recipes based on a search term
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search term for finding recommended recipes
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of recommended recipes to return
 *     responses:
 *       200:
 *         description: Successful response with recommended recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   label:
 *                     type: string
 *                   image:
 *                     type: string
 *                   url:
 *                     type: string
 *       404:
 *         description: No recommended recipes found
 */

// Define the GET endpoint for fetching categories/tags
/**
 * @swagger
 * /recipes/categories:
 *   get:
 *     summary: Fetch available categories or tags like cuisine type and meal type
 *     responses:
 *       200:
 *         description: List of available categories/tags
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cuisineType:
 *                   type: array
 *                   items:
 *                     type: string
 *                 mealType:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
