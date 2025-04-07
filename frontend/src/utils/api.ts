// API configuration and utility functions
const API_BASE_URL = 'https://8000-ihkyip5vme0hx88m22fks-55bb0122.manus.computer';

// Generic fetch wrapper with error handling
export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API error: ${response.status}`);
    }
    
    // Parse JSON response
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Auth-related API calls
export const authAPI = {
  signup: async (email: string, password: string) => {
    return fetchFromAPI('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  verifyToken: async (token: string) => {
    return fetchFromAPI('/auth/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },
};

// Recipe-related API calls
export const recipeAPI = {
  getAll: async () => {
    return fetchFromAPI('/recipes/');
  },
  
  getById: async (id: string) => {
    return fetchFromAPI(`/recipes/${id}`);
  },
  
  create: async (recipeData: any) => {
    return fetchFromAPI('/recipes/', {
      method: 'POST',
      body: JSON.stringify(recipeData),
    });
  },
  
  update: async (id: string, recipeData: any) => {
    return fetchFromAPI(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipeData),
    });
  },
  
  delete: async (id: string) => {
    return fetchFromAPI(`/recipes/${id}`, {
      method: 'DELETE',
    });
  },
};

// Notes-related API calls
export const notesAPI = {
  getAll: async () => {
    return fetchFromAPI('/notes/');
  },
  
  getById: async (id: string) => {
    return fetchFromAPI(`/notes/${id}`);
  },
  
  create: async (noteData: any) => {
    return fetchFromAPI('/notes/', {
      method: 'POST',
      body: JSON.stringify(noteData),
    });
  },
  
  update: async (id: string, noteData: any) => {
    return fetchFromAPI(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(noteData),
    });
  },
  
  delete: async (id: string) => {
    return fetchFromAPI(`/notes/${id}`, {
      method: 'DELETE',
    });
  },
};

// Search-related API calls
export const searchAPI = {
  search: async (query: string) => {
    return fetchFromAPI(`/search/?q=${encodeURIComponent(query)}`);
  },
};

export default {
  baseUrl: API_BASE_URL,
  auth: authAPI,
  recipes: recipeAPI,
  notes: notesAPI,
  search: searchAPI,
}
