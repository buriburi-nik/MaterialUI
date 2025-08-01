import React from 'react';
import { useAuth, useUserPermissions } from '@/hooks/useAuth';

// Component that conditionally renders children based on auth state
const AuthGuard = ({ 
  children, 
  fallback = null, 
  requireAuth = true,
  requireRole = null,
  requireFeature = null,
  inverse = false // Show when NOT authenticated
}) => {
  const { isAuthenticated, user } = useAuth();
  const { canAccessFeature } = useUserPermissions();

  let shouldShow = true;

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    shouldShow = false;
  }

  // Check role
  if (requireRole && user?.role !== requireRole) {
    shouldShow = false;
  }

  // Check feature access
  if (requireFeature && !canAccessFeature(requireFeature)) {
    shouldShow = false;
  }

  // Inverse logic (show when NOT authenticated)
  if (inverse) {
    shouldShow = !shouldShow;
  }

  return shouldShow ? children : fallback;
};

// Pre-configured components for common use cases
export const AuthenticatedOnly = ({ children, fallback = null }) => (
  <AuthGuard requireAuth={true} fallback={fallback}>
    {children}
  </AuthGuard>
);

export const UnauthenticatedOnly = ({ children, fallback = null }) => (
  <AuthGuard requireAuth={true} inverse={true} fallback={fallback}>
    {children}
  </AuthGuard>
);

export const AdminOnly = ({ children, fallback = null }) => (
  <AuthGuard requireAuth={true} requireRole="admin" fallback={fallback}>
    {children}
  </AuthGuard>
);

export const PremiumOnly = ({ children, fallback = null }) => (
  <AuthGuard requireAuth={true} requireFeature="premium-samples" fallback={fallback}>
    {children}
  </AuthGuard>
);

export default AuthGuard;
