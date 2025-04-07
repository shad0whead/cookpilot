import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { Link } from 'react-router-dom';

interface LoginProps {
  onToggleForm?: () => void;
}

const Login: React.FC<LoginProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      // Redirect to home page after successful login
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-dark text-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Log In to CookPilot</h2>
      
      {error && <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-dark"
            required
          />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
        
        <div className="text-center">
          <Link to="/signup" className="text-sm text-green-400 hover:text-green-300">
            Need an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
