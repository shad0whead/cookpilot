import React, { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface SignupProps {
  onToggleForm?: () => void;
}

const Signup: React.FC<SignupProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const { signup, user: currentUser, logout: sendVerificationEmail, logout: isEmailVerified } = useAuth();
  const navigate = useNavigate();

  // Check if user is already verified
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      setVerificationSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create an account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setError('');
      setLoading(true);
      await sendVerificationEmail();
      setVerificationSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-dark text-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Sign Up for CookPilot</h2>
      
      {error && <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
      
      {verificationSent ? (
        <div className="text-center">
          <div className="bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded mb-4" role="alert">
            Verification email sent! Please check your inbox and verify your email address before logging in.
          </div>
          
          <p className="mb-4 text-gray-300">
            Didn't receive the email? Check your spam folder or click below to resend.
          </p>
          
          <button
            onClick={handleResendVerification}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </button>
          
          <div className="text-center">
            <Link to="/login" className="text-sm text-green-400 hover:text-green-300">
              Return to Login
            </Link>
          </div>
        </div>
      ) : (
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
          
          <div className="mb-4">
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
          
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
          
          <div className="text-center">
            <Link to="/login" className="text-sm text-green-400 hover:text-green-300">
              Already have an account? Log In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
