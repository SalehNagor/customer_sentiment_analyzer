import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/login-screen" state={{ from: location }} replace />;
  }

  if (allowedRoles?.length > 0 && !allowedRoles?.includes(profile?.role)) {
    // Redirect agent to their default page if trying to access restricted route
    return <Navigate to="/voice-analysis-hub" replace />;
  }

  return children;
};

export default ProtectedRoute;