import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login.tsx';
import Signup from './auth/Signup.tsx';
import Dashboard from './dashboard/Dashboard.tsx';
import RecipeList from './recipes/components/RecipeList.tsx';
import RecipeDetail from './recipes/components/RecipeDetail.tsx';
import RecipeForm from './recipes/components/RecipeForm.tsx';
import RecipeScaling from './recipes/components/RecipeScaling.tsx';
import IngredientReplacement from './recipes/components/IngredientReplacement.tsx';
import NutritionCalculator from './recipes/components/NutritionCalculator.tsx';
import ExportShare from './recipes/components/ExportShare.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';

function App() {
  const { currentUser } = useAuth();

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-background-darkmode text-textColor-darkmode">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Route */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Recipe Routes */}
          <Route 
            path="/recipes" 
            element={
              <ProtectedRoute>
                <RecipeList />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/recipes/new" 
            element={
              <ProtectedRoute>
                <RecipeForm />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/recipes/:id" 
            element={
              <ProtectedRoute>
                <RecipeDetail />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/recipes/:id/edit" 
            element={
              <ProtectedRoute>
                <RecipeForm />
              </ProtectedRoute>
            } 
          />
          
          {/* Advanced Recipe Features */}
          <Route 
            path="/recipes/:id/scale" 
            element={
              <ProtectedRoute>
                <RecipeScaling />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/recipes/:id/ingredients" 
            element={
              <ProtectedRoute>
                <IngredientReplacement />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/recipes/:id/nutrition" 
            element={
              <ProtectedRoute>
                <NutritionCalculator />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/recipes/:id/export" 
            element={
              <ProtectedRoute>
                <ExportShare />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
