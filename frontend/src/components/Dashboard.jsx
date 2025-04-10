import React, { useState } from 'react';
import { 
  DecorativeCorner, 
  DecorativePattern,
  CookingThemedCard,
  AIFeatureCard,
  CookingBadge,
  EggIcon,
  WhiskIcon,
  CupcakeIcon,
  StarIcon,
  HerbIcon,
  BowlIcon,
  SpoonIcon
} from './CookingIcons';
import AIComponents from './AIComponents';
import CookingTipsSection from './CookingTipsSection';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAIInsights, setShowAIInsights] = useState(false);
  
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Decorative background elements */}
      <DecorativePattern />
      <DecorativeCorner position="top-right" />
      <DecorativeCorner position="bottom-left" />
      
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-amber-700/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <WhiskIcon size={28} className="text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-amber-400 tracking-wide">CookPilot</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">mfcoxjr@gmail.com</span>
            <button className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-amber-700/30 p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-xl"></div>
          
          <div className="relative">
            <h2 className="text-3xl font-bold text-amber-100 mb-2">Welcome to Your Kitchen, mfcoxjr</h2>
            <p className="text-gray-400 max-w-2xl">Manage your recipes, plan meals, and explore new culinary adventures</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <ActionCard 
                icon="recipe"
                title="My Recipes"
                description="Access and manage your recipe collection"
                onClick={() => setActiveTab('recipes')}
              />
              
              <ActionCard 
                icon="create"
                title="Create New"
                description="Add a new recipe to your collection"
                onClick={() => {}}
              />
              
              <ActionCard 
                icon="plan"
                title="Meal Plans"
                description="Plan your meals for the week"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="flex border-b border-gray-700 mb-8">
          <TabButton 
            label="Dashboard" 
            isActive={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>}
          />
          <TabButton 
            label="Recipes" 
            isActive={activeTab === 'recipes'} 
            onClick={() => setActiveTab('recipes')}
            icon={<CupcakeIcon size={20} className="mr-2" />}
          />
          <TabButton 
            label="Substitution Calculator" 
            isActive={activeTab === 'calculator'} 
            onClick={() => setActiveTab('calculator')}
            icon={<StarIcon size={20} className="mr-2" />}
          />
          <TabButton 
            label="Temperature Guide" 
            isActive={activeTab === 'temperature'} 
            onClick={() => setActiveTab('temperature')}
            icon={<EggIcon size={20} className="mr-2" />}
          />
          <TabButton 
            label="Account" 
            isActive={activeTab === 'account'} 
            onClick={() => setActiveTab('account')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>}
          />
        </div>
        
        {/* Tab content */}
        {activeTab === 'dashboard' && (
          <div>
            {/* AI Insights toggle */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-100">Find Recipes</h2>
              <button 
                className="flex items-center px-4 py-2 bg-amber-700/50 hover:bg-amber-700 rounded-lg transition-colors"
                onClick={() => setShowAIInsights(!showAIInsights)}
              >
                <StarIcon size={20} className="mr-2" />
                <span>{showAIInsights ? 'Hide AI Insights' : 'Show AI Insights'}</span>
              </button>
            </div>
            
            {/* Search and filters */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-amber-700/30 p-6 mb-8">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search recipes by name, ingredient, or tag..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <FilterTag label="Breakfast" />
                <FilterTag label="Lunch" />
                <FilterTag label="Dinner" />
                <FilterTag label="Vegetarian" />
                <FilterTag label="Quick Meals" />
                <FilterTag label="Desserts" />
                <FilterTag label="Gluten-Free" />
                <FilterTag label="Low-Carb" />
              </div>
            </div>
            
            {/* AI Insights section (conditionally rendered) */}
            {showAIInsights && <AIComponents />}
            
            {/* Cooking Tips Section */}
            <CookingTipsSection />
            
            {/* Recent Recipes */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-100">Recent Recipes</h2>
                <button className="text-amber-400 hover:text-amber-300 transition-colors">
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RecipeCard 
                  title="Creamy Garlic Pasta"
                  cookTime="30 min"
                  tags={['Italian', 'Dinner', 'Vegetarian']}
                />
                
                <RecipeCard 
                  title="Avocado Toast"
                  cookTime="15 min"
                  tags={['Breakfast', 'Quick', 'Vegetarian']}
                />
                
                <RecipeCard 
                  title="Chicken Curry"
                  cookTime="45 min"
                  tags={['Indian', 'Dinner', 'Spicy']}
                />
              </div>
            </div>
            
            {/* Popular Categories */}
            <div>
              <h2 className="text-2xl font-bold text-amber-100 mb-6">Popular Categories</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <CategoryCard 
                  title="Italian"
                  icon="herb"
                  count={24}
                />
                
                <CategoryCard 
                  title="Desserts"
                  icon="cupcake"
                  count={18}
                />
                
                <CategoryCard 
                  title="Quick Meals"
                  icon="star"
                  count={32}
                />
                
                <CategoryCard 
                  title="Vegetarian"
                  icon="egg"
                  count={15}
                />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'account' && (
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-amber-700/30 p-6">
            <iframe 
              src="/account" 
              title="Account Profile"
              className="w-full h-screen border-0"
            />
          </div>
        )}
      </main>
    </div>
  );
};

const TabButton = ({ label, isActive, onClick, icon }) => {
  return (
    <button
      className={`flex items-center px-4 py-2 font-medium text-sm focus:outline-none ${
        isActive 
          ? 'text-amber-400 border-b-2 border-amber-400' 
          : 'text-gray-400 hover:text-amber-300'
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

const ActionCard = ({ icon, title, description, onClick }) => {
  const renderIcon = () => {
    switch(icon) {
      case 'recipe':
        return <div className="w-12 h-12 bg-amber-700/30 rounded-lg flex items-center justify-center">
          <CupcakeIcon size={28} className="text-amber-400" />
        </div>;
      case 'create':
        return <div className="w-12 h-12 bg-amber-700/30 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>;
      case 'plan':
        return <div className="w-12 h-12 bg-amber-700/30 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </div>;
      default:
        return null;
    }
  };
  
  return (
    <div 
      className="bg-gray-700/50 hover:bg-gray-700 rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="flex items-start">
        {renderIcon()}
        <div className="ml-4">
          <h3 className="text-lg font-medium text-amber-100">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

const FilterTag = ({ label }) => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <button
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-amber-600 text-white' 
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
      onClick={() => setIsActive(!isActive)}
    >
      {label}
    </button>
  );
};

const RecipeCard = ({ title, cookTime, tags = [] }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-amber-700/30 hover:border-amber-500/50 transition-colors">
      <div className="h-48 bg-gray-700 flex items-center justify-center">
        <CupcakeIcon size={48} className="text-amber-400/50" />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-amber-100">{title}</h3>
          <span className="bg-amber-900/50 text-amber-300 text-xs px-2 py-1 rounded">
            {cookTime}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between">
          <button className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
            View Recipe
          </button>
          <button className="text-sm text-gray-400 hover:text-amber-300 transition-colors flex items-center">
            <StarIcon size={16} className="mr-1" />
            <span>AI Insights</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ title, icon, count }) => {
  const renderIcon = () => {
    switch(icon) {
      case 'herb': return <HerbIcon size={32} className="text-amber-400" />;
      case 'cupcake': return <CupcakeIcon size={32} className="text-amber-400" />;
      case 'star': return <StarIcon size={32} className="text-amber-400" />;
      case 'egg': return <EggIcon size={32} className="text-amber-400" />;
      default: return <StarIcon size={32} className="text-amber-400" />;
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-amber-700/30 hover:border-amber-500/50 transition-colors cursor-pointer">
      <div className="flex items-center">
        <div className="mr-3">
          {renderIcon()}
        </div>
        <div>
          <h3 className="text-lg font-medium text-amber-100">{title}</h3>
          <p className="text-sm text-gray-400">{count} recipes</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
