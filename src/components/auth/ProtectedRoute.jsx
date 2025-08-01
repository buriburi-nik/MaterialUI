import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requireRole = null,
  requireFeature = null,
  fallbackPath = '/signin',
  showLoading = true 
}) => {
  const { isAuthenticated, isLoading, isInitialized, user } = useAuth();
  const location = useLocation();

  // Show loading while auth is being initialized
  if (!isInitialized || isLoading) {
    if (!showLoading) return null;
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to={fallbackPath} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Check role requirement
  if (requireRole && user?.role !== requireRole) {
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ requiredRole: requireRole, userRole: user?.role }} 
        replace 
      />
    );
  }

  // Check feature requirement (you can expand this logic)
  if (requireFeature) {
    const hasFeature = checkUserFeatureAccess(user, requireFeature);
    if (!hasFeature) {
      return (
        <Navigate 
          to="/upgrade" 
          state={{ requiredFeature: requireFeature }} 
          replace 
        />
      );
    }
  }

  return children;
};

// Helper function to check feature access
const checkUserFeatureAccess = (user, featureName) => {
  if (!user) return false;
  
  const featureRules = {
    'premium-samples': user.subscriptionType === 'premium',
    'bulk-download': user.subscriptionType === 'premium',
    'admin-panel': user.role === 'admin',
    'advanced-analytics': user.role === 'admin' || user.subscriptionType === 'premium',
  };
  
  return featureRules[featureName] ?? true; // Default to true for unknown features
};

export default ProtectedRoute;
