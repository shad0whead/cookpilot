// This is a DEV_MODE-only version of firebase.js that doesn't require actual Firebase credentials
// It provides mock implementations of Firebase auth functions for development purposes

// Mock auth object with methods that simulate Firebase auth behavior
const auth = {
  // Current user state (null when not logged in)
  currentUser: null,
  
  // Mock sign in function
  signInWithEmailAndPassword: (email, password) => {
    console.log('DEV_MODE: Mock sign in with', email);
    
    // For development, accept any credentials
    auth.currentUser = {
      uid: 'dev-user-123',
      email: email,
      displayName: email.split('@')[0],
      emailVerified: true
    };
    
    // Notify any listeners
    if (auth.onAuthStateChangedCallback) {
      auth.onAuthStateChangedCallback(auth.currentUser);
    }
    
    return Promise.resolve({ user: auth.currentUser });
  },
  
  // Mock sign up function
  createUserWithEmailAndPassword: (email, password) => {
    console.log('DEV_MODE: Mock sign up with', email);
    
    auth.currentUser = {
      uid: 'dev-user-' + Math.floor(Math.random() * 1000),
      email: email,
      displayName: email.split('@')[0],
      emailVerified: false
    };
    
    // Notify any listeners
    if (auth.onAuthStateChangedCallback) {
      auth.onAuthStateChangedCallback(auth.currentUser);
    }
    
    return Promise.resolve({ user: auth.currentUser });
  },
  
  // Mock sign out function
  signOut: () => {
    console.log('DEV_MODE: Mock sign out');
    
    auth.currentUser = null;
    
    // Notify any listeners
    if (auth.onAuthStateChangedCallback) {
      auth.onAuthStateChangedCallback(null);
    }
    
    return Promise.resolve();
  },
  
  // Mock auth state change listener
  onAuthStateChanged: (callback) => {
    console.log('DEV_MODE: Setting up mock auth state listener');
    
    auth.onAuthStateChangedCallback = callback;
    
    // Immediately call with current state
    if (callback) {
      callback(auth.currentUser);
    }
    
    // Return unsubscribe function
    return () => {
      auth.onAuthStateChangedCallback = null;
    };
  },
  
  // Storage for the callback
  onAuthStateChangedCallback: null
};

console.log('DEV_MODE: Using mock Firebase authentication');

export { auth };
