import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component with DEV_MODE support
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // DEV_MODE flag - set to true for development, false for production
  const DEV_MODE = true;
  
  // Mock user for development
  const mockUser = {
    uid: 'dev-user-123',
    email: 'dev@example.com',
    displayName: 'Development User',
    photoURL: null,
    emailVerified: true
  };
  
  useEffect(() => {
    // If DEV_MODE is enabled, auto-login with mock user
    if (DEV_MODE) {
      console.log('DEV_MODE enabled: Auto-logging in with mock user');
      setCurrentUser(mockUser);
      setLoading(false);
      return;
    }
    
    // Normal authentication logic would go here
    // This would typically include Firebase auth listeners
    // For now, we'll just set loading to false after a delay to simulate auth check
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      
      // In DEV_MODE, just use the mock user
      if (DEV_MODE) {
        setCurrentUser(mockUser);
        setLoading(false);
        return;
      }
      
      // Normal sign in logic would go here
      // For now, we'll just simulate a successful login
      setCurrentUser({
        uid: 'user-123',
        email: email,
        displayName: 'User',
        photoURL: null,
        emailVerified: true
      });
      
      setLoading(false);
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
      setLoading(false);
    }
  };
  
  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      
      // In DEV_MODE, just clear the current user
      if (DEV_MODE) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      
      // Normal sign out logic would go here
      setCurrentUser(null);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to sign out: ' + err.message);
      setLoading(false);
    }
  };
  
  // Reset password function
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      
      // In DEV_MODE, just simulate success
      if (DEV_MODE) {
        setLoading(false);
        return;
      }
      
      // Normal reset password logic would go here
      
      setLoading(false);
    } catch (err) {
      setError('Failed to reset password: ' + err.message);
      setLoading(false);
    }
  };
  
  // Update profile function
  const updateProfile = async (displayName, photoURL) => {
    try {
      setLoading(true);
      
      // In DEV_MODE, just update the mock user
      if (DEV_MODE) {
        setCurrentUser({
          ...mockUser,
          displayName: displayName || mockUser.displayName,
          photoURL: photoURL || mockUser.photoURL
        });
        setLoading(false);
        return;
      }
      
      // Normal update profile logic would go here
      
      setLoading(false);
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
      setLoading(false);
    }
  };
  
  const value = {
    currentUser,
    loading,
    error,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    DEV_MODE
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
