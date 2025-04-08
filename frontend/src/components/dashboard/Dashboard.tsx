import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample recipes data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate loading recipes from an API
    setLoading(true);
    setTimeout(() => {
      setRecipes([
        {
          id: '1',
          title: 'Margherita Pizza',
          description: 'Classic Italian pizza with tomato sauce, mozzarella, and basil',
          imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
          tags: ['Italian', 'Vegetarian']
        },
        {
          id: '2',
          title: 'Chocolate Chip Cookies',
          description: 'Soft and chewy cookies with chocolate chips',
          imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
          tags: ['Dessert', 'Baking']
        },
        {
          id: '3',
          title: 'Chickpea Salad',
          description: 'Refreshing salad with chickpeas, cucumber, tomato, and herbs',
          imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
          tags: ['Salad', 'Vegetarian', 'Healthy']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch (err: any) {
      setError('Failed to log out');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header with navigation */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <div className="text-amber-500 text-2xl font-bold flex items-center mr-8">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D4A76A"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#D4A76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              CookPilot
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-amber-400 font-medium">Dashboard</Link>
              <Link to="/recipes" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">Recipes</Link>
              <Link to="/meal-planner" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">Meal Planner</Link>
              <Link to="/shopping-list" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">Shopping List</Link>
            </nav>
          </div>
          
          {/* User menu */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-md transition-colors duration-200"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {error && <div className="bg-red-900/50 border border-red-700/50 text-red-100 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
        
        {/* Welcome section with decorative elements */}
        <section className="mb-12 relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 opacity-10">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C30 10 10 30 10 50C10 70 30 90 50 90C70 90 90 70 90 50C90 30 70 10 50 10ZM50 80C35 80 20 65 20 50C20 35 35 20 50 20C65 20 80 35 80 50C80 65 65 80 50 80Z" fill="#D4A76A"/>
              <path d="M50 30C40 30 30 40 30 50C30 60 40 70 50 70C60 70 70 60 70 50C70 40 60 30 50 30Z" fill="#D4A76A"/>
            </svg>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-8 border border-amber-700/20 shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-amber-500/10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 bg-amber-500/10 rounded-full"></div>
            
            <h1 className="text-3xl font-bold text-amber-100 mb-2">Welcome to your culinary dashboard</h1>
            <p className="text-gray-400 max-w-3xl">Discover recipes, plan meals, and elevate your cooking experience with intelligent recipe analysis and personalized recommendations.</p>
            
            {/* Search bar with custom styling */}
            <div className="mt-6 max-w-2xl relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search recipes, ingredients, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full py-3 px-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-1 rounded-md transition-colors duration-200">
                Search
              </button>
            </div>
          </div>
        </section>
        
        {/* Recipe section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-100">Your Recipes</h2>
            <Link to="/recipes/new" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Recipe
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <div key={recipe.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gray-700 relative">
                    {recipe.imageUrl ? (
                      <img 
                        src={recipe.imageUrl} 
                        alt={recipe.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <svg className="w-16 h-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Recipe tags */}
                    <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                      {recipe.tags?.map(tag => (
                        <span key={tag} className="bg-gray-900/80 text-amber-400 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-amber-100 mb-1">{recipe.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{recipe.description}</p>
                    <div className="flex justify-between items-center">
                      <Link to={`/recipes/${recipe.id}`} className="text-amber-500 hover:text-amber-400 text-sm font-medium">
                        View Recipe
                      </Link>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No recipes found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or create a new recipe to get started.</p>
              <Link to="/recipes/new" className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Recipe
              </Link>
            </div>
          )}
        </section>
        
        {/* Customize Recipes section */}
        <section className="mb-12">
          <div className="bg-gray-800 rounded-xl p-8 border border-amber-700/20 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-amber-100 mb-4">Customize Recipes</h2>
                <p className="text-gray-400 mb-6">Adjust ingredients, servings, and cooking methods to match your preferences and dietary needs.</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Modify ingredient quantities and substitutions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Scale recipes up or down for different serving sizes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Adjust cooking methods and times</span>
                  </li>
                </ul>
                <Link to="/recipes/customize" className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                  Customize Now
                </Link>
              </div>
              
              <div className="md:w-1/2 bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-amber-100">Recipe Customization</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-md p-4 border border-gray-700">
                    <h4 className="text-amber-400 font-medium mb-2">Salad with Tofu</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Servings</label>
                        <div className="flex items-center">
                          <button className="bg-gray-700 text-gray-300 w-8 h-8 rounded-l flex items-center justify-center">-</button>
                          <input type="text" value="4" className="w-12 h-8 bg-gray-700 border-t border-b border-gray-600 text-center text-gray-200" />
                          <button className="bg-gray-700 text-gray-300 w-8 h-8 rounded-r flex items-center justify-center">+</button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Ingredients</label>
                        <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                          <span>Tofu</span>
                          <div className="flex items-center">
                            <button className="bg-gray-700 text-gray-300 w-6 h-6 rounded-l flex items-center justify-center">-</button>
                            <input type="text" value="200g" className="w-16 h-6 bg-gray-700 border-t border-b border-gray-600 text-center text-gray-200 text-xs" />
                            <button className="bg-gray-700 text-gray-300 w-6 h-6 rounded-r flex items-center justify-center">+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-300">
                          <span>Mixed Greens</span>
                          <div className="flex items-center">
                            <button className="bg-gray-700 text-gray-300 w-6 h-6 rounded-l flex items-center justify-center">-</button>
                            <input type="text" value="150g" className="w-16 h-6 bg-gray-700 border-t border-b border-gray-600 text-center text-gray-200 text-xs" />
                            <button className="bg-gray-700 text-gray-300 w-6 h-6 rounded-r flex items-center justify-center">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick actions section */}
        <section>
          <h2 className="text-2xl font-bold text-amber-100 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-amber-700/30 transition-colors duration-200 group">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors duration-200">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-100 mb-2">Generate Meal Plan</h3>
              <p className="text-gray-400 mb-4">Create a balanced meal plan based on your preferences and dietary needs.</p>
              <Link to="/meal-planner" className="text-amber-500 hover:text-amber-400 font-medium inline-flex items-center">
                Create Plan
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-amber-700/30 transition-colors duration-200 group">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors duration-200">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-100 mb-2">Shopping List</h3>
              <p className="text-gray-400 mb-4">Generate a shopping list based on your selected recipes and meal plans.</p>
              <Link to="/shopping-list" className="text-amber-500 hover:text-amber-400 font-medium inline-flex items-center">
                View List
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-amber-700/30 transition-colors duration-200 group">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors duration-200">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-100 mb-2">Dietary Preferences</h3>
              <p className="text-gray-400 mb-4">Update your dietary preferences and restrictions for personalized recommendations.</p>
              <Link to="/preferences" className="text-amber-500 hover:text-amber-400 font-medium inline-flex items-center">
                Update Preferences
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-amber-500 text-xl font-bold flex items-center mb-4 md:mb-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D4A76A"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#D4A76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              CookPilot
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Contact</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Privacy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Terms</Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CookPilot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
