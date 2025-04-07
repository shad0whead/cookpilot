import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../utils/firebase.ts';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  isEmailVerified: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send verification email immediately after signup
    if (userCredential.user) {
      await sendEmailVerification(userCredential.user);
    }
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function sendVerificationEmail() {
    if (currentUser && !currentUser.emailVerified) {
      return sendEmailVerification(currentUser);
    }
    return Promise.reject(new Error("No user is logged in or email is already verified"));
  }

  function isEmailVerified() {
    return currentUser?.emailVerified || false;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Force refresh to get the latest emailVerified status
      if (user) {
        user.reload().then(() => {
          setCurrentUser(user);
          setLoading(false);
        });
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    sendVerificationEmail,
    isEmailVerified
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
