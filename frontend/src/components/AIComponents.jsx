import React, { useState } from 'react';
import { 
  AIIcon, 
  ChartIcon, 
  CookingThemedCard, 
  DecorativeCorner, 
  CookingBadge,
  WhiskIcon,
  EggIcon,
  CupcakeIcon,
  StarIcon
} from './CookingIcons';

const AIComponents = () => {
  const [activeTab, setActiveTab] = useState('insights');
  
  return (
    <div className="relative bg-gray-800 rounded-lg border border-amber-700/30 p-6 shadow-lg mb-8">
      <DecorativeCorner position="top-right" />
      <DecorativeCorner position="bottom-left" />
      
      {/* AI Header with prominent styling */}
      <div className="flex items-center mb-6 border-b border-amber-700/30 pb-4">
        <div className="bg-amber-900/50 p-2 rounded-lg mr-3">
          <AIIcon size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-amber-100">AI Cooking Assistant</h2>
          <p className="text-gray-400">Powered by advanced culinary intelligence</p>
        </div>
        <div className="ml-auto">
          <CookingBadge text="AI Powered" icon="star" className="bg-amber-900/50" />
        </div>
      </div>
      
      {/* AI Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm focus:outline-none ${
            activeTab === 'insights' 
              ? 'text-amber-400 border-b-2 border-amber-400' 
              : 'text-gray-400 hover:text-amber-300'
          }`}
          onClick={() => setActiveTab('insights')}
        >
          <div className="flex items-center">
            <AIIcon size={16} className="mr-2" />
            Recipe Insights
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm focus:outline-none ${
            activeTab === 'substitutions' 
              ? 'text-amber-400 border-b-2 border-amber-400' 
              : 'text-gray-400 hover:text-amber-300'
          }`}
          onClick={() => setActiveTab('substitutions')}
        >
          <div className="flex items-center">
            <ChartIcon size={16} className="mr-2" />
            Substitution Analysis
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm focus:outline-none ${
            activeTab === 'assistant' 
              ? 'text-amber-400 border-b-2 border-amber-400' 
              : 'text-gray-400 hover:text-amber-300'
          }`}
          onClick={() => setActiveTab('assistant')}
        >
          <div className="flex items-center">
            <WhiskIcon size={16} className="mr-2" />
            Cooking Assistant
          </div>
        </button>
      </div>
      
      {/* AI Content based on active tab */}
      <div className="mb-4">
        {activeTab === 'insights' && <RecipeInsights />}
        {activeTab === 'substitutions' && <SubstitutionAnalysis />}
        {activeTab === 'assistant' && <CookingAssistant />}
      </div>
    </div>
  );
};

const RecipeInsights = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <CookingThemedCard 
          icon="chart" 
          title="Flavor Profile Analysis"
          subtitle="AI-generated flavor breakdown"
        >
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Sweetness</span>
              <div className="w-2/3 bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Acidity</span>
              <div className="w-2/3 bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Umami</span>
              <div className="w-2/3 bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Spiciness</span>
              <div className="w-2/3 bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </CookingThemedCard>
        
        <CookingThemedCard 
          icon="ai" 
          title="Nutrition Insights"
          subtitle="AI-calculated nutritional information"
        >
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <EggIcon size={16} className="mr-2" />
                <span className="text-sm text-gray-300">Protein</span>
              </div>
              <span className="text-sm font-medium text-amber-300">24g</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CupcakeIcon size={16} className="mr-2" />
                <span className="text-sm text-gray-300">Carbs</span>
              </div>
              <span className="text-sm font-medium text-amber-300">35g</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <StarIcon size={16} className="mr-2" />
                <span className="text-sm text-gray-300">Fats</span>
              </div>
              <span className="text-sm font-medium text-amber-300">12g</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <WhiskIcon size={16} className="mr-2" />
                <span className="text-sm text-gray-300">Calories</span>
              </div>
              <span className="text-sm font-medium text-amber-300">420 kcal</span>
            </div>
          </div>
        </CookingThemedCard>
      </div>
      
      <CookingThemedCard 
        icon="ai" 
        title="AI Recipe Recommendations"
        subtitle="Based on your preferences and cooking history"
      >
        <div className="mt-4 space-y-3">
          <div className="flex items-center p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-amber-800/30 rounded-lg flex items-center justify-center mr-3">
              <CupcakeIcon size={24} />
            </div>
            <div>
              <h4 className="text-amber-100 font-medium">Creamy Garlic Pasta</h4>
              <p className="text-xs text-gray-400">Similar to recipes you've enjoyed</p>
            </div>
            <div className="ml-auto">
              <CookingBadge text="95% Match" icon="star" />
            </div>
          </div>
          
          <div className="flex items-center p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-amber-800/30 rounded-lg flex items-center justify-center mr-3">
              <EggIcon size={24} />
            </div>
            <div>
              <h4 className="text-amber-100 font-medium">Avocado Toast</h4>
              <p className="text-xs text-gray-400">Quick breakfast option</p>
            </div>
            <div className="ml-auto">
              <CookingBadge text="87% Match" icon="star" />
            </div>
          </div>
          
          <div className="flex items-center p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-amber-800/30 rounded-lg flex items-center justify-center mr-3">
              <WhiskIcon size={24} />
            </div>
            <div>
              <h4 className="text-amber-100 font-medium">Chicken Curry</h4>
              <p className="text-xs text-gray-400">Based on your spice preferences</p>
            </div>
            <div className="ml-auto">
              <CookingBadge text="82% Match" icon="star" />
            </div>
          </div>
        </div>
      </CookingThemedCard>
    </div>
  );
};

