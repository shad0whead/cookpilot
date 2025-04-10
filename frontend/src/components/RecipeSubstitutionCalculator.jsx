import React, { useState, useEffect } from 'react';
import { 
  EggIcon, 
  WhiskIcon, 
  CupcakeIcon, 
  StarIcon, 
  LeafIcon, 
  BowlIcon, 
  PieChartIcon,
  NoteCardIcon 
} from './CookingIcons';

// Enhanced Recipe Substitution Calculator with Art Assets and Advanced Functionality
const RecipeSubstitutionCalculator = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedSubstitution, setSelectedSubstitution] = useState(null);
  const [recipeBalance, setRecipeBalance] = useState({ flavor: 100, texture: 100, moisture: 100 });
  const [recipeList, setRecipeList] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);
  const [showSubstitutionHistory, setShowSubstitutionHistory] = useState(false);
  const [substitutionHistory, setSubstitutionHistory] = useState([]);
  const [customSubstitution, setCustomSubstitution] = useState({ name: '', ratio: '', impact: '' });
  const [showCustomSubForm, setShowCustomSubForm] = useState(false);
  
  // Sample recipe data
  const recipes = [
    {
      id: 1,
      name: "Classic Chocolate Chip Cookies",
      ingredients: [
        { id: 1, name: "All-purpose flour", amount: "2 1/4 cups", category: "dry" },
        { id: 2, name: "Butter", amount: "1 cup", category: "fat" },
        { id: 3, name: "Granulated sugar", amount: "3/4 cup", category: "sweetener" },
        { id: 4, name: "Brown sugar", amount: "3/4 cup", category: "sweetener" },
        { id: 5, name: "Eggs", amount: "2 large", category: "binding" },
        { id: 6, name: "Vanilla extract", amount: "1 tsp", category: "flavoring" },
        { id: 7, name: "Baking soda", amount: "1 tsp", category: "leavening" },
        { id: 8, name: "Salt", amount: "1/2 tsp", category: "seasoning" },
        { id: 9, name: "Chocolate chips", amount: "2 cups", category: "mix-in" }
      ]
    },
    {
      id: 2,
      name: "Banana Bread",
      ingredients: [
        { id: 1, name: "All-purpose flour", amount: "2 cups", category: "dry" },
        { id: 2, name: "Baking soda", amount: "1 tsp", category: "leavening" },
        { id: 3, name: "Salt", amount: "1/4 tsp", category: "seasoning" },
        { id: 4, name: "Butter", amount: "1/2 cup", category: "fat" },
        { id: 5, name: "Brown sugar", amount: "3/4 cup", category: "sweetener" },
        { id: 6, name: "Eggs", amount: "2 large", category: "binding" },
        { id: 7, name: "Bananas", amount: "3 ripe", category: "fruit" },
        { id: 8, name: "Vanilla extract", amount: "1 tsp", category: "flavoring" },
        { id: 9, name: "Walnuts", amount: "1/2 cup", category: "mix-in" }
      ]
    },
    {
      id: 3,
      name: "Buttermilk Pancakes",
      ingredients: [
        { id: 1, name: "All-purpose flour", amount: "2 cups", category: "dry" },
        { id: 2, name: "Baking powder", amount: "2 tsp", category: "leavening" },
        { id: 3, name: "Baking soda", amount: "1/2 tsp", category: "leavening" },
        { id: 4, name: "Salt", amount: "1/2 tsp", category: "seasoning" },
        { id: 5, name: "Granulated sugar", amount: "3 tbsp", category: "sweetener" },
        { id: 6, name: "Buttermilk", amount: "2 cups", category: "liquid" },
        { id: 7, name: "Eggs", amount: "2 large", category: "binding" },
        { id: 8, name: "Butter", amount: "3 tbsp", category: "fat" },
        { id: 9, name: "Vanilla extract", amount: "1 tsp", category: "flavoring" }
      ]
    }
  ];
  
  // Substitution database
  const substitutionDatabase = {
    "All-purpose flour": [
      { 
        name: "Almond flour", 
        ratio: "1:1", 
        impact: "Creates denser, moister cookies with nutty flavor", 
        balanceEffect: { flavor: +10, texture: -20, moisture: +15 } 
      },
      { 
        name: "Gluten-free flour blend", 
        ratio: "1:1", 
        impact: "Similar texture with xanthan gum, slightly different flavor", 
        balanceEffect: { flavor: -5, texture: -5, moisture: 0 } 
      },
      { 
        name: "Oat flour", 
        ratio: "1:1", 
        impact: "Heartier texture, slightly sweet flavor", 
        balanceEffect: { flavor: +5, texture: -10, moisture: -5 } 
      },
      { 
        name: "Coconut flour", 
        ratio: "1:4", 
        impact: "Very absorbent, requires more liquid, coconut flavor", 
        balanceEffect: { flavor: +15, texture: -15, moisture: -25 } 
      }
    ],
    "Butter": [
      { 
        name: "Coconut oil", 
        ratio: "1:1", 
        impact: "Adds coconut flavor, slightly different texture", 
        balanceEffect: { flavor: +15, texture: -5, moisture: -5 } 
      },
      { 
        name: "Applesauce", 
        ratio: "1:1", 
        impact: "Reduces fat, adds moisture, less rich", 
        balanceEffect: { flavor: -10, texture: -15, moisture: +25 } 
      },
      { 
        name: "Avocado", 
        ratio: "1:1", 
        impact: "Creamy texture, subtle flavor, healthier fats", 
        balanceEffect: { flavor: -5, texture: -5, moisture: +10 } 
      },
      { 
        name: "Greek yogurt", 
        ratio: "1:1", 
        impact: "Tangy flavor, adds protein, reduces fat", 
        balanceEffect: { flavor: +5, texture: -10, moisture: +15 } 
      }
    ],
    "Granulated sugar": [
      { 
        name: "Honey", 
        ratio: "3/4:1", 
        impact: "More moisture, distinct flavor, browns faster", 
        balanceEffect: { flavor: +10, texture: -5, moisture: +15 } 
      },
      { 
        name: "Maple syrup", 
        ratio: "3/4:1", 
        impact: "Adds maple flavor, more moisture", 
        balanceEffect: { flavor: +15, texture: -5, moisture: +15 } 
      },
      { 
        name: "Coconut sugar", 
        ratio: "1:1", 
        impact: "Caramel-like flavor, less sweet", 
        balanceEffect: { flavor: +5, texture: 0, moisture: -5 } 
      },
      { 
        name: "Stevia", 
        ratio: "1/4 tsp per cup of sugar", 
        impact: "Zero calories, very sweet, may have aftertaste", 
        balanceEffect: { flavor: -10, texture: -15, moisture: -20 } 
      }
    ],
    "Brown sugar": [
      { 
        name: "Coconut sugar", 
        ratio: "1:1", 
        impact: "Similar caramel notes, less moisture", 
        balanceEffect: { flavor: 0, texture: -5, moisture: -10 } 
      },
      { 
        name: "Date sugar", 
        ratio: "1:1", 
        impact: "Rich flavor, natural sweetness", 
        balanceEffect: { flavor: +10, texture: -5, moisture: -5 } 
      },
      { 
        name: "Maple sugar", 
        ratio: "1:1", 
        impact: "Distinct maple flavor, similar texture", 
        balanceEffect: { flavor: +15, texture: 0, moisture: -5 } 
      }
    ],
    "Eggs": [
      { 
        name: "Flax eggs", 
        ratio: "1 tbsp ground flax + 3 tbsp water per egg", 
        impact: "Less binding, vegan-friendly, nuttier flavor", 
        balanceEffect: { flavor: -5, texture: -15, moisture: +5 } 
      },
      { 
        name: "Applesauce", 
        ratio: "1/4 cup per egg", 
        impact: "Less structure, more moisture, subtle flavor", 
        balanceEffect: { flavor: -5, texture: -20, moisture: +20 } 
      },
      { 
        name: "Yogurt", 
        ratio: "1/4 cup per egg", 
        impact: "Adds tanginess, maintains moisture", 
        balanceEffect: { flavor: +5, texture: -10, moisture: +5 } 
      },
      { 
        name: "Banana", 
        ratio: "1/2 mashed banana per egg", 
        impact: "Adds banana flavor, good binding", 
        balanceEffect: { flavor: +15, texture: -5, moisture: +10 } 
      }
    ],
    "Chocolate chips": [
      { 
        name: "Cacao nibs", 
        ratio: "1:1", 
        impact: "Less sweet, more bitter, crunchy texture", 
        balanceEffect: { flavor: -10, texture: +5, moisture: -5 } 
      },
      { 
        name: "Chopped nuts", 
        ratio: "1:1", 
        impact: "Different texture, nutty flavor", 
        balanceEffect: { flavor: -5, texture: +10, moisture: -10 } 
      },
      { 
        name: "Dried fruit", 
        ratio: "1:1", 
        impact: "Sweeter, chewy texture, fruity flavor", 
        balanceEffect: { flavor: +15, texture: -5, moisture: +5 } 
      },
      { 
        name: "Carob chips", 
        ratio: "1:1", 
        impact: "Naturally sweet, no caffeine, different flavor", 
        balanceEffect: { flavor: -5, texture: 0, moisture: 0 } 
      }
    ],
    "Buttermilk": [
      { 
        name: "Milk + lemon juice", 
        ratio: "1 cup milk + 1 tbsp lemon juice", 
        impact: "Similar acidity, slightly different flavor", 
        balanceEffect: { flavor: -5, texture: 0, moisture: 0 } 
      },
      { 
        name: "Yogurt + milk", 
        ratio: "3/4 cup yogurt + 1/4 cup milk", 
        impact: "Thicker consistency, tangy flavor", 
        balanceEffect: { flavor: +5, texture: +5, moisture: -5 } 
      },
      { 
        name: "Sour cream + water", 
        ratio: "3/4 cup sour cream + 1/4 cup water", 
        impact: "Rich and tangy, similar acidity", 
        balanceEffect: { flavor: +10, texture: +5, moisture: -5 } 
      }
    ],
    "Bananas": [
      { 
        name: "Applesauce", 
        ratio: "1:1", 
        impact: "Milder flavor, similar moisture", 
        balanceEffect: { flavor: -15, texture: -5, moisture: +5 } 
      },
      { 
        name: "Pumpkin puree", 
        ratio: "1:1", 
        impact: "Earthy flavor, similar moisture", 
        balanceEffect: { flavor: +10, texture: 0, moisture: 0 } 
      },
      { 
        name: "Mashed avocado", 
        ratio: "1:1", 
        impact: "Creamy texture, less sweet, more fat", 
        balanceEffect: { flavor: -15, texture: +5, moisture: -5 } 
      }
    ],
    "Walnuts": [
      { 
        name: "Pecans", 
        ratio: "1:1", 
        impact: "Sweeter, buttery flavor", 
        balanceEffect: { flavor: +5, texture: 0, moisture: 0 } 
      },
      { 
        name: "Almonds", 
        ratio: "1:1", 
        impact: "Milder flavor, similar crunch", 
        balanceEffect: { flavor: -5, texture: +5, moisture: -5 } 
      },
      { 
        name: "Sunflower seeds", 
        ratio: "1:1", 
        impact: "Allergy-friendly, different flavor", 
        balanceEffect: { flavor: -10, texture: +5, moisture: -5 } 
      }
    ]
  };
  
  // Initialize recipe list and selected recipe
  useEffect(() => {
    setRecipeList(recipes);
    setSelectedRecipe(recipes[0]);
  }, []);
  
  // Handle recipe selection
  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setSelectedIngredient(null);
    setSelectedSubstitution(null);
    setRecipeBalance({ flavor: 100, texture: 100, moisture: 100 });
    setShowRecipeSelector(false);
  };
  
  // Handle ingredient selection
  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
    setSelectedSubstitution(null);
    setRecipeBalance({ flavor: 100, texture: 100, moisture: 100 });
  };
  
  // Handle substitution selection
  const handleSubstitutionSelect = (sub) => {
    setSelectedSubstitution(sub);
    setRecipeBalance({
      flavor: 100 + sub.balanceEffect.flavor,
      texture: 100 + sub.balanceEffect.texture,
      moisture: 100 + sub.balanceEffect.moisture
    });
  };
  
  // Apply substitution to recipe
  const handleApplySubstitution = () => {
    if (selectedIngredient && selectedSubstitution) {
      // Add to substitution history
      const newSubstitution = {
        id: Date.now(),
        recipe: selectedRecipe.name,
        original: selectedIngredient.name,
        substitute: selectedSubstitution.name,
        ratio: selectedSubstitution.ratio,
        date: new Date().toLocaleDateString()
      };
      
      setSubstitutionHistory([newSubstitution, ...substitutionHistory]);
      
      // Show success message or modal
      alert(`Successfully substituted ${selectedIngredient.name} with ${selectedSubstitution.name} in ${selectedRecipe.name}`);
      
      // Reset selections
      handleReset();
    }
  };
  
  // Handle custom substitution input
  const handleCustomSubChange = (e) => {
    const { name, value } = e.target;
    setCustomSubstitution({
      ...customSubstitution,
      [name]: value
    });
  };
  
  // Add custom substitution
  const handleAddCustomSub = () => {
    if (customSubstitution.name && customSubstitution.ratio && customSubstitution.impact && selectedIngredient) {
      const newSub = {
        ...customSubstitution,
        balanceEffect: { flavor: 0, texture: 0, moisture: 0 } // Default balance effect
      };
      
      // Add to database if it exists, otherwise create new entry
      if (substitutionDatabase[selectedIngredient.name]) {
        substitutionDatabase[selectedIngredient.name].push(newSub);
      } else {
        substitutionDatabase[selectedIngredient.name] = [newSub];
      }
      
      // Reset form and close
      setCustomSubstitution({ name: '', ratio: '', impact: '' });
      setShowCustomSubForm(false);
      
      // Show success message
      alert(`Added custom substitution: ${newSub.name}`);
    }
  };
  
  // Reset selections
  const handleReset = () => {
    setSelectedIngredient(null);
    setSelectedSubstitution(null);
    setRecipeBalance({ flavor: 100, texture: 100, moisture: 100 });
  };
  
  // Calculate balance indicator classes
  const getBalanceClass = (value) => {
    if (value < 80) return "bg-red-500";
    if (value < 90) return "bg-yellow-500";
    if (value <= 110) return "bg-green-500";
    if (value <= 120) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  // Get cooking adjustment recommendations
  const getCookingAdjustments = () => {
    const adjustments = [];
    
    // Moisture adjustments
    if (recipeBalance.moisture > 120) {
      adjustments.push("Increase baking time by 5-10 minutes to account for extra moisture.");
      adjustments.push("Reduce oven temperature by 25°F to prevent over-browning.");
    } else if (recipeBalance.moisture < 80) {
      adjustments.push("Reduce baking time by 5 minutes to prevent dryness.");
      adjustments.push("Consider adding 2-3 tablespoons of liquid (milk, water, oil) to the recipe.");
    }
    
    // Flavor adjustments
    if (recipeBalance.flavor < 90) {
      adjustments.push("Consider adding 1/2 tsp more vanilla or spices to enhance flavor.");
      adjustments.push("A pinch of salt can help bring out the remaining flavors.");
    } else if (recipeBalance.flavor > 110) {
      adjustments.push("You may want to reduce other flavorings slightly to balance the recipe.");
    }
    
    // Texture adjustments
    if (recipeBalance.texture < 80) {
      adjustments.push("Add 1/4 tsp xanthan gum or 1 tbsp cornstarch to improve structure.");
      adjustments.push("Let the batter/dough rest longer before baking to develop structure.");
    }
    
    return adjustments.length > 0 ? adjustments : ["No major adjustments needed for this substitution."];
  };
  
  return (
    <div className="p-8 bg-gray-900 rounded-lg relative overflow-hidden">
      {/* Decorative cooking elements */}
      <div className="absolute -right-10 -top-10 opacity-20 transform rotate-12">
        <WhiskIcon />
      </div>
      <div className="absolute left-10 -bottom-10 opacity-20">
        <EggIcon />
      </div>
      <div className="absolute right-20 bottom-10 opacity-20">
        <LeafIcon />
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-cream font-display tracking-wide">RECIPE SUBSTITUTION CALCULATOR</h2>
        <div className="flex space-x-2">
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-4 rounded transition-colors duration-200 flex items-center"
            onClick={() => setShowSubstitutionHistory(!showSubstitutionHistory)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            History
          </button>
        </div>
      </div>
      
      <p className="text-gray-300 mb-8 max-w-3xl">
        Customize your recipes by substituting ingredients while maintaining balance. 
        Select an ingredient to see possible substitutions and how they affect your recipe.
      </p>
      
      {/* Recipe Selector */}
      <div className="mb-8">
        <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="mr-3 text-amber-400">
              <NoteCardIcon />
            </div>
            <div>
              <h3 className="text-xl font-bold text-cream font-display tracking-wide">CURRENT RECIPE</h3>
              <p className="text-gray-400">{selectedRecipe ? selectedRecipe.name : "Select a recipe"}</p>
            </div>
          </div>
          <button 
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
            onClick={() => setShowRecipeSelector(!showRecipeSelector)}
          >
            Change Recipe
          </button>
        </div>
        
        {/* Recipe Selector Dropdown */}
        {showRecipeSelector && (
          <div className="mt-2 bg-gray-800 p-4 rounded-lg border border-gray-700 absolute z-10 w-full max-w-3xl">
            <h4 className="text-lg font-semibold text-amber-400 mb-3">Select a Recipe</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {recipeList.map((recipe) => (
                <button
                  key={recipe.id}
                  className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                    selectedRecipe && selectedRecipe.id === recipe.id
                      ? 'bg-amber-700/30 border border-amber-600'
                      : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                  }`}
                  onClick={() => handleRecipeSelect(recipe)}
                >
                  <div className="text-cream font-medium">{recipe.name}</div>
                  <div className="text-gray-400 text-sm">{recipe.ingredients.length} ingredients</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Substitution History Modal */}
      {showSubstitutionHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-cream font-display tracking-wide">SUBSTITUTION HISTORY</h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowSubstitutionHistory(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {substitutionHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Recipe</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Original</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Substitute</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Ratio</th>
                      <th className="text-left py-3 px-4 text-amber-400 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {substitutionHistory.map((sub) => (
                      <tr key={sub.id} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-cream">{sub.recipe}</td>
                        <td className="py-3 px-4 text-cream">{sub.original}</td>
                        <td className="py-3 px-4 text-amber-300">{sub.substitute}</td>
                        <td className="py-3 px-4 text-gray-300">{sub.ratio}</td>
                        <td className="py-3 px-4 text-gray-300">{sub.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <StarIcon />
                </div>
                <p className="text-gray-300">No substitution history yet. Start substituting ingredients to build your history.</p>
              </div>
            )}
            
            <div className="flex justify-end mt-4">
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-4 rounded transition-colors duration-200"
                onClick={() => setShowSubstitutionHistory(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recipe Ingredients Panel */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="mr-3 text-amber-400">
              <BowlIcon />
            </div>
            <h3 className="text-xl font-bold text-cream font-display tracking-wide">RECIPE INGREDIENTS</h3>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-amber-400 mb-2">{selectedRecipe ? selectedRecipe.name : ""}</h4>
          </div>
          
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {selectedRecipe && selectedRecipe.ingredients.map((ingredient) => (
              <button
                key={ingredient.id}
                className={`w-full text-left p-3 rounded-md transition-colors duration-200 flex items-center ${
                  selectedIngredient && selectedIngredient.id === ingredient.id
                    ? 'bg-amber-700/30 border border-amber-600'
                    : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                }`}
                onClick={() => handleIngredientSelect(ingredient)}
              >
                <span className="text-amber-400 mr-2">•</span>
                <div>
                  <div className="text-cream font-medium">{ingredient.name}</div>
                  <div className="text-gray-400 text-sm">{ingredient.amount}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Substitution Options Panel */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="mr-3 text-amber-400">
              <StarIcon />
            </div>
            <h3 className="text-xl font-bold text-cream font-display tracking-wide">SUBSTITUTION OPTIONS</h3>
          </div>
          
          {selectedIngredient ? (
            <>
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-amber-400 mb-1">
                  Substitutes for {selectedIngredient.name}
                </h4>
                <p className="text-gray-400 text-sm">
                  Select an alternative to see how it affects your recipe
                </p>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {substitutionDatabase[selectedIngredient.name]?.map((sub, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                      selectedSubstitution && selectedSubstitution.name === sub.name
                        ? 'bg-amber-700/30 border border-amber-600'
                        : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                    }`}
                    onClick={() => handleSubstitutionSelect(sub)}
                  >
                    <div className="font-medium text-cream">{sub.name}</div>
                    <div className="text-amber-400 text-sm mt-1">Ratio: {sub.ratio}</div>
                    <div className="text-gray-300 text-sm mt-1">{sub.impact}</div>
                  </button>
                ))}
                
                {/* Add custom substitution button */}
                <button
                  className="w-full text-left p-3 rounded-md transition-colors duration-200 bg-gray-700/30 hover:bg-gray-700 border border-gray-600 border-dashed"
                  onClick={() => setShowCustomSubForm(true)}
                >
                  <div className="font-medium text-gray-400 flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Custom Substitution
                  </div>
                </button>
              </div>
              
              {/* Custom Substitution Form */}
              {showCustomSubForm && (
                <div className="mt-4 bg-gray-700/30 p-4 rounded-md border border-gray-600">
                  <h5 className="text-amber-400 font-medium mb-3">Add Custom Substitution</h5>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Substitution Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={customSubstitution.name}
                        onChange={handleCustomSubChange}
                        className="bg-gray-700 text-gray-200 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
                        placeholder="e.g., Coconut Flour"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Substitution Ratio</label>
                      <input 
                        type="text" 
                        name="ratio"
                        value={customSubstitution.ratio}
                        onChange={handleCustomSubChange}
                        className="bg-gray-700 text-gray-200 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
                        placeholder="e.g., 1:4"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Impact Description</label>
                      <input 
                        type="text" 
                        name="impact"
                        value={customSubstitution.impact}
                        onChange={handleCustomSubChange}
                        className="bg-gray-700 text-gray-200 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
                        placeholder="e.g., Adds nutty flavor, denser texture"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button 
                        className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-1.5 px-3 rounded text-sm transition-colors duration-200"
                        onClick={() => setShowCustomSubForm(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-1.5 px-3 rounded text-sm transition-colors duration-200"
                        onClick={handleAddCustomSub}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <CupcakeIcon />
              <p className="text-gray-400 mt-4">
                Select an ingredient from the recipe to see substitution options
              </p>
            </div>
          )}
        </div>
        
        {/* Recipe Balance Panel */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="mr-3 text-amber-400">
              <PieChartIcon />
            </div>
            <h3 className="text-xl font-bold text-cream font-display tracking-wide">RECIPE BALANCE</h3>
          </div>
          
          {selectedSubstitution ? (
            <>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-amber-400 mb-1">
                  Substituting with {selectedSubstitution.name}
                </h4>
                <p className="text-gray-400 text-sm">
                  Here's how this substitution affects your recipe balance
                </p>
              </div>
              
              <div className="space-y-6 mb-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-cream">Flavor Balance</span>
                    <span className={`font-medium ${
                      recipeBalance.flavor < 90 || recipeBalance.flavor > 110 
                        ? 'text-yellow-400' 
                        : 'text-green-400'
                    }`}>
                      {recipeBalance.flavor}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${getBalanceClass(recipeBalance.flavor)}`}
                      style={{ width: `${Math.min(100, recipeBalance.flavor)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-cream">Texture Balance</span>
                    <span className={`font-medium ${
                      recipeBalance.texture < 90 || recipeBalance.texture > 110 
                        ? 'text-yellow-400' 
                        : 'text-green-400'
                    }`}>
                      {recipeBalance.texture}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${getBalanceClass(recipeBalance.texture)}`}
                      style={{ width: `${Math.min(100, recipeBalance.texture)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-cream">Moisture Balance</span>
                    <span className={`font-medium ${
                      recipeBalance.moisture < 90 || recipeBalance.moisture > 110 
                        ? 'text-yellow-400' 
                        : 'text-green-400'
                    }`}>
                      {recipeBalance.moisture}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${getBalanceClass(recipeBalance.moisture)}`}
                      style={{ width: `${Math.min(100, recipeBalance.moisture)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700/50 p-4 rounded-md border border-gray-600 mb-6">
                <h5 className="text-amber-400 font-medium mb-2">Cooking Adjustments</h5>
                <ul className="text-gray-300 text-sm space-y-2">
                  {getCookingAdjustments().map((adjustment, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-400 mr-2 mt-1">•</span>
                      <span>{adjustment}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between">
                <button 
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-4 rounded transition-colors duration-200"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button 
                  className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                  onClick={handleApplySubstitution}
                >
                  Apply Substitution
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <PieChartIcon />
              <p className="text-gray-400 mt-4">
                Select a substitution to see how it affects your recipe balance
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* AI Suggestions */}
      <div className="mt-8 bg-amber-700/20 p-6 rounded-lg border border-amber-600/30">
        <div className="flex items-center mb-4">
          <div className="mr-3 text-amber-400">
            <StarIcon />
          </div>
          <h3 className="text-xl font-bold text-cream font-display tracking-wide">AI SUBSTITUTION INSIGHTS</h3>
        </div>
        
        {selectedSubstitution ? (
          <div className="text-gray-300">
            <p className="mb-4">
              <span className="text-amber-400 font-medium">AI Analysis:</span> Substituting {selectedIngredient?.name} with {selectedSubstitution.name} will 
              {recipeBalance.flavor > 105 ? " enhance the flavor profile" : recipeBalance.flavor < 95 ? " slightly reduce the flavor intensity" : " maintain a similar flavor profile"} and 
              {recipeBalance.texture > 105 ? " create a firmer texture" : recipeBalance.texture < 95 ? " result in a softer texture" : " maintain a similar texture"}.
            </p>
            <p>
              This substitution is {
                (recipeBalance.flavor >= 90 && recipeBalance.flavor <= 110 && 
                 recipeBalance.texture >= 90 && recipeBalance.texture <= 110 && 
                 recipeBalance.moisture >= 90 && recipeBalance.moisture <= 110) 
                  ? "excellent for this recipe and should work well with minimal adjustments." 
                  : (recipeBalance.flavor >= 80 && recipeBalance.flavor <= 120 && 
                     recipeBalance.texture >= 80 && recipeBalance.texture <= 120 && 
                     recipeBalance.moisture >= 80 && recipeBalance.moisture <= 120)
                    ? "good for this recipe but may require some minor adjustments."
                    : "challenging for this recipe and will require significant adjustments to maintain balance."
              }
            </p>
          </div>
        ) : (
          <p className="text-gray-300">
            Select an ingredient and substitution to receive AI insights on how it will affect your recipe.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeSubstitutionCalculator;
