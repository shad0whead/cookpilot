import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  tags?: string[];
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {recipe.imageUrl && (
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-100 mb-2">{recipe.title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags?.map((tag) => (
            <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          {recipe.prepTime && <span>Prep: {recipe.prepTime} min</span>}
          {recipe.cookTime && <span>Cook: {recipe.cookTime} min</span>}
          {recipe.servings && <span>Serves: {recipe.servings}</span>}
        </div>
        
        <Link 
          to={`/recipes/${recipe.id}`} 
          className="block text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        // Fetch from the backend API
        const response = await fetch('https://cookpilot-backend.onrender.com/api/recipes', {
          headers: {
            'Authorization': `Bearer ${await currentUser?.getIdToken()}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match our frontend Recipe interface
        const transformedRecipes: Recipe[] = data.map((recipe: any) => ({
          id: recipe.id || recipe._id,
          title: recipe.title || recipe.name,
          description: recipe.description,
          imageUrl: recipe.media && recipe.media.length > 0 ? recipe.media[0] : undefined,
          prepTime: recipe.prep_time,
          cookTime: recipe.cook_time,
          servings: recipe.servings,
          tags: recipe.tags
        }));
        
        setRecipes(transformedRecipes);
        
        // Get recent recipes (last 3)
        setRecentRecipes(transformedRecipes.slice(0, 3));
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        
        // Fallback to mock data if API fails
        const mockRecipes: Recipe[] = [
          {
            id: '1',
            title: 'Spaghetti Carbonara',
            description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
            imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
            prepTime: 10,
            cookTime: 15,
            servings: 4,
            tags: ['pasta', 'italian', 'dinner']
          },
          {
            id: '2',
            title: 'Chicken Tikka Masala',
            description: 'Grilled chicken chunks in a creamy sauce with Indian spices.',
            imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
            prepTime: 20,
            cookTime: 30,
            servings: 4,
            tags: ['chicken', 'indian', 'curry', 'dinner']
          },
          {
            id: '3',
            title: 'Avocado Toast',
            description: 'Simple and delicious breakfast with mashed avocado on toasted bread.',
            imageUrl: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
            prepTime: 5,
            cookTime: 5,
            servings: 1,
            tags: ['breakfast', 'vegetarian', 'quick']
          }
        ];
        
        setRecipes(mockRecipes);
        setRecentRecipes(mockRecipes);
        setError('Failed to fetch recipes from the server. Showing sample recipes instead.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      <nav className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-500">CookPilot</h1>
              <div className="ml-10 hidden md:flex space-x-4">
                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">Dashboard</Link>
                <Link to="/recipes" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">Recipes</Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-300 mr-4">{currentUser?.email}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
          <div className="flex space-x-4">
            <Link 
              to="/recipes/new" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add New Recipe
            </Link>
            <Link 
              to="/recipes" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              View All Recipes
            </Link>
          </div>
        </div>
        
        {error && (
          <div className="text-center py-4 text-amber-500 bg-amber-900/30 rounded mb-6">{error}</div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Total Recipes</h2>
            <p className="text-3xl font-bold text-green-500">{recipes.length}</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Recipe Categories</h2>
            <p className="text-3xl font-bold text-blue-500">
              {Array.from(new Set(recipes.flatMap(r => r.tags || []))).length}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Recent Activity</h2>
            <p className="text-3xl font-bold text-purple-500">
              {recentRecipes.length} updates
            </p>
          </div>
        </div>
        
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-100">Recent Recipes</h2>
            <Link to="/recipes" className="text-green-400 hover:text-green-300">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Recipe Tools</h2>
            <div className="space-y-3">
              <p className="text-gray-300">Access our professional chef tools:</p>
              <ul className="space-y-2">
                {recipes.length > 0 && (
                  <>
                    <li>
                      <Link to={`/recipes/${recipes[0].id}/scale`} className="text-blue-400 hover:text-blue-300 flex items-center">
                        Recipe Scaling Calculator
                      </Link>
                    </li>
                    <li>
                      <Link to={`/recipes/${recipes[0].id}/ingredients`} className="text-blue-400 hover:text-blue-300 flex items-center">
                        Ingredient Replacement
                      </Link>
                    </li>
                    <li>
                      <Link to={`/recipes/${recipes[0].id}/nutrition`} className="text-blue-400 hover:text-blue-300 flex items-center">
                        Nutrition Information
                      </Link>
                    </li>
                    <li>
                      <Link to={`/recipes/${recipes[0].id}/export`} className="text-blue-400 hover:text-blue-300 flex items-center">
                        Export & Share
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(recipes.flatMap(r => r.tags || []))).slice(0, 10).map((tag) => (
                <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
