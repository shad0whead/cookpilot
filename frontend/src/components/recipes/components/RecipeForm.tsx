import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

interface RecipeFormData {
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

const RecipeForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    imageUrl: '',
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    ingredients: [''],
    instructions: [''],
    tags: []
  });
  
  const [tagInput, setTagInput] = useState('');

  // Fetch recipe data if editing an existing recipe
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return; // Not editing an existing recipe
      
      try {
        setLoading(true);
        setIsEditing(true);
        
        const response = await fetch(`https://cookpilot-backend.onrender.com/api/recipes/${id}`, {
          headers: {
            'Authorization': `Bearer ${await user?.getIdToken()}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match our form structure
        setFormData({
          title: data.title || data.name || '',
          description: data.description || '',
          imageUrl: data.media && data.media.length > 0 ? data.media[0] : '',
          prepTime: data.prep_time || 0,
          cookTime: data.cook_time || 0,
          servings: data.servings || 1,
          // Transform ingredients from objects to strings if needed
          ingredients: Array.isArray(data.ingredients) 
            ? data.ingredients.map((ing: any) => {
                if (typeof ing === 'string') return ing;
                return `${ing.amount || ing.quantity} ${ing.unit} ${ing.name}${ing.notes ? ` (${ing.notes})` : ''}`;
              })
            : [''],
          // Transform steps/instructions if needed
          instructions: Array.isArray(data.instructions) 
            ? data.instructions 
            : Array.isArray(data.steps) 
              ? data.steps.map((step: any) => {
                  if (typeof step === 'string') return step;
                  return step.description || '';
                })
              : [''],
          tags: data.tags || []
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipe for editing:', err);
        setError('Failed to load recipe for editing. Please try again.');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0
    });
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients.splice(index, 1);
      setFormData({
        ...formData,
        ingredients: updatedIngredients
      });
    }
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({
      ...formData,
      instructions: updatedInstructions
    });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, '']
    });
  };

  const removeInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      const updatedInstructions = [...formData.instructions];
      updatedInstructions.splice(index, 1);
      setFormData({
        ...formData,
        instructions: updatedInstructions
      });
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Transform form data to match API expectations
      const apiData = {
        title: formData.title,
        description: formData.description,
        prep_time: formData.prepTime,
        cook_time: formData.cookTime,
        servings: formData.servings,
        // Transform ingredients to objects if needed by the API
        ingredients: formData.ingredients.map(ing => {
          // Simple parsing - in a real app, would use more robust parsing
          const parts = ing.split(' ');
          if (parts.length >= 3) {
            return {
              quantity: parseFloat(parts[0]) || 1,
              unit: parts[1],
              name: parts.slice(2).join(' ')
            };
          }
          return { name: ing, quantity: 1, unit: 'item' };
        }),
        // Keep instructions as an array of strings
        instructions: formData.instructions,
        tags: formData.tags,
        media: formData.imageUrl ? [formData.imageUrl] : []
      };
      
      let response;
      
      if (isEditing && id) {
        // Update existing recipe
        response = await fetch(`https://cookpilot-backend.onrender.com/api/recipes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await user?.getIdToken()}`
          },
          body: JSON.stringify(apiData),
        });
      } else {
        // Create new recipe
        response = await fetch('https://cookpilot-backend.onrender.com/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await user?.getIdToken()}`
          },
          body: JSON.stringify(apiData),
        });
      }
      
      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} recipe: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Redirect to the recipe detail page
      navigate(`/recipes/${result.id || result._id}`);
      
    } catch (err) {
      console.error('Error saving recipe:', err);
      setError(`Failed to ${isEditing ? 'update' : 'create'} recipe. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">
        {isEditing ? 'Edit Recipe' : 'Create New Recipe'}
      </h1>
      
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">
            Recipe Title*
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark h-24"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="prepTime">
              Prep Time (minutes)*
            </label>
            <input
              id="prepTime"
              name="prepTime"
              type="number"
              min="0"
              value={formData.prepTime}
              onChange={handleNumberChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="cookTime">
              Cook Time (minutes)*
            </label>
            <input
              id="cookTime"
              name="cookTime"
              type="number"
              min="0"
              value={formData.cookTime}
              onChange={handleNumberChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="servings">
              Servings*
            </label>
            <input
              id="servings"
              name="servings"
              type="number"
              min="1"
              value={formData.servings}
              onChange={handleNumberChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Ingredients*
          </label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
                placeholder={`Ingredient ${index + 1} (e.g., 2 cups flour)`}
                required
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={formData.ingredients.length <= 1}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Ingredient
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Instructions*
          </label>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex mb-2">
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
                placeholder={`Step ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={formData.instructions.length <= 1}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Instruction
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-gray-400 hover:text-gray-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
              placeholder="Add a tag (e.g., dinner, vegetarian)"
            />
            <button
              type="button"
              onClick={addTag}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Recipe' : 'Create Recipe')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
