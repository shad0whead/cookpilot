import React, { useState } from 'react';
import RecipeSubstitutionCalculator from './RecipeSubstitutionCalculator';
import CookingTemperatureGuide from './CookingTemperatureGuide';

// Integrated Component that combines both features
const CookingToolsIntegrated = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const [showTemperatureGuide, setShowTemperatureGuide] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedSubstitution, setSelectedSubstitution] = useState(null);

  // Sample recipe data
  const recipes = [
    {
      id: 1,
      name: 'Chocolate Chip Cookies',
      portions: 12,
      keyIngredients: ['All-purpose flour', 'Butter', 'Granulated sugar'],
      tags: ['gluten-free', 'holiday', 'keto'],
      image: 'cookie.jpg'
    },
    {
      id: 2,
      name: 'Lemon Tart',
      portions: 8,
      keyIngredients: ['Lemon juice', 'eggs', 'Heavy cream'],
      tags: ['dessert', 'spring', 'pastry'],
      image: 'lemon-tart.jpg'
    }
  ];

  // Handle temperature guide toggle
  const toggleTemperatureGuide = () => {
    setShowTemperatureGuide(!showTemperatureGuide);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowTemperatureGuide(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D4A76A"/>
              <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#D4A76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-2xl font-bold text-cream">CookPilot</h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 border-r border-gray-700">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === 'dashboard' 
                      ? 'bg-amber-700/30 text-cream' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => handleTabChange('dashboard')}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === 'recipes' 
                      ? 'bg-amber-700/30 text-cream' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => handleTabChange('recipes')}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                  </svg>
                  Recipes
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === 'calculator' 
                      ? 'bg-amber-700/30 text-cream' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => handleTabChange('calculator')}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-3.707 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 01-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Substitution Calculator
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === 'temperature' 
                      ? 'bg-amber-700/30 text-cream' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => handleTabChange('temperature')}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"></path>
                  </svg>
                  Temperature Guide
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === 'settings' 
                      ? 'bg-amber-700/30 text-cream' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => handleTabChange('settings')}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                  </svg>
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'recipes' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-cream mb-4">My Recipes</h2>
                
                {/* Search Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="relative">
                    <select className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none pr-8">
                      <option>Ingredient</option>
                      <option>Flour</option>
                      <option>Sugar</option>
                      <option>Butter</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none pr-8">
                      <option>Dietary Tag</option>
                      <option>Gluten-Free</option>
                      <option>Vegan</option>
                      <option>Keto</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none pr-8">
                      <option>Bake Time</option>
                      <option>Under 30 min</option>
                      <option>30-60 min</option>
                      <option>Over 60 min</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none pr-8">
                      <option>Adv. Sec</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200">
                    Advanced Search
                  </button>
                </div>
                
                {/* Recipe Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-cream mb-2">{recipe.name}</h3>
                        <p className="text-gray-400 mb-4">{recipe.portions} portions</p>
                        
                        <div className="mb-4">
                          <h4 className="text-amber-400 font-semibold uppercase text-sm tracking-wider mb-2">
                            {recipe.name === 'Lemon Tart' ? 'Key Ingredient' : 'Key Ingredients'}
                          </h4>
                          <ul className="space-y-1">
                            {recipe.keyIngredients.map((ingredient, idx) => (
                              <li key={idx} className="text-gray-300 flex items-center">
                                <span className="text-amber-400 mr-2">•</span>
                                {ingredient}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {recipe.tags.map((tag, idx) => (
                            <span key={idx} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between">
                          <button className="text-amber-400 hover:text-amber-300 transition-colors duration-200">
                            View Nutrition
                          </button>
                          
                          {recipe.name === 'Lemon Tart' ? (
                            <button className="text-amber-400 hover:text-amber-300 transition-colors duration-200">
                              View AI Insights
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Suggested Recipes */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-cream mb-4">Suggested Recipes</h3>
                  <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 p-6">
                    <h4 className="text-lg font-semibold text-cream mb-2">Mango Cheesecake</h4>
                    <p className="text-gray-400">Try this delicious tropical twist on a classic dessert!</p>
                  </div>
                </div>
                
                {/* Temperature Guide Toggle */}
                <div className="mt-8">
                  <button 
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
                    onClick={toggleTemperatureGuide}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                    {showTemperatureGuide ? 'Hide Temperature Guide' : 'Show Temperature Guide'}
                  </button>
                </div>
                
                {/* Temperature Guide Popup */}
                {showTemperatureGuide && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-cream">Cooking Temperature Guide</h3>
                        <button 
                          className="text-gray-400 hover:text-white transition-colors duration-200"
                          onClick={toggleTemperatureGuide}
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                      <div className="p-6">
                        <CookingTemperatureGuide />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'calculator' && (
            <div>
              <h2 className="text-2xl font-bold text-cream mb-4">Recipe Substitution Calculator</h2>
              <RecipeSubstitutionCalculator />
            </div>
          )}
          
          {activeTab === 'temperature' && (
            <div>
              <h2 className="text-2xl font-bold text-cream mb-4">Cooking Temperature Guide</h2>
              <CookingTemperatureGuide />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CookingToolsIntegrated;
