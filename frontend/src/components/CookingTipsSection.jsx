import React, { useState } from 'react';
import { 
  CookingThemedCard, 
  DecorativeCorner, 
  CookingBadge,
  WhiskIcon,
  EggIcon,
  CupcakeIcon,
  StarIcon,
  HerbIcon
} from './CookingIcons';

const CookingTipsSection = () => {
  const [activeCategory, setActiveCategory] = useState('seasonal');
  
  return (
    <div className="relative bg-gray-800 rounded-lg border border-amber-700/30 p-6 shadow-lg mb-8">
      <DecorativeCorner position="top-right" />
      <DecorativeCorner position="bottom-left" />
      
      {/* Header with prominent styling */}
      <div className="flex items-center mb-6 border-b border-amber-700/30 pb-4">
        <div className="bg-amber-900/50 p-2 rounded-lg mr-3">
          <WhiskIcon size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-amber-100">Smart Cooking Tips</h2>
          <p className="text-gray-400">Personalized advice based on your cooking style</p>
        </div>
        <div className="ml-auto">
          <CookingBadge text="AI Enhanced" icon="star" className="bg-amber-900/50" />
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap border-b border-gray-700 mb-6">
        <CategoryTab 
          icon={<StarIcon size={16} />}
          label="Seasonal"
          isActive={activeCategory === 'seasonal'}
          onClick={() => setActiveCategory('seasonal')}
        />
        <CategoryTab 
          icon={<CupcakeIcon size={16} />}
          label="Technique"
          isActive={activeCategory === 'technique'}
          onClick={() => setActiveCategory('technique')}
        />
        <CategoryTab 
          icon={<EggIcon size={16} />}
          label="Ingredient"
          isActive={activeCategory === 'ingredient'}
          onClick={() => setActiveCategory('ingredient')}
        />
        <CategoryTab 
          icon={<HerbIcon size={16} />}
          label="Equipment"
          isActive={activeCategory === 'equipment'}
          onClick={() => setActiveCategory('equipment')}
        />
      </div>
      
      {/* Content based on active category */}
      <div>
        {activeCategory === 'seasonal' && <SeasonalTips />}
        {activeCategory === 'technique' && <TechniqueTips />}
        {activeCategory === 'ingredient' && <IngredientTips />}
        {activeCategory === 'equipment' && <EquipmentTips />}
      </div>
    </div>
  );
};

const CategoryTab = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 font-medium text-sm focus:outline-none ${
        isActive 
          ? 'text-amber-400 border-b-2 border-amber-400' 
          : 'text-gray-400 hover:text-amber-300'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className="mr-2">{icon}</span>
        {label}
      </div>
    </button>
  );
};

const SeasonalTips = () => {
  return (
    <div>
      <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-3">
          <StarIcon size={20} className="text-amber-400 mr-2" />
          <h3 className="text-lg font-medium text-amber-100">Spring Cooking Tips</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Based on your location and the current season, here are some personalized tips to enhance your cooking.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <TipCard 
          title="Asparagus is in Season"
          content="Try roasting asparagus with olive oil, salt, and a squeeze of lemon. The natural sugars caramelize beautifully when roasted at 425°F for 12-15 minutes."
          icon="herb"
        />
        
        <TipCard 
          title="Strawberry Season Begins"
          content="For the best flavor, store strawberries unwashed and stem-on in a single layer. Only wash them right before eating to prevent them from becoming soggy."
          icon="cupcake"
        />
      </div>
      
      <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-700/30">
        <div className="flex items-center mb-2">
          <EggIcon size={20} className="text-amber-400 mr-2" />
          <h3 className="text-lg font-medium text-amber-100">Personalized Seasonal Suggestion</h3>
        </div>
        <p className="text-gray-300 mb-3">
          Based on your recent recipes and the spring season, we think you might enjoy:
        </p>
        <div className="flex items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-amber-800/30 rounded-lg flex items-center justify-center mr-3">
            <HerbIcon size={24} />
          </div>
          <div>
            <h4 className="text-amber-100 font-medium">Spring Pea Risotto with Fresh Herbs</h4>
            <p className="text-xs text-gray-400">Matches your preference for Italian cuisine</p>
          </div>
          <div className="ml-auto">
            <CookingBadge text="Try Now" icon="star" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TechniqueTips = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TipCard 
        title="Perfect Searing Technique"
        content="For a perfect sear, ensure your pan is very hot before adding the meat. Pat the meat dry with paper towels first, as moisture prevents proper browning."
        icon="whisk"
      />
      
      <TipCard 
        title="Knife Sharpening Reminder"
        content="A sharp knife is safer than a dull one. If you haven't sharpened your knives recently, now might be a good time. A sharp knife requires less force and gives you more control."
        icon="star"
      />
      
      <TipCard 
        title="Resting Meat After Cooking"
        content="Always rest your meat after cooking. For steaks and chops, 5-7 minutes is ideal. For larger roasts, aim for 10-20 minutes. This allows juices to redistribute throughout the meat."
        icon="egg"
      />
      
      <TipCard 
        title="Salting Vegetables Before Roasting"
        content="Salt your vegetables after roasting, not before. Salt draws out moisture, which can prevent proper caramelization and crispy edges during the roasting process."
        icon="herb"
      />
    </div>
  );
};

const IngredientTips = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TipCard 
        title="Storing Fresh Herbs"
        content="Store hardy herbs like rosemary and thyme by wrapping them in damp paper towels and placing in a resealable bag. For basil, store it like flowers in a glass of water at room temperature."
        icon="herb"
      />
      
      <TipCard 
        title="Ripening Avocados"
        content="To speed up avocado ripening, place them in a paper bag with a banana or apple. The ethylene gas released will accelerate the process."
        icon="egg"
      />
      
      <TipCard 
        title="Freezing Fresh Ginger"
        content="Freeze fresh ginger root to make it last longer and make it easier to grate. No need to peel it first—the skin grates right along with the flesh when frozen."
        icon="star"
      />
      
      <TipCard 
        title="Preventing Brown Guacamole"
        content="Keep guacamole from browning by placing plastic wrap directly on the surface (not just covering the bowl) and pressing out all air bubbles before refrigerating."
        icon="cupcake"
      />
    </div>
  );
};

const EquipmentTips = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TipCard 
        title="Cast Iron Care"
        content="After cleaning your cast iron pan, heat it on the stove until completely dry, then apply a thin layer of oil while still warm. This maintains the seasoning and prevents rust."
        icon="whisk"
      />
      
      <TipCard 
        title="Wooden Cutting Board Maintenance"
        content="Rejuvenate your wooden cutting boards monthly by rubbing them with food-grade mineral oil. This prevents cracking and extends their lifespan."
        icon="herb"
      />
      
      <TipCard 
        title="Blender Cleaning Hack"
        content="Clean your blender easily by filling it halfway with warm water, adding a drop of dish soap, and running it for 30 seconds. Rinse thoroughly afterward."
        icon="star"
      />
      
      <TipCard 
        title="Knife Storage"
        content="Store knives in a block, on a magnetic strip, or with blade guards. Never store unprotected knives in a drawer where they can dull or cause injury."
        icon="egg"
      />
    </div>
  );
};

const TipCard = ({ title, content, icon = "star" }) => {
  return (
    <CookingThemedCard icon={icon} title={title}>
      <p className="text-gray-300">{content}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-400">Updated recently</span>
        <button className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
          Save Tip
        </button>
      </div>
    </CookingThemedCard>
  );
};

export default CookingTipsSection;
