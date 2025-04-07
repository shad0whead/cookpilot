import React, { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchInterface: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    ingredients: false,
    title: true,
    tags: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter]
    });
  };

  return (
    <div className="w-full bg-gray-800 shadow-dark rounded-lg p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes..."
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-3">
          <span className="text-sm text-gray-300">Search in:</span>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={filters.title}
              onChange={() => toggleFilter('title')}
              className="form-checkbox h-4 w-4 text-green-500 bg-gray-700 border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-300">Title</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={filters.ingredients}
              onChange={() => toggleFilter('ingredients')}
              className="form-checkbox h-4 w-4 text-green-500 bg-gray-700 border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-300">Ingredients</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={filters.tags}
              onChange={() => toggleFilter('tags')}
              className="form-checkbox h-4 w-4 text-green-500 bg-gray-700 border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-300">Tags</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchInterface;
