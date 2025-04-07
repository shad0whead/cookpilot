import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  ingredients: string[];
  instructions: string[];
  tags?: string[];
  createdBy?: string;
  createdAt?: string;
}

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
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
        
        // Transform the data to match our frontend Recipe interface
        const transformedRecipe: Recipe = {
          id: data.id || data._id,
          title: data.title || data.name,
          description: data.description,
          imageUrl: data.media && data.media.length > 0 ? data.media[0] : undefined,
          prepTime: data.prep_time,
          cookTime: data.cook_time,
          servings: data.servings,
          // Transform ingredients from objects to strings if needed
          ingredients: Array.isArray(data.ingredients) 
            ? data.ingredients.map((ing: any) => {
                if (typeof ing === 'string') return ing;
                return `${ing.amount || ing.quantity} ${ing.unit} ${ing.name}${ing.notes ? ` (${ing.notes})` : ''}`;
              })
            : [],
          // Transform steps/instructions if needed
          instructions: Array.isArray(data.instructions) 
            ? data.instructions 
            : Array.isArray(data.steps) 
              ? data.steps.map((step: any) => {
                  if (typeof step === 'string') return step;
                  return step.description || '';
                })
              : [],
          tags: data.tags,
          createdBy: data.created_by || data.chef_id,
          createdAt: data.created_at
        };
        
        setRecipe(transformedRecipe);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        
        // Fallback to mock data if API fails
        const mockRecipe: Recipe = {
          id: id || '1',
          title: 'Spaghetti Carbonara',
          description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
          imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
          prepTime: 10,
          cookTime: 15,
          servings: 4,
          ingredients: [
            '350g spaghetti',
            '150g pancetta or guanciale, diced',
            '3 large eggs',
            '50g pecorino cheese, grated',
            '50g parmesan, grated',
            'Freshly ground black pepper',
            '1 clove of garlic (optional)',
            'Salt to taste'
          ],
          instructions: [
            'Bring a large pot of salted water to boil and cook the spaghetti according to package instructions until al dente.',
            'While the pasta is cooking, heat a large skillet over medium heat. Add the diced pancetta and cook until crispy, about 5-7 minutes.',
            'In a bowl, whisk together the eggs, grated cheeses, and a generous amount of black pepper.',
            'When the pasta is done, reserve 1/2 cup of the pasta water, then drain the pasta.',
            'Working quickly, add the hot pasta to the skillet with the pancetta, tossing to combine.',
            'Remove the skillet from heat and pour in the egg and cheese mixture, stirring constantly to create a creamy sauce. If needed, add a splash of the reserved pasta water to loosen the sauce.',
            'Serve immediately with additional grated cheese and black pepper on top.'
          ],
          tags: ['pasta', 'italian', 'dinner'],
          createdBy: 'User123',
          createdAt: '2023-09-15T14:30:00Z'
        };
        
        setRecipe(mockRecipe);
        setError('Failed to fetch recipe from the server. Showing sample recipe instead.');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, user]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }
    
    try {
      const response = await fetch(`https://cookpilot-backend.onrender.com/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${await user?.getIdToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Redirect to recipes list after successful deletion
      navigate('/');
    } catch (err) {
      console.error('Error deleting recipe:', err);
      alert('Failed to delete recipe. Please try again later.');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading recipe...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="text-center py-4 text-amber-500 bg-amber-900/30 rounded mb-6">{error}</div>
        {recipe && <RecipeDetailContent recipe={recipe} onDelete={handleDelete} />}
      </div>
    );
  }

  if (!recipe) {
    return <div className="text-center py-10">Recipe not found.</div>;
  }

  return <RecipeDetailContent recipe={recipe} onDelete={handleDelete} />;
};

// Extracted RecipeDetailContent component for reusability
const RecipeDetailContent: React.FC<{ 
  recipe: Recipe, 
  onDelete: () => void 
}> = ({ recipe, onDelete }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/" 
          className="text-green-400 hover:text-green-300 flex items-center"
        >
          ← Back to Recipes
        </Link>
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        {recipe.imageUrl && (
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-100 mb-4">{recipe.title}</h1>
          
          <p className="text-gray-300 mb-6 text-lg">{recipe.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.tags?.map((tag) => (
              <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Prep Time</p>
              <p className="text-gray-100 font-semibold">{recipe.prepTime} min</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Cook Time</p>
              <p className="text-gray-100 font-semibold">{recipe.cookTime} min</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Servings</p>
              <p className="text-gray-100 font-semibold">{recipe.servings}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-4 text-gray-300">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
          
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-700 text-sm text-gray-400">
            <div>Created by: {recipe.createdBy}</div>
            <div>{new Date(recipe.createdAt || '').toLocaleDateString()}</div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <Link 
              to={`/recipes/${recipe.id}/edit`} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Recipe
            </Link>
            <button 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onDelete}
            >
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
