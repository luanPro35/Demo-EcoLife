import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};