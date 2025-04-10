import React, { useState, useEffect } from 'react';
import { StarIcon } from './CookingIcons';

// Enhanced AI Recipe Analysis Component
const AIRecipeAnalysis = ({ recipe }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate AI analysis loading
  useEffect(() => {
    if (recipe) {
      setLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        setAnalysis(generateMockAnalysis(recipe));
        setLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [recipe]);

  // Generate mock AI analysis based on recipe
  const generateMockAnalysis = (recipe) => {
    // This would be replaced with actual AI API calls in production
    return {
      overview: `This ${recipe.name.toLowerCase()} recipe has a well-balanced flavor profile with a good mix of ${getRandomIngredients(recipe)}. The cooking method ensures proper texture development while maintaining moisture.`,
      nutritionInsights: [
        `This recipe provides approximately ${recipe.nutrition.calories} calories per serving, which is ${recipe.nutrition.calories > 300 ? 'on the higher side' : 'relatively light'}.`,
        `The ${recipe.nutrition.fat} of fat per serving is ${parseInt(recipe.nutrition.fat) > 10 ? 'significant' : 'moderate'}, primarily coming from ${getRandomFatSource(recipe)}.`,
        `With ${recipe.nutrition.protein} of protein, this recipe ${parseInt(recipe.nutrition.protein) > 10 ? 'is a good protein source' : 'provides moderate protein'}.`,
        `The carbohydrate content (${recipe.nutrition.carbs}) is ${parseInt(recipe.nutrition.carbs) > 30 ? 'substantial' : 'moderate'}, making this recipe ${parseInt(recipe.nutrition.carbs) > 30 ? 'energy-dense' : 'suitable for balanced diets'}.`
      ],
      cookingTips: [
        `For best results, ensure all ingredients are at ${recipe.id % 2 === 0 ? 'room temperature' : 'the proper temperature as specified'} before beginning.`,
        `${recipe.tags.includes('baking') ? 'Do not overmix the batter to avoid developing too much gluten.' : 'Ensure proper heat management throughout the cooking process.'}`,
        `${recipe.keyIngredients.some(i => i.includes('flour')) ? 'Measure flour by weight rather than volume for consistent results.' : 'Season at each stage of cooking for layered flavor development.'}`,
        `Allow the ${recipe.name.toLowerCase()} to ${recipe.tags.includes('baking') ? 'cool properly before serving' : 'rest for a few minutes before serving'} to allow flavors to settle.`
      ],
      substitutionSuggestions: [
        {
          original: getRandomIngredient(recipe),
          substitute: getRandomSubstitute(),
          impact: "Minimal flavor change, similar texture"
        },
        {
          original: getRandomIngredient(recipe),
          substitute: getRandomSubstitute(),
          impact: "Lighter flavor profile, slightly different texture"
        },
        {
          original: getRandomIngredient(recipe),
          substitute: getRandomSubstitute(),
          impact: "More robust flavor, similar consistency"
        }
      ],
      pairingRecommendations: [
        `This ${recipe.name.toLowerCase()} pairs excellently with ${getRandomPairing(recipe)}.`,
        `For a complete meal, consider serving with ${getRandomPairing(recipe)}.`,
        `A ${recipe.tags.includes('dessert') ? 'cup of coffee or tea' : 'glass of ' + (recipe.tags.includes('meat') ? 'red wine' : 'white wine')} would complement this dish nicely.`
      ]
    };
  };

  // Helper functions for generating mock analysis
  const getRandomIngredients = (recipe) => {
    if (recipe.keyIngredients.length >= 2) {
      const ing1 = recipe.keyIngredients[0].toLowerCase();
      const ing2 = recipe.keyIngredients[1].toLowerCase();
      return `${ing1} and ${ing2}`;
    }
    return recipe.keyIngredients[0].toLowerCase();
  };

  const getRandomIngredient = (recipe) => {
    return recipe.keyIngredients[Math.floor(Math.random() * recipe.keyIngredients.length)];
  };

  const getRandomFatSource = (recipe) => {
    const fatSources = ['butter', 'oil', 'nuts', 'dairy', 'animal fats'];
    if (recipe.keyIngredients.some(i => i.includes('butter'))) return 'butter';
    if (recipe.keyIngredients.some(i => i.includes('oil'))) return 'oil';
    return fatSources[Math.floor(Math.random() * fatSources.length)];
  };

  const getRandomSubstitute = () => {
    const substitutes = ['Greek yogurt', 'almond flour', 'coconut sugar', 'honey', 'maple syrup', 'olive oil', 'applesauce', 'flax egg', 'aquafaba', 'nutritional yeast'];
    return substitutes[Math.floor(Math.random() * substitutes.length)];
  };

  const getRandomPairing = (recipe) => {
    const pairings = {
      dessert: ['vanilla ice cream', 'fresh berries', 'whipped cream', 'caramel sauce', 'hot coffee'],
      meat: ['roasted vegetables', 'mashed potatoes', 'green salad', 'steamed rice', 'crusty bread'],
      vegetarian: ['quinoa pilaf', 'crusty bread', 'side salad', 'roasted vegetables', 'hummus'],
      breakfast: ['fresh fruit', 'yogurt', 'coffee', 'orange juice', 'hash browns'],
      default: ['side salad', 'crusty bread', 'steamed vegetables', 'rice pilaf', 'roasted potatoes']
    };
    
    for (const tag of recipe.tags) {
      if (pairings[tag]) {
        const options = pairings[tag];
        return options[Math.floor(Math.random() * options.length)];
      }
    }
    
    const defaultOptions = pairings.default;
    return defaultOptions[Math.floor(Math.random() * defaultOptions.length)];
  };

  if (!recipe) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
        <p className="text-gray-400">Select a recipe to see AI analysis</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center mb-4">
        <div className="mr-3 text-amber-400">
          <StarIcon />
        </div>
        <h3 className="text-xl font-bold text-cream font-display tracking-wide">AI RECIPE ANALYSIS</h3>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
          <p className="text-gray-300">Analyzing recipe...</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-amber-400 mb-2 font-display tracking-wide">{recipe.name}</h4>
            <p className="text-gray-300">{analysis.overview}</p>
          </div>
          
          {/* Analysis Tabs */}
          <div className="border-b border-gray-700 mb-6">
            <nav className="flex space-x-4">
              <button
                className={`py-2 px-3 font-medium text-sm rounded-t-md transition-colors duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-gray-700 text-cream border-t border-l border-r border-gray-600'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`py-2 px-3 font-medium text-sm rounded-t-md transition-colors duration-200 ${
                  activeTab === 'nutrition'
                    ? 'bg-gray-700 text-cream border-t border-l border-r border-gray-600'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('nutrition')}
              >
                Nutrition Insights
              </button>
              <button
                className={`py-2 px-3 font-medium text-sm rounded-t-md transition-colors duration-200 ${
                  activeTab === 'tips'
                    ? 'bg-gray-700 text-cream border-t border-l border-r border-gray-600'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('tips')}
              >
                Cooking Tips
              </button>
              <button
                className={`py-2 px-3 font-medium text-sm rounded-t-md transition-colors duration-200 ${
                  activeTab === 'substitutions'
                    ? 'bg-gray-700 text-cream border-t border-l border-r border-gray-600'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('substitutions')}
              >
                Substitutions
              </button>
              <button
                className={`py-2 px-3 font-medium text-sm rounded-t-md transition-colors duration-200 ${
                  activeTab === 'pairings'
                    ? 'bg-gray-700 text-cream border-t border-l border-r border-gray-600'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('pairings')}
              >
                Pairings
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="bg-gray-700/30 p-4 rounded-md border border-gray-600">
            {activeTab === 'overview' && (
              <div>
                <p className="text-gray-300 mb-4">{analysis.overview}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-3 rounded-md">
                    <h5 className="text-amber-400 font-medium mb-2 font-display tracking-wide">FLAVOR PROFILE</h5>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-300 text-sm w-24">Sweetness:</span>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${30 + (recipe.id * 15) % 70}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-300 text-sm w-24">Saltiness:</span>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${20 + (recipe.id * 10) % 60}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-300 text-sm w-24">Richness:</span>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${40 + (recipe.id * 20) % 60}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-300 text-sm w-24">Acidity:</span>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${15 + (recipe.id * 25) % 50}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-md">
                    <h5 className="text-amber-400 font-medium mb-2 font-display tracking-wide">TEXTURE PROFILE</h5>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-300 text-sm w-24">Crispness:</span>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${25 + (recipe.id * 15) % 75}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-300 text-sm w-24">Creaminess:</span>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${35 + (recipe.id * 20) % 65}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-300 text-sm w-24">Tenderness:</span>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${45 + (recipe.id * 10) % 55}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-300 text-sm w-24">Moisture:</span>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${30 + (recipe.id * 15) % 70}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'nutrition' && (
              <div>
                <ul className="space-y-3">
                  {analysis.nutritionInsights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-400 mr-2 mt-1">•</span>
                      <span className="text-gray-300">{insight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-3 rounded-md">
                    <h5 className="text-amber-400 font-medium mb-2 font-display tracking-wide">MACRONUTRIENT BALANCE</h5>
                    <div className="flex items-center justify-center h-32">
                      {/* Simple pie chart visualization */}
                      <div className="relative w-32 h-32">
                        <div className="absolute inset-0 rounded-full bg-amber-600" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 0, 50% 0)' }}></div>
                        <div className="absolute inset-0 rounded-full bg-green-600" style={{ clipPath: 'polygon(50% 50%, 50% 0, 0 0, 0 50%)' }}></div>
                        <div className="absolute inset-0 rounded-full bg-blue-600" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 100%, 50% 100%)' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gray-800"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-around mt-2 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-600 rounded-full mr-1"></div>
                        <span className="text-gray-300">Carbs</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-600 rounded-full mr-1"></div>
                        <span className="text-gray-300">Protein</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
                        <span className="text-gray-300">Fat</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-md">
                    <h5 className="text-amber-400 font-medium mb-2 font-display tracking-wide">NUTRITIONAL HIGHLIGHTS</h5>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex justify-between">
                        <span>Calories per serving:</span>
                        <span className="font-medium">{recipe.nutrition.calories}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Protein:</span>
                        <span className="font-medium">{recipe.nutrition.protein}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Carbohydrates:</span>
                        <span className="font-medium">{recipe.nutrition.carbs}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Fat:</span>
                        <span className="font-medium">{recipe.nutrition.fat}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Fiber:</span>
                        <span className="font-medium">{recipe.nutrition.fiber || '2g'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'tips' && (
              <div>
                <ul className="space-y-3">
                  {analysis.cookingTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-400 mr-2 mt-1">•</span>
                      <span className="text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 bg-amber-700/20 p-4 rounded-md border border-amber-600/30">
                  <h5 className="text-amber-400 font-medium mb-2 font-display tracking-wide">CHEF'S SECRET</h5>
                  <p className="text-gray-300 text-sm">
                    {recipe.id % 2 === 0 
                      ? `For the perfect ${recipe.name.toLowerCase()}, try adding a pinch of sea salt at the very end to enhance all the flavors.` 
                      : `The key to this ${recipe.name.toLowerCase()} is patience - don't rush the cooking process and allow the flavors to develop fully.`}
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'substitutions' && (
              <div>
                <p className="text-gray-300 mb-4">Our AI suggests these ingredient substitutions that maintain the recipe's balance:</p>
                <div className="space-y-4">
                  {analysis.substitutionSuggestions.map((sub, index) => (
                    <div key={index} className="bg-gray-700/50 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-gray-300">Replace </span>
                          <span className="text-cream font-medium">{sub.original}</span>
                          <span className="text-gray-300"> with </span>
                          <span className="text-amber-400 font-medium">{sub.substitute}</span>
                        </div>
                        <span className="bg-amber-700/40 text-amber-300 text-xs px-2 py-1 rounded">AI Suggested</span>
                      </div>
                      <p className="text-gray-400 text-sm">{sub.impact}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 font-display tracking-wide">
                    View More Substitutions
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'pairings' && (
              <div>
                <ul className="space-y-3 mb-4">
                  {analysis.pairingRecommendations.map((pairing, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-400 mr-2 mt-1">•</span>
                      <span className="text-gray-300">{pairing}</span>
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-3 rounded-md">
                    <h5 className="text-amber-400 font-medium mb-2 font-display tracking-wide">BEVERAGE PAIRINGS</h5>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-amber-400 mr-2">•</span>
                        <span>{recipe.tags.includes('dessert') ? 'Coffee (medium roast)' : recipe.tags.includes('spicy') ? 'Lager beer' : 'White wine (Chardonnay)'}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-400 mr-2">•</span>
                        <span>{recipe.tags.includes('dessert') ? 'Tea (Earl Grey)' : recipe.tags.includes('meat') ? 'Red wine (Cabernet)' : 'Sparkling water with lemon'}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-400 mr-2">•</span>
                        <span>{recipe.tags.includes('breakfast') ? 'Fresh orange juice' : recipe.tags.includes('spicy') ? 'Milk or yogurt drink' : 'Iced tea'}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-md">
                    <h5 className="text-amber-400 font-medium mb-2 font-display tracking-wide">COMPLEMENTARY DISHES</h5>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-amber-400 mr-2">•</span>
                        <span>{recipe.tags.includes('dessert') ? 'Fresh fruit platter' : recipe.tags.includes('main') ? 'Simple green salad' : 'Crusty artisan bread'}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-400 mr-2">•</span>
                        <span>{recipe.tags.includes('dessert') ? 'Cheese board' : recipe.tags.includes('light') ? 'Hearty soup' : 'Roasted seasonal vegetables'}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-400 mr-2">•</span>
                        <span>{recipe.tags.includes('breakfast') ? 'Yogurt parfait' : recipe.tags.includes('dinner') ? 'Garlic bread' : 'Fresh herb garnish'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// AI Cooking Assistant Component
const AICookingAssistant = () => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI cooking assistant. Ask me anything about recipes, cooking techniques, or ingredient substitutions.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Handle query submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user message to conversation
    setConversation([...conversation, { role: 'user', content: query }]);
    
    // Clear input and show typing indicator
    setQuery('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const response = generateAIResponse(query);
      setConversation(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  // Generate mock AI response
  const generateAIResponse = (query) => {
    // This would be replaced with actual AI API calls in production
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('substitute') || lowerQuery.includes('replacement') || lowerQuery.includes('instead of')) {
      return "For substitutions, I recommend considering the function of the ingredient in the recipe. For example, if you need to substitute butter, you could use oil for moisture, applesauce for moisture with less fat, or coconut oil for a different flavor profile. The best substitute depends on what you're making and your dietary preferences.";
    }
    
    if (lowerQuery.includes('temperature') || lowerQuery.includes('how hot') || lowerQuery.includes('how long')) {
      return "Cooking temperatures and times vary by recipe and ingredient. For meat, use a food thermometer to ensure safe internal temperatures: 165°F (74°C) for poultry, 160°F (71°C) for ground meats, and 145°F (63°C) for whole cuts with a 3-minute rest time. For baking, follow your recipe closely as temperatures typically range from 325°F to 425°F (163°C to 218°C).";
    }
    
    if (lowerQuery.includes('gluten-free') || lowerQuery.includes('gluten free')) {
      return "For gluten-free baking, I recommend using a blend of gluten-free flours rather than a single type. A good all-purpose gluten-free blend typically contains rice flour, potato starch, and tapioca starch. Adding xanthan gum (about 1/4 teaspoon per cup of flour) helps improve texture. Also, gluten-free batters often benefit from a bit more liquid and longer rest times.";
    }
    
    if (lowerQuery.includes('vegan') || lowerQuery.includes('plant-based') || lowerQuery.includes('plant based')) {
      return "For vegan cooking, eggs can be replaced with flax eggs (1 tbsp ground flaxseed + 3 tbsp water per egg), applesauce, or commercial egg replacers. Dairy milk can be substituted with almond, soy, oat, or coconut milk. For butter, try plant-based butters, coconut oil, or olive oil depending on the recipe. Nutritional yeast adds a cheesy flavor to dishes without dairy.";
    }
    
    if (lowerQuery.includes('fluffy') || lowerQuery.includes('moist') || lowerQuery.includes('texture')) {
      return "For fluffy baked goods, make sure your leavening agents (baking powder/soda) are fresh, don't overmix the batter (which develops gluten and makes things tough), and ensure your oven is properly preheated. For moist results, consider adding ingredients like yogurt, applesauce, or an extra egg yolk. Room temperature ingredients also incorporate better than cold ones.";
    }
    
    // Default responses for other queries
    const defaultResponses = [
      "That's a great cooking question! The key is to focus on balanced flavors and proper technique. Start with quality ingredients and take your time with the preparation steps. Would you like more specific advice about a particular aspect?",
      "From a culinary perspective, I'd recommend focusing on building layers of flavor throughout the cooking process. Season at each stage, taste as you go, and adjust accordingly. The difference between good and great cooking often comes down to these small details.",
      "When approaching this in the kitchen, remember that cooking is both an art and a science. Understanding the 'why' behind techniques helps you adapt recipes to your taste. For example, searing meat before slow-cooking creates deeper flavors through the Maillard reaction.",
      "I'd suggest experimenting with different herbs and spices to find combinations you enjoy. Fresh herbs are typically added near the end of cooking, while dried herbs and spices benefit from being added earlier to allow their flavors to develop fully."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center mb-4">
        <div className="mr-3 text-amber-400">
          <StarIcon />
        </div>
        <h3 className="text-xl font-bold text-cream font-display tracking-wide">AI COOKING ASSISTANT</h3>
      </div>
      
      <div className="bg-gray-700/30 rounded-md border border-gray-600 mb-4 h-80 overflow-y-auto p-4">
        {conversation.map((message, index) => (
          <div 
            key={index} 
            className={`mb-3 ${message.role === 'user' ? 'text-right' : ''}`}
          >
            <div 
              className={`inline-block rounded-lg px-4 py-2 max-w-3/4 ${
                message.role === 'user' 
                  ? 'bg-amber-700/30 text-cream' 
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="mb-3">
            <div className="inline-block rounded-lg px-4 py-2 bg-gray-700 text-gray-300">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex">
        <input 
          type="text" 
          className="bg-gray-700 text-gray-200 px-4 py-2 rounded-l-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent flex-grow"
          placeholder="Ask about cooking, recipes, or substitutions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-md transition-colors duration-200 font-display tracking-wide"
        >
          Ask
        </button>
      </form>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button 
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs py-1 px-2 rounded transition-colors duration-200"
          onClick={() => setQuery("What can I substitute for eggs?")}
        >
          Egg substitutes?
        </button>
        <button 
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs py-1 px-2 rounded transition-colors duration-200"
          onClick={() => setQuery("How do I make fluffy pancakes?")}
        >
          Fluffy pancakes?
        </button>
        <button 
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs py-1 px-2 rounded transition-colors duration-200"
          onClick={() => setQuery("Gluten-free baking tips?")}
        >
          Gluten-free tips?
        </button>
      </div>
    </div>
  );
};

export { AIRecipeAnalysis, AICookingAssistant };
