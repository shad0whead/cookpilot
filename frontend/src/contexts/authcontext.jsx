import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../utils/firebase';

// Set to true to bypass Firebase authentication for development
const DEV_MODE = true;

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component that wraps the app and provides auth context
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to handle login
  const login = async (email, password) => {
    setError('');
    try {
      if (DEV_MODE) {
        console.log('DEV_MODE: Logging in with mock credentials');
        // In DEV_MODE, we'll use the mock auth implementation
        const result = await auth.signInWithEmailAndPassword(email, password);
        setUser(result.user);
        return result;
      } else {
        // In production, we'll use the real Firebase auth
        const result = await auth.signInWithEmailAndPassword(email, password);
        setUser(result.user);
        return result;
      }
    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message);
      throw err;
    }
  };

  // Function to handle signup
  const signup = async (email, password) => {
    setError('');
    try {
      if (DEV_MODE) {
        console.log('DEV_MODE: Signing up with mock credentials');
        // In DEV_MODE, we'll use the mock auth implementation
        const result = await auth.createUserWithEmailAndPassword(email, password);
        setUser(result.user);
        return result;
      } else {
        // In production, we'll use the real Firebase auth
        const result = await auth.createUserWithEmailAndPassword(email, password);
        setUser(result.user);
        return result;
      }
    } catch (err) {
      console.error('Signup error:', err.message);
      setError(err.message);
      throw err;
    }
  };

  // Function to handle logout
  const logout = async () => {
    setError('');
    try {
      if (DEV_MODE) {
        console.log('DEV_MODE: Logging out');
        // In DEV_MODE, we'll use the mock auth implementation
        await auth.signOut();
        setUser(null);
      } else {
        // In production, we'll use the real Firebase auth
        await auth.signOut();
        setUser(null);
      }
    } catch (err) {
      console.error('Logout error:', err.message);
      setError(err.message);
      throw err;
    }
  };

  // Effect to handle auth state changes
  useEffect(() => {
    console.log('DEV_MODE enabled:', DEV_MODE);
    
    if (DEV_MODE) {
      // In DEV_MODE, we'll auto-login a mock user
      console.log('DEV_MODE: Auto-logging in mock user');
      setUser({
        uid: 'dev-user-123',
        email: 'dev@example.com',
        displayName: 'Development User',
        emailVerified: true
      });
      setLoading(false);
      return;
    }
    
    // In production, we'll listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Value to be provided by the context
  const value = {
    user,
    login,
    signup,
    logout,
    error,
    loading,
    DEV_MODE
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
