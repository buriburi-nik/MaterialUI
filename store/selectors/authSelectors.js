import { createSelector } from '@reduxjs/toolkit';

// Base auth selector
const selectAuth = (state) => state.auth;

// Basic selectors
export const selectUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);

export const selectToken = createSelector(
  [selectAuth],
  (auth) => auth.token
);

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectIsLoading = createSelector(
  [selectAuth],
  (auth) => auth.isLoading
);

export const selectIsInitialized = createSelector(
  [selectAuth],
  (auth) => auth.isInitialized
);

export const selectAuthError = createSelector(
  [selectAuth],
  (auth) => auth.error
);

// Form selectors
export const selectLoginForm = createSelector(
  [selectAuth],
  (auth) => auth.loginForm
);

export const selectRegisterForm = createSelector(
  [selectAuth],
  (auth) => auth.registerForm
);

// Computed selectors
export const selectUserProfile = createSelector(
  [selectUser],
  (user) => user ? {
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    initials: `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase(),
    email: user.email,
    role: user.role || 'user',
  } : null
);

export const selectIsAdmin = createSelector(
  [selectUser],
  (user) => user?.role === 'admin'
);

export const selectIsPremium = createSelector(
  [selectUser],
  (user) => user?.subscriptionType === 'premium'
);

export const selectCanAccessFeature = createSelector(
  [selectIsAuthenticated, selectUser],
  (isAuthenticated, user) => (featureName) => {
    if (!isAuthenticated) return false;
    
    // Define feature access rules
    const featureRules = {
      'premium-samples': user?.subscriptionType === 'premium',
      'bulk-download': user?.subscriptionType === 'premium',
      'advanced-filters': isAuthenticated,
      'save-materials': isAuthenticated,
      'create-boards': isAuthenticated,
      'export-data': user?.role === 'admin',
      'user-management': user?.role === 'admin',
    };
    
    return featureRules[featureName] ?? false;
  }
);

// Authentication status selectors
export const selectAuthStatus = createSelector(
  [selectIsAuthenticated, selectIsLoading, selectIsInitialized, selectAuthError],
  (isAuthenticated, isLoading, isInitialized, error) => ({
    isAuthenticated,
    isLoading,
    isInitialized,
    hasError: !!error,
    error,
    isReady: isInitialized && !isLoading,
  })
);

// Form validation selectors
export const selectLoginFormValidation = createSelector(
  [selectLoginForm],
  (form) => {
    const errors = {};
    
    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
      canSubmit: Object.keys(errors).length === 0 && form.email && form.password,
    };
  }
);

export const selectRegisterFormValidation = createSelector(
  [selectRegisterForm],
  (form) => {
    const errors = {};
    
    if (!form.firstName) errors.firstName = 'First name is required';
    if (!form.lastName) errors.lastName = 'Last name is required';
    
    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!form.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
      canSubmit: Object.keys(errors).length === 0 && 
                 form.firstName && form.lastName && form.email && 
                 form.password && form.confirmPassword && form.agreeToTerms,
    };
  }
);
