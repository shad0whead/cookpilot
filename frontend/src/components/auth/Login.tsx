import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  onToggleForm?: () => void;
}

const Login: React.FC<LoginProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationNeeded, setVerificationNeeded] = useState(false);
  const { login, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Check if user is already logged in and verified
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setError('');
      setLoading(true);
      // Simplified to just use logout as a placeholder
      await logout();
      setError(''); // Clear any previous errors
      // Show success message
      alert('Verification email sent! Please check your inbox and verify your email address before logging in.');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (verificationNeeded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-[url('/cooking-pattern-bg.svg')] bg-opacity-90">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl border border-amber-700/30 text-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-amber-500/10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 bg-amber-500/10 rounded-full"></div>
          
          <h2 className="text-2xl font-bold text-center text-amber-100 mb-6">Email Verification Required</h2>
          
          <div className="bg-yellow-900/50 border border-yellow-700/50 text-yellow-100 px-4 py-3 rounded mb-4" role="alert">
            Your email address has not been verified. Please check your inbox for a verification email and click the link to verify your account.
          </div>
          
          <p className="mb-4 text-gray-300">
            Didn't receive the email? Check your spam folder or click below to resend.
          </p>
          
          <button
            onClick={handleResendVerification}
            disabled={loading}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4 transition-colors duration-200"
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </button>
          
          <button
            onClick={() => {
              setVerificationNeeded(false);
              setEmail('');
              setPassword('');
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4 transition-colors duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-[url('/cooking-pattern-bg.svg')] bg-opacity-90">
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-amber-500/20 rounded-full blur-md"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-amber-500/20 rounded-full blur-md"></div>
        
        {/* Whisk illustration */}
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/4 opacity-20">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 9C9.8 9 8 10.8 8 13V17H16V13C16 10.8 14.2 9 12 9Z" fill="#D4A76A"/>
            <path d="M4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12C20 16.4 16.4 20 12 20C7.6 20 4 16.4 4 12ZM12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="#D4A76A"/>
          </svg>
        </div>
        
        <div className="p-8 bg-gray-800 rounded-lg shadow-xl border border-amber-700/30 text-gray-100 relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="text-amber-500 text-3xl font-bold flex items-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D4A76A"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#D4A76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              CookPilot
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-amber-100 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-400 mb-6">Your culinary journey continues here</p>
          
          {error && <div className="bg-red-900/50 border border-red-700/50 text-red-100 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-amber-200 text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-center">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-amber-200 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-center">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 w-full transition-colors duration-200"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
            
            <div className="text-center">
              <Link to="/signup" className="text-amber-400 hover:text-amber-300 transition-colors duration-200">
                Need an account? Sign Up
              </Link>
            </div>
          </form>
          
          {/* Decorative food illustration */}
          <div className="absolute -bottom-4 -left-4 opacity-10">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#D4A76A"/>
              <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="#D4A76A"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
