import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

interface IngredientSubstitution {
  original: string;
  substitute: string;
  notes: string;
}

const IngredientReplacement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string>('');
  const [substitutions, setSubstitutions] = useState<IngredientSubstitution[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch recipe ingredients
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
        
        // Extract ingredient names
        const extractedIngredients: string[] = [];
        if (Array.isArray(data.ingredients)) {
          data.ingredients.forEach((ing: any) => {
            if (typeof ing === 'string') {
              // Try to parse string ingredients
              const parts = ing.split(' ');
              if (parts.length > 2) {
                extractedIngredients.push(parts.slice(2).join(' '));
              } else {
                extractedIngredients.push(ing);
              }
            } else if (ing.name) {
              extractedIngredients.push(ing.name);
            }
          });
        }
        
        setIngredients(extractedIngredients);
        if (extractedIngredients.length > 0) {
          setSelectedIngredient(extractedIngredients[0]);
        }
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to fetch recipe ingredients. Please try again later.');
      }
    };

    fetchRecipe();
  }, [id, user]);

  // Get substitutions for selected ingredient
  const getSubstitutions = async () => {
    if (!selectedIngredient) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an AI API like OpenAI
      // For now, we'll use mock data based on common substitutions
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSubstitutions: Record<string, IngredientSubstitution[]> = {
        'flour': [
          { 
            original: 'All-purpose flour', 
            substitute: 'Whole wheat flour', 
            notes: 'Use 7/8 cup whole wheat flour for each cup of all-purpose flour. The result will be denser and more nutritious.'
          },
          { 
            original: 'All-purpose flour', 
            substitute: 'Almond flour', 
            notes: 'Use 1:1 ratio. Best for low-carb or gluten-free baking. Results in denser, moister baked goods.'
          },
          { 
            original: 'All-purpose flour', 
            substitute: 'Oat flour', 
            notes: 'Use 1 1/3 cups oat flour for 1 cup all-purpose flour. Gluten-free option with more fiber.'
          }
        ],
        'butter': [
          { 
            original: 'Butter', 
            substitute: 'Olive oil', 
            notes: 'Use 3/4 cup olive oil for each cup of butter. Best for savory dishes, adds a distinct flavor.'
          },
          { 
            original: 'Butter', 
            substitute: 'Coconut oil', 
            notes: 'Use 1:1 ratio. Works well in baking, adds a subtle coconut flavor.'
          },
          { 
            original: 'Butter', 
            substitute: 'Applesauce', 
            notes: 'Use 1/2 cup applesauce for each cup of butter. Best for sweet baked goods, reduces fat content.'
          }
        ],
        'eggs': [
          { 
            original: 'Egg', 
            substitute: 'Flax egg (1 tbsp ground flaxseed + 3 tbsp water)', 
            notes: 'Mix and let sit for 5 minutes until gelatinous. Works best in heartier baked goods.'
          },
          { 
            original: 'Egg', 
            substitute: 'Mashed banana (1/4 cup)', 
            notes: 'Works well in sweeter recipes. Adds banana flavor and moisture.'
          },
          { 
            original: 'Egg', 
            substitute: 'Aquafaba (3 tbsp)', 
            notes: 'The liquid from canned chickpeas. Excellent for meringues and light baking.'
          }
        ],
        'milk': [
          { 
            original: 'Milk', 
            substitute: 'Almond milk', 
            notes: 'Use 1:1 ratio. Lighter flavor, dairy-free alternative.'
          },
          { 
            original: 'Milk', 
            substitute: 'Oat milk', 
            notes: 'Use 1:1 ratio. Creamy texture, works well in most recipes.'
          },
          { 
            original: 'Milk', 
            substitute: 'Coconut milk', 
            notes: 'Use 1:1 ratio. Richer and adds coconut flavor. Best for curries and desserts.'
          }
        ],
        'sugar': [
          { 
            original: 'White sugar', 
            substitute: 'Honey', 
            notes: 'Use 3/4 cup honey for 1 cup sugar. Reduce other liquids by 1/4 cup and lower oven temp by 25°F.'
          },
          { 
            original: 'White sugar', 
            substitute: 'Maple syrup', 
            notes: 'Use 3/4 cup maple syrup for 1 cup sugar. Reduce other liquids by 3 tbsp.'
          },
          { 
            original: 'White sugar', 
            substitute: 'Coconut sugar', 
            notes: 'Use 1:1 ratio. Lower glycemic index, adds caramel-like flavor.'
          }
        ]
      };
      
      // Find substitutions based on ingredient keywords
      let found = false;
      for (const [key, subs] of Object.entries(mockSubstitutions)) {
        if (selectedIngredient.toLowerCase().includes(key.toLowerCase())) {
          setSubstitutions(subs);
          found = true;
          break;
        }
      }
      
      // If no specific substitutions found, provide generic response
      if (!found) {
        setSubstitutions([
          { 
            original: selectedIngredient, 
            substitute: 'No specific substitutions found', 
            notes: 'Try searching for substitutions for this ingredient online, or consult a culinary reference guide.'
          }
        ]);
      }
      
    } catch (err) {
      console.error('Error getting substitutions:', err);
      setError('Failed to get ingredient substitutions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Ingredient Replacement Suggestions</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="ingredient">
            Select Ingredient to Replace:
          </label>
          <div className="flex">
            <select
              id="ingredient"
              value={selectedIngredient}
              onChange={(e) => setSelectedIngredient(e.target.value)}
              className="shadow appearance-none border rounded-l w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            >
              {ingredients.map((ing, index) => (
                <option key={index} value={ing}>
                  {ing}
                </option>
              ))}
            </select>
            <button
              onClick={getSubstitutions}
              disabled={loading || !selectedIngredient}
              className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline ${
                (loading || !selectedIngredient) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Finding...' : 'Find Substitutes'}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        
        {substitutions.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">
              Substitution Options
            </h2>
            
            <div className="space-y-4">
              {substitutions.map((sub, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-red-400 line-through mr-2">{sub.original}</span>
                    <span className="text-gray-400 mx-2">→</span>
                    <span className="text-green-400 font-medium">{sub.substitute}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{sub.notes}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-sm text-gray-400 bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Substitution Tips:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Substitutions may alter flavor, texture, and cooking properties</li>
                <li>Consider dietary restrictions and allergies when making substitutions</li>
                <li>For baking, be especially careful with leavening agents and structural ingredients</li>
                <li>Start with smaller batches when trying new substitutions</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientReplacement;
