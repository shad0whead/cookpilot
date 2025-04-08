import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import RecipeList from '../recipes/components/RecipeList';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-amber-700/30 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-amber-500 text-2xl font-bold flex items-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D4A76A"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#D4A76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              CookPilot
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              {currentUser?.email}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && <div className="bg-red-900/50 border border-red-700/50 text-red-100 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
        
        {/* Welcome Section */}
        <div className="bg-gray-800 rounded-lg shadow-xl border border-amber-700/30 p-6 mb-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 -mt-10 -mr-10 bg-amber-500/5 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 -mb-10 -ml-10 bg-amber-500/5 rounded-full"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-amber-100 mb-2">Welcome to Your Kitchen, {currentUser?.email?.split('@')[0]}</h1>
            <p className="text-gray-400 mb-6">Manage your recipes, plan meals, and explore new culinary adventures</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-amber-600 transition-colors duration-200">
                <div className="text-amber-500 mb-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-amber-100">My Recipes</h3>
                <p className="text-gray-400">Access and manage your recipe collection</p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-amber-600 transition-colors duration-200">
                <div className="text-amber-500 mb-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-amber-100">Create New</h3>
                <p className="text-gray-400">Add a new recipe to your collection</p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-amber-600 transition-colors duration-200">
                <div className="text-amber-500 mb-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-amber-100">Meal Plans</h3>
                <p className="text-gray-400">Plan your meals for the week</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="bg-gray-800 rounded-lg shadow-xl border border-amber-700/30 p-6 mb-8">
          <h2 className="text-2xl font-bold text-amber-100 mb-4">Find Recipes</h2>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              type="text"
              className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Search recipes by name, ingredient, or tag..."
            />
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-amber-700/30 text-amber-200 px-3 py-1 rounded-full text-sm">Breakfast</span>
            <span className="bg-amber-700/30 text-amber-200 px-3 py-1 rounded-full text-sm">Lunch</span>
            <span className="bg-amber-700/30 text-amber-200 px-3 py-1 rounded-full text-sm">Dinner</span>
            <span className="bg-amber-700/30 text-amber-200 px-3 py-1 rounded-full text-sm">Vegetarian</span>
            <span className="bg-amber-700/30 text-amber-200 px-3 py-1 rounded-full text-sm">Quick Meals</span>
          </div>
        </div>
        
        {/* Recent Recipes Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-amber-100">Recent Recipes</h2>
            <Link to="/recipes" className="text-amber-400 hover:text-amber-300 transition-colors duration-200">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Recipe Card 1 */}
            <div className="bg-gray-800 rounded-lg shadow-xl border border-amber-700/30 overflow-hidden hover:border-amber-600 transition-colors duration-200">
              <div className="h-48 bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-500/20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-600/90 text-white text-xs px-2 py-1 rounded">30 min</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-amber-100 mb-1">Creamy Garlic Pasta</h3>
                <p className="text-gray-400 text-sm mb-3">A rich and creamy pasta dish with garlic and herbs.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-gray-400 text-sm ml-1">4.5</span>
                  </div>
                  <span className="text-gray-400 text-sm">Dinner</span>
                </div>
              </div>
            </div>
            
            {/* Recipe Card 2 */}
            <div className="bg-gray-800 rounded-lg shadow-xl border border-amber-700/30 overflow-hidden hover:border-amber-600 transition-colors duration-200">
              <div className="h-48 bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-500/20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-600/90 text-white text-xs px-2 py-1 rounded">15 min</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-amber-100 mb-1">Avocado Toast</h3>
                <p className="text-gray-400 text-sm mb-3">Simple and nutritious breakfast with avocado and whole grain bread.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-gray-400 text-sm ml-1">4.8</span>
                  </div>
                  <span className="text-gray-400 text-sm">Breakfast</span>
                </div>
              </div>
            </div>
            
            {/* Recipe Card 3 */}
            <div className="bg-gray-800 rounded-lg shadow-xl border border-amber-700/30 overflow-hidden hover:border-amber-600 transition-colors duration-200">
              <div className="h-48 bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-500/20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-600/90 text-white text-xs px-2 py-1 rounded">45 min</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-amber-100 mb-1">Chicken Curry</h3>
                <p className="text-gray-400 text-sm mb-3">Spicy and aromatic chicken curry with basmati rice.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-gray-400 text-sm ml-1">4.7</span>
                  </div>
                  <span className="text-gray-400 text-sm">Dinner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cooking Tips Section */}
        <div className="bg-gray-800 rounded-lg shadow-xl border border-amber-700/30 p-6">
          <h2 className="text-2xl font-bold text-amber-100 mb-4">Cooking Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-amber-100 mb-2">Perfect Rice Every Time</h3>
              <p className="text-gray-400">Rinse rice thoroughly before cooking to remove excess starch. Use a 1:2 ratio of rice to water for most varieties.</p>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-amber-100 mb-2">Knife Skills</h3>
              <p className="text-gray-400">Keep your knives sharp for safer and more efficient cutting. The sharper the knife, the less force needed and the less likely you are to slip.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-amber-700/30 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 CookPilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
