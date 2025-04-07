import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Login from '../../components/auth/Login';
import Signup from '../../components/auth/Signup';
import PasswordReset from '../../components/auth/PasswordReset';

// Mock the Firebase auth context
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn().mockResolvedValue({}),
    signup: jest.fn().mockResolvedValue({}),
    resetPassword: jest.fn().mockResolvedValue({}),
    currentUser: null
  }),
  AuthProvider: ({ children }) => <div>{children}</div>
}));

describe('Authentication Components', () => {
  test('Login form renders correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });
  
  test('Signup form renders correctly', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument();
  });
  
  test('Password Reset form renders correctly', () => {
    render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Reset your password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
  });
  
  test('Login form handles submission', () => {
    const { useAuth } = require('../../contexts/AuthContext');
    const mockLogin = jest.fn().mockResolvedValue({});
    useAuth.mockReturnValue({
      login: mockLogin,
      currentUser: null
    });
    
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));
    
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
