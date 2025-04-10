import React, { useState } from 'react';
import { 
  WhiskIcon, 
  CupcakeIcon, 
  StarIcon, 
  SpoonIcon 
} from './CookingIcons';

// Enhanced Cooking Temperature Guide with Art Assets
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
    <div className="p-8 bg-gray-900 rounded-lg relative overflow-hidden">
      {/* Decorative cooking elements */}
      <div className="absolute -right-10 -top-10 opacity-20 transform rotate-12">
        <WhiskIcon />
      </div>
      <div className="absolute left-10 -bottom-10 opacity-20">
        <CupcakeIcon />
      </div>
      <div className="absolute right-20 bottom-10 opacity-20">
        <StarIcon />
      </div>
      
      <h2 className="text-3xl font-bold text-cream mb-6 font-display tracking-wide">COOKING TEMPERATURE GUIDE</h2>
      <p className="text-gray-300 mb-8 max-w-3xl">
        Use this guide to ensure your food reaches safe internal temperatures.
        Proper cooking temperatures are essential for food safety and best results.
      </p>
      
      {/* Category Selection */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-3 rounded-md flex items-center transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-amber-700/30 border border-amber-600 text-cream'
                : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-gray-300'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="mr-2 text-xl">{category.icon}</span>
            <span className="font-display tracking-wide">{category.label}</span>
          </button>
        ))}
      </div>
      
      {/* Temperature Guide Table */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-amber-400 font-semibold font-display tracking-wide">FOOD</th>
                <th className="text-left py-3 px-4 text-amber-400 font-semibold font-display tracking-wide">SAFE TEMPERATURE</th>
                <th className="text-left py-3 px-4 text-amber-400 font-semibold font-display tracking-wide">NOTES</th>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="mr-3 text-amber-400">
              <StarIcon />
            </div>
            <h3 className="text-xl font-bold text-cream font-display tracking-wide">FOOD SAFETY TIPS</h3>
          </div>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-start">
              <span className="text-amber-400 mr-2 mt-1">•</span>
              <span>Always use a food thermometer to check internal temperatures.</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2 mt-1">•</span>
              <span>Insert thermometer into the thickest part of the food, avoiding bone, fat, or gristle.</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2 mt-1">•</span>
              <span>For certain meats, allow to rest for at least 3 minutes after removing from heat.</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2 mt-1">•</span>
              <span>Oven temperatures can vary, so use an oven thermometer to ensure accuracy.</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="mr-3 text-amber-400">
              <SpoonIcon />
            </div>
            <h3 className="text-xl font-bold text-cream font-display tracking-wide">SUBSTITUTION TIPS</h3>
          </div>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-start">
              <span className="text-amber-400 mr-2 mt-1">•</span>
              <span>For gluten-free flour substitutions, reduce temperature by 25°F and check doneness earlier.</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2 mt-1">•</span>
              <span>When substituting sugar with liquid sweeteners, reduce temperature by 25°F to prevent over-browning.</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2 mt-1">•</span>
              <span>For fat substitutions (like applesauce for butter), check doneness 5-10 minutes earlier than recipe states.</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2 mt-1">•</span>
              <span>When using egg substitutes, you may need to increase leavening agents slightly.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CookingTemperatureGuide;
