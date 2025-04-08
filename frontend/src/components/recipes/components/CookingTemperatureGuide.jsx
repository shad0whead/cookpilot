import React, { useState } from 'react';

// Cooking Temperature Guide Component
const CookingTemperatureGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState('meat');
  
  // Temperature guide data
  const temperatureData = {
    meat: [
      { food: 'Beef, Pork, Veal, Lamb (Steaks, Chops, Roasts)', temp: '145°F (63°C)', notes: 'Allow to rest for at least 3 minutes' },
      { food: 'Ground Meats (Beef, Pork, Veal, Lamb)', temp: '160°F (71°C)', notes: 'Cook until no pink remains' },
      { food: 'Poultry (Whole and Parts)', temp: '165°F (74°C)', notes: 'Check temperature in thickest part' },
      { food: 'Ground Poultry', temp: '165°F (74°C)', notes: 'Cook until no pink remains' },
      { food: 'Ham (Fresh or Smoked, Uncooked)', temp: '145°F (63°C)', notes: 'Allow to rest for at least 3 minutes' },
      { food: 'Fully Cooked Ham (To Reheat)', temp: '140°F (60°C)', notes: 'For USDA-inspected plants, 165°F (74°C) for others' }
    ],
    seafood: [
      { food: 'Fish', temp: '145°F (63°C)', notes: 'Until flesh is opaque and separates easily with a fork' },
      { food: 'Shellfish (Shrimp, Lobster, Crab, Scallops)', temp: 'N/A', notes: 'Cook until flesh is pearly or white, and opaque' },
      { food: 'Clams, Oysters, Mussels', temp: 'N/A', notes: 'Cook until shells open during cooking' }
    ],
    eggs: [
      { food: 'Eggs', temp: 'N/A', notes: 'Cook until both the yolk and white are firm' },
      { food: 'Egg Dishes (e.g., Frittata, Quiche)', temp: '160°F (71°C)', notes: 'Cook until center is set' }
    ],
    baked: [
      { food: 'Dense Cakes (e.g., Pound Cake, Fruit Cake)', temp: '210°F (99°C)', notes: 'Internal temperature when fully baked' },
      { food: 'Fluffy Cakes (e.g., Chiffon, Chocolate)', temp: '200°F (93°C)', notes: 'Internal temperature when fully baked' },
      { food: 'Quick Breads (e.g., Muffins, Banana Bread)', temp: '200°F (93°C)', notes: 'Internal temperature when fully baked' },
      { food: 'Yeasted Breads (e.g., Rolls, Buns)', temp: '190°F (88°C)', notes: 'Internal temperature when fully baked' },
      { food: 'Custards (e.g., Flan, Pumpkin Pie)', temp: '170-175°F (77-79°C)', notes: 'Internal temperature when fully baked' },
      { food: 'Cheesecake', temp: '150°F (66°C)', notes: 'For creamy texture without overbaking' }
    ],
    leftovers: [
      { food: 'Leftovers', temp: '165°F (74°C)', notes: 'Reheat thoroughly' },
      { food: 'Casseroles (Containing Meat and Poultry)', temp: '165°F (74°C)', notes: 'Heat until bubbling' }
    ]
  };

  // Category icons and labels
  const categories = [
    { id: 'meat', label: 'Meat & Poultry', icon: '🍗' },
    { id: 'seafood', label: 'Seafood', icon: '🐟' },
    { id: 'eggs', label: 'Eggs', icon: '🥚' },
    { id: 'baked', label: 'Baked Goods', icon: '🍞' },
    { id: 'leftovers', label: 'Leftovers', icon: '🍲' }
  ];

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold text-cream mb-4">Safe Cooking Temperature Guide</h2>
      
      {/* Category Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-md flex items-center transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-amber-700/30 border border-amber-600 text-cream'
                : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-gray-300'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="mr-2">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>
      
      {/* Temperature Guide Table */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-amber-400 font-semibold">Food</th>
                <th className="text-left py-3 px-4 text-amber-400 font-semibold">Safe Temperature</th>
                <th className="text-left py-3 px-4 text-amber-400 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {temperatureData[selectedCategory].map((item, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-700 ${
                    index % 2 === 0 ? 'bg-gray-700/30' : 'bg-gray-700/10'
                  }`}
                >
                  <td className="py-3 px-4 text-cream">{item.food}</td>
                  <td className="py-3 px-4 text-amber-300 font-medium">{item.temp}</td>
                  <td className="py-3 px-4 text-gray-300">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Food Safety Tips */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-amber-400 text-lg font-semibold mb-2">Food Safety Tips</h3>
        <ul className="text-gray-300 space-y-2">
          <li className="flex items-start">
            <span className="text-amber-400 mr-2">•</span>
            <span>Always use a food thermometer to check internal temperatures.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-400 mr-2">•</span>
            <span>Insert thermometer into the thickest part of the food, avoiding bone, fat, or gristle.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-400 mr-2">•</span>
            <span>For certain meats, allow to rest for at least 3 minutes after removing from heat.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-400 mr-2">•</span>
            <span>Oven temperatures can vary, so use an oven thermometer to ensure accuracy.</span>
          </li>
        </ul>
      </div>
      
      {/* Integration with Recipe Substitution */}
      <div className="mt-6 bg-amber-700/20 p-4 rounded-lg border border-amber-600/30">
        <h3 className="text-amber-400 text-lg font-semibold mb-2">Temperature Adjustments for Substitutions</h3>
        <p className="text-gray-300 mb-3">
          When using ingredient substitutions, you may need to adjust cooking temperatures:
        </p>
        <ul className="text-gray-300 space-y-2">
          <li className="flex items-start">
            <span className="text-amber-400 mr-2">•</span>
            <span>For gluten-free flour substitutions, reduce temperature by 25°F and check doneness earlier.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-400 mr-2">•</span>
            <span>When substituting sugar with liquid sweeteners, reduce temperature by 25°F to prevent over-browning.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-400 mr-2">•</span>
            <span>For fat substitutions (like applesauce for butter), check doneness 5-10 minutes earlier than recipe states.</span>
          </li>
        </ul>
        <div className="mt-4">
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
            Open Recipe Substitution Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookingTemperatureGuide;