const SubstitutionAnalysis = () => {
  return (
    <div>
      <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-4">
          <AIIcon size={24} className="mr-2" />
          <h3 className="text-lg font-medium text-amber-100">AI Substitution Insights</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Our AI analyzes how ingredient substitutions affect your recipe's flavor profile, texture, and nutritional content.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-3 border border-amber-700/20">
            <h4 className="text-amber-300 font-medium mb-2">Flavor Impact</h4>
            <p className="text-sm text-gray-400">How substitutions change the taste of your dish</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-amber-700/20">
            <h4 className="text-amber-300 font-medium mb-2">Texture Analysis</h4>
            <p className="text-sm text-gray-400">Effects on consistency and mouthfeel</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-amber-700/20">
            <h4 className="text-amber-300 font-medium mb-2">Nutrition Changes</h4>
            <p className="text-sm text-gray-400">Calorie and macronutrient adjustments</p>
          </div>
        </div>
      </div>
      
      <CookingThemedCard 
        icon="chart" 
        title="Substitution Balance Indicators"
        subtitle="See how substitutions affect your recipe"
      >
        <div className="mt-4">
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-300">Original: <span className="text-amber-300">Butter</span></span>
              <span className="text-sm text-gray-300">Substitute: <span className="text-amber-300">Olive Oil</span></span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-xs text-gray-400 mb-1">Flavor</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Texture</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Moisture</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-300">Original: <span className="text-amber-300">Sugar</span></span>
              <span className="text-sm text-gray-300">Substitute: <span className="text-amber-300">Honey</span></span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-xs text-gray-400 mb-1">Flavor</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Texture</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Moisture</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-300">Original: <span className="text-amber-300">All-purpose Flour</span></span>
              <span className="text-sm text-gray-300">Substitute: <span className="text-amber-300">Almond Flour</span></span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-xs text-gray-400 mb-1">Flavor</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Texture</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Moisture</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CookingThemedCard>
    </div>
  );
};

const CookingAssistant = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI cooking assistant. How can I help with your culinary adventures today?' },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      let response;
      if (message.toLowerCase().includes('substitute') || message.toLowerCase().includes('replacement')) {
        response = "Based on your recipe, you can substitute butter with olive oil at a 3:4 ratio. This will reduce saturated fat while maintaining moisture. The flavor profile will change slightly, adding a subtle olive note.";
      } else if (message.toLowerCase().includes('temperature') || message.toLowerCase().includes('cook')) {
        response = "For best results, cook your chicken until it reaches an internal temperature of 165°F (74°C). Let it rest for 5 minutes before serving to allow the juices to redistribute.";
      } else if (message.toLowerCase().includes('pair') || message.toLowerCase().includes('serve')) {
        response = "This dish would pair wonderfully with a crisp Sauvignon Blanc or a light Pinot Noir. For non-alcoholic options, try sparkling water with a squeeze of lemon.";
      } else {
        response = "I'd be happy to help with that! Would you like me to suggest some recipes, provide cooking techniques, or analyze nutritional information?";
      }
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
    
    setMessage('');
  };

  return (
    <div className="bg-gray-700/30 rounded-lg border border-gray-700 h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-3/4 rounded-lg px-4 py-2 ${
                msg.role === 'user' 
                  ? 'bg-amber-700/50 text-white' 
                  : 'bg-gray-700 text-gray-200'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about cooking techniques, substitutions, or recipe ideas..."
          className="flex-1 bg-gray-700 border border-gray-600 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AIComponents;
