import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

const NutritionCalculator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeTitle, setRecipeTitle] = useState<string>('');
  const [servings, setServings] = useState<number>(1);
  const [nutritionInfo, setNutritionInfo] = useState<NutritionInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [calculationComplete, setCalculationComplete] = useState<boolean>(false);

  // Fetch recipe data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Fetch from the backend API
        const response = await fetch(`https://cookpilot-backend.onrender.com/api/recipes/${id}`, {
          headers: {
            'Authorization': `Bearer ${await user?.getIdToken()}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        setRecipeTitle(data.title || data.name || 'Recipe');
        setServings(data.servings || 1);
        
        // Transform ingredients from objects to our Ingredient interface
        const extractedIngredients: Ingredient[] = [];
        if (Array.isArray(data.ingredients)) {
          data.ingredients.forEach((ing: any) => {
            if (typeof ing === 'string') {
              // Try to parse string ingredients
              const parts = ing.split(' ');
              extractedIngredients.push({
                quantity: parts[0] || '1',
                unit: parts[1] || '',
                name: parts.slice(2).join(' ') || ing
              });
            } else {
              extractedIngredients.push({
                quantity: (ing.amount || ing.quantity || '1').toString(),
                unit: ing.unit || '',
                name: ing.name || ''
              });
            }
          });
        }
        
        setIngredients(extractedIngredients);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to fetch recipe ingredients. Please try again later.');
      }
    };

    fetchRecipe();
  }, [id, user]);

  // Calculate nutrition information
  const calculateNutrition = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call a nutrition API like Spoonacular
      // For now, we'll use mock data based on common ingredients
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock nutrition database (per 100g)
      const nutritionDatabase: Record<string, Partial<NutritionInfo>> = {
        'flour': { calories: 364, protein: 10, carbs: 76, fat: 1, fiber: 2.7, sugar: 0.3 },
        'sugar': { calories: 396, protein: 0, carbs: 100, fat: 0, fiber: 0, sugar: 100 },
        'butter': { calories: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0, sugar: 0.1 },
        'egg': { calories: 155, protein: 12.6, carbs: 1.1, fat: 11, fiber: 0, sugar: 1.1 },
        'milk': { calories: 42, protein: 3.4, carbs: 5, fat: 1, fiber: 0, sugar: 5 },
        'chicken': { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0 },
        'beef': { calories: 250, protein: 26, carbs: 0, fat: 17, fiber: 0, sugar: 0 },
        'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sugar: 0.1 },
        'pasta': { calories: 158, protein: 5.8, carbs: 31, fat: 0.9, fiber: 1.8, sugar: 0.6 },
        'potato': { calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2, sugar: 0.8 },
        'carrot': { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, sugar: 4.7 },
        'onion': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, sugar: 4.2 },
        'garlic': { calories: 149, protein: 6.4, carbs: 33, fat: 0.5, fiber: 2.1, sugar: 1 },
        'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sugar: 2.6 },
        'cheese': { calories: 402, protein: 25, carbs: 1.3, fat: 33, fiber: 0, sugar: 0.1 },
        'olive oil': { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, sugar: 0 },
        'salt': { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 },
        'pepper': { calories: 251, protein: 10, carbs: 64, fat: 3.3, fiber: 25, sugar: 0.6 },
      };
      
      // Initialize total nutrition
      const totalNutrition: NutritionInfo = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0
      };
      
      // Calculate nutrition based on ingredients
      ingredients.forEach(ingredient => {
        // Find matching ingredient in database
        let matchedIngredient = '';
        let matchedNutrition = null;
        
        for (const [key, nutrition] of Object.entries(nutritionDatabase)) {
          if (ingredient.name.toLowerCase().includes(key.toLowerCase())) {
            matchedIngredient = key;
            matchedNutrition = nutrition;
            break;
          }
        }
        
        if (matchedNutrition) {
          // Estimate quantity in grams
          let grams = 0;
          const quantity = parseFloat(ingredient.quantity) || 0;
          
          // Very basic unit conversion (would be much more sophisticated in real app)
          if (ingredient.unit.toLowerCase().includes('g')) {
            grams = quantity;
          } else if (ingredient.unit.toLowerCase().includes('kg')) {
            grams = quantity * 1000;
          } else if (ingredient.unit.toLowerCase().includes('oz')) {
            grams = quantity * 28.35;
          } else if (ingredient.unit.toLowerCase().includes('lb')) {
            grams = quantity * 453.6;
          } else if (ingredient.unit.toLowerCase().includes('cup')) {
            // Rough estimates for common ingredients by cup
            if (matchedIngredient === 'flour') grams = quantity * 125;
            else if (matchedIngredient === 'sugar') grams = quantity * 200;
            else if (matchedIngredient === 'rice') grams = quantity * 185;
            else if (matchedIngredient === 'milk') grams = quantity * 245;
            else grams = quantity * 150; // Default estimate
          } else if (ingredient.unit.toLowerCase().includes('tbsp')) {
            grams = quantity * 15;
          } else if (ingredient.unit.toLowerCase().includes('tsp')) {
            grams = quantity * 5;
          } else if (matchedIngredient === 'egg' && !ingredient.unit) {
            grams = quantity * 50; // Average medium egg
          } else {
            grams = quantity * 30; // Default fallback
          }
          
          // Calculate nutrition contribution (per 100g in database)
          const factor = grams / 100;
          
          if (matchedNutrition.calories) totalNutrition.calories += matchedNutrition.calories * factor;
          if (matchedNutrition.protein) totalNutrition.protein += matchedNutrition.protein * factor;
          if (matchedNutrition.carbs) totalNutrition.carbs += matchedNutrition.carbs * factor;
          if (matchedNutrition.fat) totalNutrition.fat += matchedNutrition.fat * factor;
          if (matchedNutrition.fiber) totalNutrition.fiber += matchedNutrition.fiber * factor;
          if (matchedNutrition.sugar) totalNutrition.sugar += matchedNutrition.sugar * factor;
        }
      });
      
      // Round values
      Object.keys(totalNutrition).forEach(key => {
        totalNutrition[key as keyof NutritionInfo] = Math.round(totalNutrition[key as keyof NutritionInfo] * 10) / 10;
      });
      
      // Calculate per serving
      if (servings > 1) {
        Object.keys(totalNutrition).forEach(key => {
          totalNutrition[key as keyof NutritionInfo] = Math.round((totalNutrition[key as keyof NutritionInfo] / servings) * 10) / 10;
        });
      }
      
      setNutritionInfo(totalNutrition);
      setCalculationComplete(true);
    } catch (err) {
      console.error('Error calculating nutrition:', err);
      setError('Failed to calculate nutrition information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Nutrition Information: {recipeTitle}</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-6">
          <p className="text-gray-300 mb-4">
            This tool calculates estimated nutrition information based on the recipe ingredients.
            Results are approximate and may vary based on specific brands and preparation methods.
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">
              <strong>Recipe:</strong> {recipeTitle}
            </span>
            <span className="text-gray-300">
              <strong>Servings:</strong> {servings}
            </span>
          </div>
          
          <div className="mt-4">
            <button
              onClick={calculateNutrition}
              disabled={loading || ingredients.length === 0}
              className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                (loading || ingredients.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Calculating...' : 'Calculate Nutrition Information'}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        
        {calculationComplete && nutritionInfo && (
          <div>
            <h2 className="text-xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">
              Nutrition Facts (per serving)
            </h2>
            
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="border-b border-gray-600 pb-2 mb-2">
                <div className="flex justify-between">
                  <span className="text-gray-300 font-bold text-xl">Calories</span>
                  <span className="text-gray-300 font-bold text-xl">{nutritionInfo.calories}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Fat</span>
                  <span className="text-gray-300">{nutritionInfo.fat}g</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Carbohydrates</span>
                  <span className="text-gray-300">{nutritionInfo.carbs}g</span>
                </div>
                
                <div className="flex justify-between pl-4">
                  <span className="text-gray-400">Dietary Fiber</span>
                  <span className="text-gray-400">{nutritionInfo.fiber}g</span>
                </div>
                
                <div className="flex justify-between pl-4">
                  <span className="text-gray-400">Sugars</span>
                  <span className="text-gray-400">{nutritionInfo.sugar}g</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300">Protein</span>
                  <span className="text-gray-300">{nutritionInfo.protein}g</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-400 bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Nutrition Information Disclaimer:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Values are estimates based on average nutritional content of ingredients</li>
                <li>Actual nutrition may vary based on specific ingredients, brands, and preparation methods</li>
                <li>For precise nutritional information, consult a registered dietitian or use laboratory analysis</li>
                <li>Calculations do not account for cooking methods which may affect nutritional content</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionCalculator;
