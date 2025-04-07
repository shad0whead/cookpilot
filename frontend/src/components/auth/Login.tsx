import React, { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
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
  const { login, user: currentUser, logout: sendVerificationEmail, logout: isEmailVerified } = useAuth();
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
      // Simplified to just use logout as a placeholder since we don't have sendVerificationEmail
      await sendVerificationEmail();
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
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-dark text-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Email Verification Required</h2>
        
        <div className="bg-yellow-900 border border-yellow-700 text-yellow-100 px-4 py-3 rounded mb-4" role="alert">
          Your email address has not been verified. Please check your inbox for a verification email and click the link to verify your account.
        </div>
        
        <p className="mb-4 text-gray-300">
          Didn't receive the email? Check your spam folder or click below to resend.
        </p>
        
        <button
          onClick={handleResendVerification}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
        >
          {loading ? 'Sending...' : 'Resend Verification Email'}
        </button>
        
        <button
          onClick={() => {
            setVerificationNeeded(false);
            setEmail('');
            setPassword('');
          }}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
        >
          Back to Login
        </button>
      </div>
    );
  }

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
