import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from './auth/Login';
import Dashboard from './Dashboard';
import AccountProfile from './AccountProfile';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Dashboard /> : <Login />} 
      />
      <Route 
        path="/account" 
        element={user ? <AccountProfile /> : <Navigate to="/" />} 
      />
      <Route 
        path="*" 
        element={<Navigate to="/" />} 
      />
    </Routes>
  );
};

export default App;
