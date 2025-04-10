import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import App from './App';
import { 
  EggIcon, 
  WhiskIcon, 
  CupcakeIcon, 
  StarIcon 
} from './CookingIcons';

// Enhanced Login Component with DEV_MODE support
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  
  const { signIn, resetPassword, DEV_MODE } = useAuth();
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle password reset
  const handleReset = async (e) => {
    e.preventDefault();
    
    if (!email) {
      return setError('Please enter your email address');
    }
    
    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setResetMode(false);
      alert('Password reset email sent. Check your inbox.');
    } catch (err) {
      setError('Failed to reset password: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative cooking elements */}
      <div className="absolute -right-20 -top-20 opacity-10 transform rotate-12 scale-150">
        <WhiskIcon />
      </div>
      <div className="absolute left-10 bottom-10 opacity-10 scale-150">
        <EggIcon />
      </div>
      <div className="absolute right-20 top-1/2 opacity-10 scale-150">
        <StarIcon />
      </div>
      <div className="absolute left-1/4 top-1/4 opacity-10 scale-150">
        <CupcakeIcon />
      </div>
      
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CupcakeIcon />
          </div>
          <h1 className="text-4xl font-bold text-cream font-display tracking-wide">COOKPILOT</h1>
          <p className="text-gray-400 mt-2">Your personal cooking assistant</p>
        </div>
        
        {DEV_MODE && (
          <div className="bg-amber-700/20 border border-amber-600/30 rounded-md p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-amber-300 font-medium font-display tracking-wide">DEVELOPMENT MODE</p>
            </div>
            <p className="text-gray-300 mt-2 text-sm">
              Authentication bypass is enabled. Click "Sign In" to continue as the development user.
            </p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-300 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {resetMode ? (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-cream mb-4 font-display tracking-wide">RESET PASSWORD</h2>
            <form onSubmit={handleReset}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-display tracking-wide">EMAIL</label>
                <input 
                  type="email" 
                  className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex flex-col space-y-3">
                <button 
                  type="submit" 
                  className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 font-display tracking-wide"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                <button 
                  type="button" 
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-4 rounded transition-colors duration-200 font-display tracking-wide"
                  onClick={() => setResetMode(false)}
                  disabled={loading}
                >
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-cream mb-4 font-display tracking-wide">LOGIN</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-display tracking-wide">EMAIL</label>
                <input 
                  type="email" 
                  className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-300 font-display tracking-wide">PASSWORD</label>
                  <button 
                    type="button" 
                    className="text-amber-400 hover:text-amber-300 text-sm transition-colors duration-200"
                    onClick={() => setResetMode(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
                <input 
                  type="password" 
                  className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex flex-col space-y-3">
                <button 
                  type="submit" 
                  className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 font-display tracking-wide"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
                <div className="text-center text-gray-400 text-sm">
                  Don't have an account? <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors duration-200">Sign Up</a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Entry Component
const AppWrapper = () => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }
  
  return currentUser ? <App /> : <Login />;
};

// Root Component with Auth Provider
const Root = () => {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
};

export default Root;
