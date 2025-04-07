import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

interface ExportOptions {
  includeNutrition: boolean;
  includeImages: boolean;
  formatType: 'pdf' | 'text' | 'email';
  scaledServings: number;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime?: number;
  cookTime?: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tags?: string[];
  createdBy?: string;
  createdAt?: string;
}

const ExportShare: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    includeNutrition: true,
    includeImages: true,
    formatType: 'pdf',
    scaledServings: 0, // 0 means use original servings
  });

  // Fetch recipe data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // Fetch from the backend API
        const response = await fetch(`https://cookpilot-backend.onrender.com/api/recipes/${id}`, {
          headers: {
            'Authorization': `Bearer ${await user?.getIdToken()}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match our frontend Recipe interface
        const transformedRecipe: Recipe = {
          id: data.id || data._id,
          title: data.title || data.name,
          description: data.description,
          imageUrl: data.media && data.media.length > 0 ? data.media[0] : undefined,
          prepTime: data.prep_time,
          cookTime: data.cook_time,
          servings: data.servings || 1,
          // Transform ingredients from objects to strings if needed
          ingredients: Array.isArray(data.ingredients) 
            ? data.ingredients.map((ing: any) => {
                if (typeof ing === 'string') return ing;
                return `${ing.amount || ing.quantity} ${ing.unit} ${ing.name}${ing.notes ? ` (${ing.notes})` : ''}`;
              })
            : [],
          // Transform steps/instructions if needed
          instructions: Array.isArray(data.instructions) 
            ? data.instructions 
            : Array.isArray(data.steps) 
              ? data.steps.map((step: any) => {
                  if (typeof step === 'string') return step;
                  return step.description || '';
                })
              : [],
          tags: data.tags,
          createdBy: data.created_by || data.chef_id,
          createdAt: data.created_at
        };
        
        setRecipe(transformedRecipe);
        setExportOptions(prev => ({
          ...prev,
          scaledServings: transformedRecipe.servings
        }));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to fetch recipe details. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, user]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setExportOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || recipe?.servings || 1;
    setExportOptions(prev => ({
      ...prev,
      scaledServings: value
    }));
  };

  const generateExport = async () => {
    if (!recipe) return;
    
    setExportLoading(true);
    setExportSuccess(false);
    
    try {
      // In a real implementation, this would call a backend API to generate the export
      // For now, we'll simulate the export process
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock share URL
      const shareId = Math.random().toString(36).substring(2, 10);
      const mockShareUrl = `https://cookpilot.app/shared/${shareId}`;
      setShareUrl(mockShareUrl);
      
      setExportSuccess(true);
    } catch (err) {
      console.error('Error generating export:', err);
      setError('Failed to generate export. Please try again later.');
    } finally {
      setExportLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Share link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy link:', err);
        alert('Failed to copy link. Please copy it manually.');
      });
  };

  if (loading) {
    return <div className="text-center py-10">Loading recipe...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center py-10">Recipe not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Export & Share: {recipe.title}</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">
            Export Options
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  name="includeNutrition"
                  checked={exportOptions.includeNutrition}
                  onChange={handleOptionChange}
                  className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                />
                <span>Include Nutrition Information</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  name="includeImages"
                  checked={exportOptions.includeImages}
                  onChange={handleOptionChange}
                  className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                />
                <span>Include Images</span>
              </label>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Export Format
              </label>
              <select
                name="formatType"
                value={exportOptions.formatType}
                onChange={handleOptionChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="pdf">PDF Document</option>
                <option value="text">Plain Text</option>
                <option value="email">Email Format</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Scale Recipe for Servings
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setExportOptions(prev => ({
                    ...prev,
                    scaledServings: Math.max(1, prev.scaledServings - 1)
                  }))}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-1 px-3 rounded-l"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={exportOptions.scaledServings}
                  onChange={handleServingsChange}
                  className="shadow appearance-none border text-center w-16 py-1 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={() => setExportOptions(prev => ({
                    ...prev,
                    scaledServings: prev.scaledServings + 1
                  }))}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-1 px-3 rounded-r"
                >
                  +
                </button>
                <span className="ml-2 text-gray-400">
                  (Original: {recipe.servings})
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={generateExport}
            disabled={exportLoading}
            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${
              exportLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {exportLoading ? 'Generating...' : 'Generate & Share'}
          </button>
        </div>
        
        {exportSuccess && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Recipe Ready to Share!
            </h3>
            
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="shadow appearance-none border rounded-l w-full py-2 px-3 bg-gray-600 border-gray-500 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                onClick={handleCopyLink}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
              >
                Copy
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
                <span className="mr-1">Email</span>
              </button>
              
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
                <span className="mr-1">WhatsApp</span>
              </button>
              
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
                <span className="mr-1">SMS</span>
              </button>
              
              {exportOptions.formatType === 'pdf' && (
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
                  <span className="mr-1">Download PDF</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">
          Recipe Preview
        </h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-100">{recipe.title}</h3>
          <p className="text-gray-300 mt-1">{recipe.description}</p>
        </div>
        
        {recipe.imageUrl && exportOptions.includeImages && (
          <div className="mb-4">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
          <div className="bg-gray-700 p-2 rounded-lg">
            <p className="text-gray-400">Prep Time</p>
            <p className="text-gray-100 font-semibold">{recipe.prepTime} min</p>
          </div>
          <div className="bg-gray-700 p-2 rounded-lg">
            <p className="text-gray-400">Cook Time</p>
            <p className="text-gray-100 font-semibold">{recipe.cookTime} min</p>
          </div>
          <div className="bg-gray-700 p-2 rounded-lg">
            <p className="text-gray-400">Servings</p>
            <p className="text-gray-100 font-semibold">
              {exportOptions.scaledServings !== recipe.servings ? 
                `${exportOptions.scaledServings} (scaled)` : 
                recipe.servings}
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-100 mb-2">Ingredients</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            {recipe.ingredients.map((ingredient, index) => {
              // If scaling is applied, show a simple scaled version
              if (exportOptions.scaledServings !== recipe.servings) {
                const parts = ingredient.split(' ');
                const quantity = parseFloat(parts[0]);
                if (!isNaN(quantity)) {
                  const scaleFactor = exportOptions.scaledServings / recipe.servings;
                  const scaledQuantity = (Math.round(quantity * scaleFactor * 100) / 100).toString();
                  return (
                    <li key={index}>
                      {scaledQuantity} {parts.slice(1).join(' ')}
                    </li>
                  );
                }
              }
              return <li key={index}>{ingredient}</li>;
            })}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-100 mb-2">Instructions</h4>
          <ol className="list-decimal pl-5 space-y-2 text-gray-300">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        
        {exportOptions.includeNutrition && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-100 mb-2">Nutrition Information (per serving)</h4>
            <p className="text-gray-300 text-sm italic">
              Nutrition information would be included in the exported document.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportShare;
