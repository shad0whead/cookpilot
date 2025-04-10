import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  User
} from 'firebase/auth';
import { auth } from '../utils/firebase';

// Create Auth Context
const AuthContext = createContext(null);

// DEV_MODE flag - set to true for development, false for production
const DEV_MODE = true;

// Auth Provider Component with DEV_MODE support
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
    
    // Normal Firebase authentication listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);
  
  // Sign in function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // In DEV_MODE, just use the mock user
      if (DEV_MODE) {
        console.log('DEV_MODE enabled: Using mock login');
        setCurrentUser(mockUser);
        setLoading(false);
        return { user: mockUser };
      }
      
      // Normal Firebase sign in
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Sign up function
  const signup = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // In DEV_MODE, just use the mock user
      if (DEV_MODE) {
        console.log('DEV_MODE enabled: Using mock signup');
        setCurrentUser(mockUser);
        setLoading(false);
        return { user: mockUser };
      }
      
      // Normal Firebase sign up
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Sign out function
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In DEV_MODE, just clear the current user
      if (DEV_MODE) {
        console.log('DEV_MODE enabled: Using mock logout');
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      
      // Normal Firebase sign out
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Reset password function
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      // In DEV_MODE, just simulate success
      if (DEV_MODE) {
        console.log('DEV_MODE enabled: Simulating password reset');
        setLoading(false);
        return;
      }
      
      // Normal Firebase reset password
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Update profile function
  const updateProfile = async (displayName, photoURL) => {
    try {
      setLoading(true);
      setError(null);
      
      // In DEV_MODE, just update the mock user
      if (DEV_MODE) {
        console.log('DEV_MODE enabled: Updating mock user profile');
        setCurrentUser({
          ...mockUser,
          displayName: displayName || mockUser.displayName,
          photoURL: photoURL || mockUser.photoURL
        });
        setLoading(false);
        return;
      }
      
      // Normal Firebase update profile
      if (currentUser) {
        await firebaseUpdateProfile(currentUser, {
          displayName: displayName || currentUser.displayName,
          photoURL: photoURL || currentUser.photoURL
        });
        
        // Update the current user state to reflect changes
        setCurrentUser({
          ...currentUser,
          displayName: displayName || currentUser.displayName,
          photoURL: photoURL || currentUser.photoURL
        });
      }
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
    DEV_MODE
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
