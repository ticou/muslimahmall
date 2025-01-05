import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    // Stocker la page actuelle dans le state pour y revenir après connexion
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};