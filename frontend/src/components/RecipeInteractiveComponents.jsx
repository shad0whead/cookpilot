import React, { useState } from 'react';
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

// Enhanced Recipe Card Component with full interactivity
const RecipeCard = ({ recipe, onTagClick, onViewNutrition, onViewAIInsights }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Handle tag click
  const handleTagClick = (tag, e) => {
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  // Handle view nutrition
  const handleViewNutrition = (e) => {
    e.stopPropagation();
    if (onViewNutrition) {
      onViewNutrition(recipe.id);
    }
  };

  // Handle view AI insights
  const handleViewAIInsights = (e) => {
    e.stopPropagation();
    if (onViewAIInsights) {
      onViewAIInsights(recipe.id);
    }
  };

  return (
    <div 
      className={`bg-gray-800 rounded-lg border ${isHovered ? 'border-amber-600' : 'border-gray-700'} overflow-hidden transition-all duration-300 transform ${isHovered ? 'scale-[1.02] shadow-lg' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="h-48 bg-gray-700 flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {recipe.id % 2 === 0 ? <CupcakeIcon /> : <BowlIcon />}
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          {recipe.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-amber-700/60 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-amber-600/60 transition-colors duration-200"
              onClick={(e) => handleTagClick(tag, e)}
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
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick && onTagClick(ingredient);
                }}
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button 
            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors duration-200 flex items-center"
            onClick={handleViewNutrition}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Nutrition
          </button>
          <button 
            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors duration-200 flex items-center"
            onClick={handleViewAIInsights}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            AI Insights
          </button>
        </div>
      </div>
      
      {/* Expanded Details Section */}
      {showDetails && (
        <div className="p-4 border-t border-gray-700 bg-gray-800/80">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <h4 className="text-amber-400 text-sm font-medium mb-1">Prep Time:</h4>
              <p className="text-gray-300 text-sm">{recipe.prepTime || "20 mins"}</p>
            </div>
            <div>
              <h4 className="text-amber-400 text-sm font-medium mb-1">Cook Time:</h4>
              <p className="text-gray-300 text-sm">{recipe.cookTime || "30 mins"}</p>
            </div>
            <div>
              <h4 className="text-amber-400 text-sm font-medium mb-1">Difficulty:</h4>
              <p className="text-gray-300 text-sm">{recipe.difficulty || "Medium"}</p>
            </div>
            <div>
              <h4 className="text-amber-400 text-sm font-medium mb-1">Cuisine:</h4>
              <p className="text-gray-300 text-sm">{recipe.cuisine || "American"}</p>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium py-1.5 px-3 rounded transition-colors duration-200">
              Edit Recipe
            </button>
            <button className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors duration-200">
              View Full Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Nutrition Modal Component
const NutritionModal = ({ recipe, onClose }) => {
  if (!recipe) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-cream font-display tracking-wide">NUTRITION FACTS</h3>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <h4 className="text-lg font-semibold text-amber-400 mb-3">{recipe.name}</h4>
        
        <div className="border-b border-gray-700 pb-2 mb-2">
          <div className="text-cream font-bold">Serving Size: 1 portion</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-cream font-bold">Calories</span>
            <span className="text-cream">{recipe.nutrition.calories}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-cream">Total Fat</span>
            <span className="text-cream">{recipe.nutrition.fat}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-cream">Total Carbohydrates</span>
            <span className="text-cream">{recipe.nutrition.carbs}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-cream">Protein</span>
            <span className="text-cream">{recipe.nutrition.protein}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-cream">Sodium</span>
            <span className="text-cream">{recipe.nutrition.sodium || "150mg"}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-cream">Sugars</span>
            <span className="text-cream">{recipe.nutrition.sugars || "15g"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cream">Fiber</span>
            <span className="text-cream">{recipe.nutrition.fiber || "2g"}</span>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-700/50 p-3 rounded-md text-sm text-gray-300">
          <p>* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.</p>
        </div>
        
        <div className="flex justify-end mt-4">
          <button 
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// AI Insights Modal Component
const AIInsightsModal = ({ recipe, onClose }) => {
  if (!recipe) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-cream font-display tracking-wide">AI INSIGHTS</h3>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <h4 className="text-lg font-semibold text-amber-400 mb-3">{recipe.name}</h4>
        
        <div className="bg-amber-700/20 p-4 rounded-lg border border-amber-600/30 mb-4">
          <p className="text-gray-300">{recipe.aiInsights}</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h5 className="text-amber-400 font-medium mb-2">Flavor Profile Analysis</h5>
            <div className="bg-gray-700/50 p-3 rounded-md">
              <p className="text-gray-300 text-sm">This recipe has a balanced sweet-to-savory ratio with dominant notes of {recipe.id % 2 === 0 ? "vanilla and caramel" : "citrus and butter"}. The flavor intensity is {recipe.id % 2 === 0 ? "medium-high" : "medium"} with a {recipe.id % 2 === 0 ? "lingering sweet finish" : "bright, clean finish"}.</p>
            </div>
          </div>
          
          <div>
            <h5 className="text-amber-400 font-medium mb-2">Technique Tips</h5>
            <div className="bg-gray-700/50 p-3 rounded-md">
              <p className="text-gray-300 text-sm">For best results, ensure all ingredients are at room temperature before mixing. {recipe.id % 2 === 0 ? "Don't overmix the batter to keep the texture light." : "Allow the dough to rest for optimal texture development."}</p>
            </div>
          </div>
          
          <div>
            <h5 className="text-amber-400 font-medium mb-2">Pairing Suggestions</h5>
            <div className="bg-gray-700/50 p-3 rounded-md">
              <p className="text-gray-300 text-sm">This recipe pairs well with {recipe.id % 2 === 0 ? "coffee, tea, or vanilla ice cream" : "a light salad, white wine, or fresh berries"}. Consider serving with {recipe.id % 2 === 0 ? "a sprinkle of sea salt to enhance the sweetness" : "a drizzle of honey for added complexity"}.</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button 
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Recipe Grid Component with interactive cards
const RecipeGrid = ({ recipes, onFilterChange }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  
  // Handle tag click for filtering
  const handleTagClick = (tag) => {
    if (onFilterChange) {
      onFilterChange('dietaryTag', tag);
    }
  };
  
  // Handle ingredient click for filtering
  const handleIngredientClick = (ingredient) => {
    if (onFilterChange) {
      onFilterChange('ingredient', ingredient);
    }
  };
  
  // Handle view nutrition
  const handleViewNutrition = (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
      setShowNutrition(true);
    }
  };
  
  // Handle view AI insights
  const handleViewAIInsights = (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
      setShowAIInsights(true);
    }
  };
  
  // Close modals
  const handleCloseModals = () => {
    setShowNutrition(false);
    setShowAIInsights(false);
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onTagClick={handleTagClick}
            onIngredientClick={handleIngredientClick}
            onViewNutrition={handleViewNutrition}
            onViewAIInsights={handleViewAIInsights}
          />
        ))}
      </div>
      
      {/* Empty state */}
      {recipes.length === 0 && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
          <div className="flex justify-center mb-4">
            <StarIcon />
          </div>
          <h3 className="text-lg font-semibold text-cream mb-2">No recipes found</h3>
          <p className="text-gray-400">Try adjusting your search filters or adding a new recipe.</p>
        </div>
      )}
      
      {/* Nutrition Modal */}
      {showNutrition && selectedRecipe && (
        <NutritionModal recipe={selectedRecipe} onClose={handleCloseModals} />
      )}
      
      {/* AI Insights Modal */}
      {showAIInsights && selectedRecipe && (
        <AIInsightsModal recipe={selectedRecipe} onClose={handleCloseModals} />
      )}
    </div>
  );
};

export { RecipeCard, NutritionModal, AIInsightsModal, RecipeGrid };
