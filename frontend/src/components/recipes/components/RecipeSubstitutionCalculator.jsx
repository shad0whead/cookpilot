import React, { useState } from 'react';

// Recipe Substitution Calculator Component
const RecipeSubstitutionCalculator = () => {
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [substitutionOptions, setSubstitutionOptions] = useState([]);
  const [selectedSubstitution, setSelectedSubstitution] = useState('');
  const [recipeBalance, setRecipeBalance] = useState(100);

  // Sample recipe ingredients
  const recipeIngredients = [
    { name: 'All-purpose flour', amount: '2 cups', category: 'dry' },
    { name: 'Granulated sugar', amount: '1 cup', category: 'dry' },
    { name: 'Butter', amount: '1/2 cup', category: 'fat' },
    { name: 'Eggs', amount: '2 large', category: 'binding' },
    { name: 'Vanilla extract', amount: '1 tsp', category: 'flavoring' },
    { name: 'Chocolate chips', amount: '1 cup', category: 'add-in' }
  ];

  // Sample substitution database
  const substitutionDatabase = {
    'All-purpose flour': [
      { name: 'Whole wheat flour', ratio: '1:1', impact: 'Denser texture, nuttier flavor', balanceEffect: -5 },
      { name: 'Gluten-free flour blend', ratio: '1:1', impact: 'Different texture, may need xanthan gum', balanceEffect: -10 },
      { name: 'Almond flour', ratio: '1:1', impact: 'More moist, less structure', balanceEffect: -15 }
    ],
    'Granulated sugar': [
      { name: 'Brown sugar', ratio: '1:1', impact: 'More moisture, caramel notes', balanceEffect: -5 },
      { name: 'Honey', ratio: '3/4:1', impact: 'More moisture, different flavor', balanceEffect: -10 },
      { name: 'Maple syrup', ratio: '3/4:1', impact: 'More moisture, maple flavor', balanceEffect: -10 }
    ],
    'Butter': [
      { name: 'Coconut oil', ratio: '1:1', impact: 'Different flavor, similar texture', balanceEffect: -5 },
      { name: 'Olive oil', ratio: '3/4:1', impact: 'Different flavor, more moist', balanceEffect: -10 },
      { name: 'Applesauce', ratio: '1:1', impact: 'Less fat, more moist', balanceEffect: -15 }
    ],
    'Eggs': [
      { name: 'Flax eggs', ratio: '1 tbsp flax + 3 tbsp water per egg', impact: 'Less binding, vegan-friendly', balanceEffect: -10 },
      { name: 'Banana', ratio: '1/2 banana per egg', impact: 'Adds banana flavor, different texture', balanceEffect: -15 },
      { name: 'Yogurt', ratio: '1/4 cup per egg', impact: 'More moisture, less binding', balanceEffect: -10 }
    ],
    'Chocolate chips': [
      { name: 'Cacao nibs', ratio: '1:1', impact: 'Less sweet, more bitter', balanceEffect: -5 },
      { name: 'Chopped nuts', ratio: '1:1', impact: 'Different texture, nutty flavor', balanceEffect: -10 },
      { name: 'Dried fruit', ratio: '1:1', impact: 'Sweeter, chewy texture', balanceEffect: -10 }
    ]
  };

  // Handle ingredient selection
  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient.name);
    setSubstitutionOptions(substitutionDatabase[ingredient.name] || []);
    setSelectedSubstitution('');
    setRecipeBalance(100); // Reset balance
  };

  // Handle substitution selection
  const handleSubstitutionSelect = (substitution) => {
    setSelectedSubstitution(substitution);
    setRecipeBalance(100 + substitution.balanceEffect);
  };

  // Get balance color based on recipe balance value
  const getBalanceColor = () => {
    if (recipeBalance >= 90) return '#D4A76A'; // Amber - good balance
    if (recipeBalance >= 75) return '#A3B18A'; // Olive - moderate balance
    return '#E57373'; // Red - poor balance
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold text-cream mb-4">Recipe Substitution Calculator</h2>
      
      {/* Recipe Ingredients */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-amber-400 text-lg font-semibold mb-2">Recipe Ingredients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {recipeIngredients.map((ingredient, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                selectedIngredient === ingredient.name 
                  ? 'bg-amber-700/30 border border-amber-600' 
                  : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
              }`}
              onClick={() => handleIngredientSelect(ingredient)}
            >
              <div className="flex justify-between">
                <span className="text-cream font-medium">{ingredient.name}</span>
                <span className="text-gray-300">{ingredient.amount}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Category: {ingredient.category}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Substitution Options */}
      {selectedIngredient && (
        <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-amber-400 text-lg font-semibold mb-2">
            Substitution Options for {selectedIngredient}
          </h3>
          <div className="space-y-3">
            {substitutionOptions.map((option, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                  selectedSubstitution === option 
                    ? 'bg-amber-700/30 border border-amber-600' 
                    : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                }`}
                onClick={() => handleSubstitutionSelect(option)}
              >
                <div className="flex justify-between">
                  <span className="text-cream font-medium">{option.name}</span>
                  <span className="text-gray-300">Ratio: {option.ratio}</span>
                </div>
                <div className="text-sm text-gray-300 mt-1">{option.impact}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Balance Effect: <span className={option.balanceEffect < 0 ? 'text-amber-400' : 'text-green-400'}>
                    {option.balanceEffect > 0 ? `+${option.balanceEffect}` : option.balanceEffect}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recipe Balance Indicator */}
      {selectedSubstitution && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-amber-400 text-lg font-semibold mb-2">Recipe Balance</h3>
          <div className="flex items-center mb-2">
            <div className="w-full bg-gray-700 rounded-full h-4 mr-2">
              <div 
                className="h-4 rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.max(0, recipeBalance)}%`,
                  backgroundColor: getBalanceColor()
                }}
              ></div>
            </div>
            <span className="text-cream font-medium min-w-[3rem]">{recipeBalance}%</span>
          </div>
          
          <div className="p-3 rounded bg-gray-700/50 mt-4">
            <h4 className="text-amber-400 font-medium mb-1">Substitution Impact</h4>
            <p className="text-gray-300 text-sm">
              {recipeBalance >= 90 
                ? 'This substitution will work well in your recipe with minimal adjustments needed.'
                : recipeBalance >= 75
                ? 'This substitution will work but may require some adjustments to cooking time or other ingredients.'
                : 'This substitution significantly changes your recipe. Consider adding balancing ingredients.'}
            </p>
            
            {recipeBalance < 90 && (
              <div className="mt-3">
                <h4 className="text-amber-400 font-medium mb-1">Suggested Adjustments</h4>
                <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
                  {recipeBalance < 75 && (
                    <li>Add 1/4 tsp xanthan gum to improve structure</li>
                  )}
                  {recipeBalance < 85 && (
                    <li>Reduce baking temperature by 25°F</li>
                  )}
                  <li>Check doneness 5 minutes earlier than recipe states</li>
                  <li>Consider adjusting liquid ingredients by ±2 tablespoons</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSubstitutionCalculator;
