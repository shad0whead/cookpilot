import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime?: number;
  cookTime?: number;
  tags?: string[];
}

const RecipeScaling: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [scaleFactor, setScaleFactor] = useState(1);
  const [newServings, setNewServings] = useState(1);
  const [scaledIngredients, setScaledIngredients] = useState<Ingredient[]>([]);
  const [cookTimeAdjustment, setCookTimeAdjustment] = useState<number | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // Fetch from the backend API
        const response = await fetch(`https://cookpilot-backend.onrender.com/api/recipes/${id}`, {
          headers: {
            'Authorization': `Bearer ${await currentUser?.getIdToken()}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match our frontend Recipe interface
        const transformedRecipe: Recipe = {
          id: data.id || data._id,
          title: data.title || data.name,
          description: data.description,
          servings: data.servings || 1,
          prepTime: data.prep_time,
          cookTime: data.cook_time,
          // Transform ingredients from objects to our Ingredient interface
          ingredients: Array.isArray(data.ingredients) 
            ? data.ingredients.map((ing: any) => {
                if (typeof ing === 'string') {
                  // Try to parse string ingredients
                  const parts = ing.split(' ');
                  return {
                    quantity: parts[0] || '1',
                    unit: parts[1] || '',
                    name: parts.slice(2).join(' ') || ing
                  };
                }
                return {
                  quantity: (ing.amount || ing.quantity || '1').toString(),
                  unit: ing.unit || '',
                  name: ing.name || ''
                };
              })
            : [],
          // Transform steps/instructions
          instructions: Array.isArray(data.instructions) 
            ? data.instructions 
            : Array.isArray(data.steps) 
              ? data.steps.map((step: any) => {
                  if (typeof step === 'string') return step;
                  return step.description || '';
                })
              : [],
          tags: data.tags
        };
        
        setRecipe(transformedRecipe);
        setNewServings(transformedRecipe.servings);
        setScaledIngredients(transformedRecipe.ingredients);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to fetch recipe details. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, currentUser]);

  // Update scale factor when new servings change
  const handleServingsChange = (value: number) => {
    if (!recipe || value < 1) return;
    
    setNewServings(value);
    const factor = value / recipe.servings;
    setScaleFactor(factor);
    
    // Scale ingredients
    const scaled = recipe.ingredients.map(ing => ({
      ...ing,
      quantity: scaleQuantity(ing.quantity, factor)
    }));
    
    setScaledIngredients(scaled);
    
    // Adjust cooking time (using square root scaling as a heuristic)
    if (recipe.cookTime) {
      const cookTimeScale = Math.sqrt(factor);
      const newCookTime = Math.round(recipe.cookTime * cookTimeScale);
      setCookTimeAdjustment(newCookTime);
    }
  };

  // Scale a numeric quantity
  const scaleQuantity = (quantity: string, factor: number): string => {
    const numericValue = parseFloat(quantity);
    if (isNaN(numericValue)) return quantity;
    
    const scaled = numericValue * factor;
    // Round to 2 decimal places
    return (Math.round(scaled * 100) / 100).toString();
  };

  if (loading) {
    return <div className="text-center py-10">Loading recipe for scaling...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center py-10">Recipe not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Scale Recipe: {recipe.title}</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Original Servings: {recipe.servings}
          </label>
          
          <div className="flex items-center">
            <label className="block text-gray-300 text-sm font-bold mr-2">
              New Servings:
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleServingsChange(newServings - 1)}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-1 px-3 rounded-l"
                disabled={newServings <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={newServings}
                onChange={(e) => handleServingsChange(parseInt(e.target.value) || 1)}
                className="shadow appearance-none border text-center w-16 py-1 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={() => handleServingsChange(newServings + 1)}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-1 px-3 rounded-r"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">Scaled Ingredients</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            {scaledIngredients.map((ingredient, index) => (
              <li key={index}>
                <span className="font-medium">{ingredient.quantity}</span>
                {' '}
                <span>{ingredient.unit}</span>
                {' '}
                <span>{ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {cookTimeAdjustment && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">Adjusted Cooking Time</h2>
            <p className="text-gray-300">
              Original: {recipe.cookTime} minutes
            </p>
            <p className="text-gray-300">
              Adjusted: {cookTimeAdjustment} minutes
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Note: Cooking times are estimates and may need further adjustment based on your equipment and ingredients.
            </p>
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-400 bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2">Scaling Tips:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Baking recipes are sensitive to scaling - results may vary when significantly increasing or decreasing quantities</li>
            <li>Spices and seasonings may need to be adjusted to taste rather than strictly scaled</li>
            <li>Cooking vessels may need to be adjusted for larger or smaller quantities</li>
            <li>For best results, use weight measurements (grams) rather than volume when available</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeScaling;
