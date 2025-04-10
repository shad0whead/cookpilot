import React, { useState } from 'react';
import RecipeSubstitutionCalculator from './RecipeSubstitutionCalculator';
import CookingTemperatureGuide from './CookingTemperatureGuide';
import { 
  EggIcon, 
  WhiskIcon, 
  CupcakeIcon, 
  StarIcon, 
  LeafIcon, 
  BowlIcon, 
  SpoonIcon,
  NoteCardIcon
} from './CookingIcons';

// Integrated Component that combines both features with enhanced styling
const CookingToolsIntegrated = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const [showTemperatureGuide, setShowTemperatureGuide] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    ingredient: '',
    dietaryTag: '',
    bakeTime: '',
    advSection: ''
  });

  // Sample recipe data
  const recipes = [
    {
      id: 1,
      name: 'Chocolate Chip Cookies',
      portions: 12,
      keyIngredients: ['All-purpose flour', 'Butter', 'Granulated sugar'],
      tags: ['gluten-free', 'holiday', 'keto'],
      image: 'cookie.jpg',
      aiInsights: 'These cookies have a perfect balance of sweetness and texture. Try adding a pinch of sea salt on top before baking for enhanced flavor contrast.',
      nutrition: {
        calories: 150,
        fat: '7g',
        carbs: '22g',
        protein: '2g'
      }
    },
    {
      id: 2,
      name: 'Lemon Tart',
      portions: 8,
      keyIngredients: ['Lemon juice', 'Eggs', 'Heavy cream'],
      tags: ['dessert', 'spring', 'pastry'],
      image: 'lemon-tart.jpg',
      aiInsights: 'The acidity of the lemons pairs perfectly with the buttery crust. For extra brightness, add 1/2 teaspoon of lemon zest to the filling.',
      nutrition: {
        calories: 320,
        fat: '18g',
        carbs: '35g',
        protein: '5g'
      }
    },
    {
      id: 3,
      name: 'Vegetable Stir Fry',
      portions: 4,
      keyIngredients: ['Bell peppers', 'Broccoli', 'Tofu'],
      tags: ['vegan', 'quick', 'healthy'],
      image: 'stir-fry.jpg',
      aiInsights: 'This stir fry has a perfect balance of textures. For extra protein, consider adding cashews or peanuts in the last minute of cooking.',
      nutrition: {
        calories: 220,
        fat: '8g',
        carbs: '25g',
        protein: '15g'
      }
    },
    {
      id: 4,
      name: 'Sourdough Bread',
      portions: 10,
      keyIngredients: ['Sourdough starter', 'Bread flour', 'Salt'],
      tags: ['baking', 'artisan', 'bread'],
      image: 'sourdough.jpg',
      aiInsights: 'Your hydration ratio is perfect for an open crumb. Try cold fermenting the dough overnight for enhanced flavor development.',
      nutrition: {
        calories: 180,
        fat: '1g',
        carbs: '36g',
        protein: '6g'
      }
    }
  ];

  // Handle temperature guide toggle
  const toggleTemperatureGuide = () => {
    setShowTemperatureGuide(!showTemperatureGuide);
  };

  // Handle advanced search toggle
  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowTemperatureGuide(false);
    setShowAdvancedSearch(false);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value
    });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
    console.log('With filters:', selectedFilters);
  };

  // Handle view nutrition
  const handleViewNutrition = (recipeId) => {
    // Implement view nutrition functionality
    console.log('Viewing nutrition for recipe:', recipeId);
  };

  // Handle view AI insights
  const handleViewAIInsights = (recipeId) => {
    // Implement view AI insights functionality
    console.log('Viewing AI insights for recipe:', recipeId);
  };

  // Filter recipes based on search and filters
  const filteredRecipes = recipes.filter(recipe => {
    let matchesSearch = true;
    let matchesIngredient = true;
    let matchesDietaryTag = true;
    let matchesBakeTime = true;
    let matchesAdvSection = true;

    // Search query filter
    if (searchQuery) {
      matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     recipe.keyIngredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Ingredient filter
    if (selectedFilters.ingredient) {
      matchesIngredient = recipe.keyIngredients.some(ing => 
        ing.toLowerCase().includes(selectedFilters.ingredient.toLowerCase())
      );
    }

    // Dietary tag filter
    if (selectedFilters.dietaryTag) {
      matchesDietaryTag = recipe.tags.includes(selectedFilters.dietaryTag.toLowerCase());
    }

    // For demo purposes, other filters are not fully implemented
    
    return matchesSearch && matchesIngredient && matchesDietaryTag && 
           matchesBakeTime && matchesAdvSection;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <CupcakeIcon />
            </div>
            <h1 className="text-2xl font-bold text-cream font-display tracking-wide">COOKPILOT</h1>
          </div>
          <div className="relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search recipes..."
                className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-64"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
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
                  <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <NoteCardIcon />
                  </div>
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
                  <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <StarIcon />
                  </div>
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
                  <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <SpoonIcon />
                  </div>
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
                <h2 className="text-2xl font-bold text-cream mb-4 font-display tracking-wide">MY RECIPES</h2>
                
                {/* Search Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="relative">
                    <select 
                      className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none pr-8"
                      value={selectedFilters.ingredient}
                      onChange={(e) => handleFilterChange('ingredient', e.target.value)}
                    >
                      <option value="">Ingredient</option>
                      <option value="Flour">Flour</option>
                      <option value="Sugar">Sugar</option>
                      <option value="Butter">Butter</option>
                      <option value="Eggs">Eggs</option>
                      <option value="Lemon">Lemon</option>
                      <option value="Tofu">Tofu</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select 
                      className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none pr-8"
                      value={selectedFilters.dietaryTag}
                      onChange={(e) => handleFilterChange('dietaryTag', e.target.value)}
                    >
                      <option value="">Dietary Tag</option>
                      <option value="Gluten-Free">Gluten-Free</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Keto">Keto</option>
                      <option value="Healthy">Healthy</option>
                      <option value="Quick">Quick</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select 
                      className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none pr-8"
                      value={selectedFilters.bakeTime}
                      onChange={(e) => handleFilterChange('bakeTime', e.target.value)}
                    >
                      <option value="">Bake Time</option>
                      <option value="under30">Under 30 min</option>
                      <option value="30to60">30-60 min</option>
                      <option value="over60">Over 60 min</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select 
                      className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none pr-8"
                      value={selectedFilters.advSection}
                      onChange={(e) => handleFilterChange('advSection', e.target.value)}
                    >
                      <option value="">Adv. Sec</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <button 
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    onClick={toggleAdvancedSearch}
                  >
                    Advanced Search
                  </button>
                </div>
                
                {/* Advanced Search Modal */}
                {showAdvancedSearch && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-2xl w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-cream font-display tracking-wide">ADVANCED SEARCH</h3>
                        <button 
                          className="text-gray-400 hover:text-white"
                          onClick={toggleAdvancedSearch}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-gray-300 mb-2">Ingredients (include)</label>
                          <input 
                            type="text" 
                            className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
                            placeholder="e.g., chicken, garlic"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2">Ingredients (exclude)</label>
                          <input 
                            type="text" 
                            className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
                            placeholder="e.g., nuts, dairy"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2">Cuisine Type</label>
                          <select className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full">
                            <option value="">Any Cuisine</option>
                            <option value="italian">Italian</option>
                            <option value="mexican">Mexican</option>
                            <option value="asian">Asian</option>
                            <option value="french">French</option>
                            <option value="mediterranean">Mediterranean</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2">Meal Type</label>
                          <select className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full">
                            <option value="">Any Meal</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="dessert">Dessert</option>
                            <option value="snack">Snack</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2">Cooking Time (max)</label>
                          <select className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full">
                            <option value="">Any Time</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2+ hours</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2">Calories (max)</label>
                          <select className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full">
                            <option value="">Any Calories</option>
                            <option value="200">Under 200</option>
                            <option value="400">Under 400</option>
                            <option value="600">Under 600</option>
                            <option value="800">Under 800</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button 
                          className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-4 rounded transition-colors duration-200 mr-2"
                          onClick={toggleAdvancedSearch}
                        >
                          Cancel
                        </button>
                        <button 
                          className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                          onClick={() => {
                            // Implement advanced search
                            toggleAdvancedSearch();
                          }}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Recipe Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                      <div className="h-48 bg-gray-700 flex items-center justify-center relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {recipe.id % 2 === 0 ? <CupcakeIcon /> : <BowlIcon />}
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-1">
                          {recipe.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="bg-amber-700/60 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-amber-600/60 transition-colors duration-200"
                              onClick={() => handleFilterChange('dietaryTag', tag)}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-cream mb-2">{recipe.name}</h3>
                        <div className="text-sm text-gray-400 mb-3">
                          <span>Serves: {recipe.portions}</span>
                        </div>
                        <div className="mb-3">
                          <h4 className="text-amber-400 text-sm font-medium mb-1">Key Ingredients:</h4>
                          <div className="flex flex-wrap gap-1">
                            {recipe.keyIngredients.map((ingredient, index) => (
                              <span 
                                key={index} 
                                className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                                onClick={() => handleFilterChange('ingredient', ingredient)}
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <button 
                            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors duration-200"
                            onClick={() => handleViewNutrition(recipe.id)}
                          >
                            View Nutrition
                          </button>
                          <button 
                            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors duration-200"
                            onClick={() => handleViewAIInsights(recipe.id)}
                          >
                            View AI Insights
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredRecipes.length === 0 && (
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
                    <div className="flex justify-center mb-4">
                      <StarIcon />
                    </div>
                    <h3 className="text-lg font-semibold text-cream mb-2">No recipes found</h3>
                    <p className="text-gray-400">Try adjusting your search filters or adding a new recipe.</p>
                  </div>
                )}
              </div>
              
              {/* Suggested Recipes */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-cream mb-4 font-display tracking-wide">SUGGESTED FOR YOU</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="h-32 bg-gray-700 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <LeafIcon />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-cream mb-2">Avocado Toast</h3>
                      <div className="text-sm text-gray-400 mb-2">
                        <span>Quick breakfast • 10 min</span>
                      </div>
                      <div className="text-amber-400 text-sm">AI Recommended</div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="h-32 bg-gray-700 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <WhiskIcon />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-cream mb-2">Mushroom Risotto</h3>
                      <div className="text-sm text-gray-400 mb-2">
                        <span>Dinner • 45 min</span>
                      </div>
                      <div className="text-amber-400 text-sm">Based on your preferences</div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="h-32 bg-gray-700 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CupcakeIcon />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-cream mb-2">Blueberry Muffins</h3>
                      <div className="text-sm text-gray-400 mb-2">
                        <span>Breakfast • 30 min</span>
                      </div>
                      <div className="text-amber-400 text-sm">Trending now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'calculator' && (
            <RecipeSubstitutionCalculator />
          )}
          
          {activeTab === 'temperature' && (
            <CookingTemperatureGuide />
          )}
          
          {activeTab === 'dashboard' && (
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-cream mb-4 font-display tracking-wide">DASHBOARD</h2>
              <p className="text-gray-300">Welcome to your CookPilot dashboard. Here you can see your recent activity and cooking stats.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <h3 className="text-amber-400 font-semibold mb-2">Recent Recipes</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex justify-between">
                      <span>Chocolate Chip Cookies</span>
                      <span className="text-gray-400">2 days ago</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Lemon Tart</span>
                      <span className="text-gray-400">5 days ago</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Vegetable Stir Fry</span>
                      <span className="text-gray-400">1 week ago</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <h3 className="text-amber-400 font-semibold mb-2">Favorite Ingredients</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex justify-between">
                      <span>Butter</span>
                      <span className="text-gray-400">12 recipes</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Eggs</span>
                      <span className="text-gray-400">9 recipes</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Flour</span>
                      <span className="text-gray-400">8 recipes</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <h3 className="text-amber-400 font-semibold mb-2">Cooking Stats</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex justify-between">
                      <span>Total Recipes</span>
                      <span className="text-gray-400">24</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Favorite Cuisine</span>
                      <span className="text-gray-400">Italian</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Most Cooked</span>
                      <span className="text-gray-400">Pasta</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-cream mb-4 font-display tracking-wide">AI COOKING ASSISTANT</h3>
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-300 mb-4">Ask me anything about cooking, recipes, or ingredient substitutions!</p>
                  <div className="flex">
                    <input 
                      type="text" 
                      className="bg-gray-700 text-gray-200 px-4 py-2 rounded-l-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent flex-grow"
                      placeholder="e.g., How do I make fluffy pancakes?"
                    />
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-md transition-colors duration-200">
                      Ask
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-cream mb-4 font-display tracking-wide">SETTINGS</h2>
              <p className="text-gray-300 mb-6">Customize your CookPilot experience.</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-3">Account Settings</h3>
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Display Name</label>
                      <input 
                        type="text" 
                        className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
                        defaultValue="CookPilot User"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
                        defaultValue="user@example.com"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-3">Preferences</h3>
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Dark Mode</span>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-amber-600">
                        <label className="absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform bg-white rounded-full cursor-pointer translate-x-6"></label>
                        <input type="checkbox" className="opacity-0 w-0 h-0" checked readOnly />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Email Notifications</span>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-gray-600">
                        <label className="absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform bg-white rounded-full cursor-pointer"></label>
                        <input type="checkbox" className="opacity-0 w-0 h-0" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Default Measurement System</label>
                      <select className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full">
                        <option value="us">US (cups, oz, °F)</option>
                        <option value="metric">Metric (g, ml, °C)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-3">AI Assistant Settings</h3>
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Enable AI Recipe Suggestions</span>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-amber-600">
                        <label className="absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform bg-white rounded-full cursor-pointer translate-x-6"></label>
                        <input type="checkbox" className="opacity-0 w-0 h-0" checked readOnly />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">AI Suggestion Frequency</label>
                      <select className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full">
                        <option value="high">High (Daily)</option>
                        <option value="medium">Medium (Weekly)</option>
                        <option value="low">Low (Monthly)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-4 rounded transition-colors duration-200 mr-2">
                    Cancel
                  </button>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CookingToolsIntegrated;
