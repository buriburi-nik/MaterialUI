import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import {
  loginUser,
  registerUser,
  logoutUser,
  loadPersistedAuth,
  updateLoginForm,
  updateRegisterForm,
  clearLoginForm,
  clearRegisterForm,
  clearError,
} from '../../store/slices/authSlice';
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectIsInitialized,
  selectUser,
  selectUserProfile,
  selectAuthError,
  selectAuthStatus,
  selectLoginForm,
  selectRegisterForm,
  selectLoginFormValidation,
  selectRegisterFormValidation,
  selectCanAccessFeature,
  selectIsAdmin,
  selectIsPremium,
} from '../../store/selectors/authSelectors';

// Main auth hook
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const isInitialized = useSelector(selectIsInitialized);
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const error = useSelector(selectAuthError);
  const authStatus = useSelector(selectAuthStatus);

  // Initialize auth on app startup
  useEffect(() => {
    if (!isInitialized) {
      dispatch(loadPersistedAuth());
    }
  }, [dispatch, isInitialized]);

  // Actions
  const login = useCallback(async (credentials, options = {}) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      
      if (options.showSuccessToast === true) {
        showToast(`Welcome back, ${result.user.firstName}!`, 'success');
      }
      
      if (options.redirectTo) {
        navigate(options.redirectTo);
      } else if (options.redirectToDashboard !== false) {
        navigate('/dashboard');
      }
      
      return result;
    } catch (error) {
      if (options.showErrorToast !== false) {
        showToast(error || 'Login failed', 'error');
      }
      throw error;
    }
  }, [dispatch, navigate, showToast]);

  const register = useCallback(async (userData, options = {}) => {
    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      
      if (options.showSuccessToast !== false) {
        showToast(`Welcome to Material Bank, ${result.user.firstName}!`, 'success');
      }
      
      if (options.redirectTo) {
        navigate(options.redirectTo);
      } else if (options.redirectToDashboard !== false) {
        navigate('/dashboard');
      }
      
      return result;
    } catch (error) {
      if (options.showErrorToast !== false) {
        showToast(error || 'Registration failed', 'error');
      }
      throw error;
    }
  }, [dispatch, navigate, showToast]);

  const logout = useCallback(async (options = {}) => {
    try {
      await dispatch(logoutUser()).unwrap();
      
      if (options.showSuccessToast === true) {
        showToast('Successfully logged out', 'success');
      }
      
      if (options.redirectTo) {
        navigate(options.redirectTo);
      } else if (options.redirectToHome !== false) {
        navigate('/');
      }
    } catch (error) {
      // Even if logout fails, we clear local state
      if (options.showErrorToast === true) {
        showToast('Logged out locally', 'info');
      }
      
      if (options.redirectTo) {
        navigate(options.redirectTo);
      } else if (options.redirectToHome !== false) {
        navigate('/');
      }
    }
  }, [dispatch, navigate, showToast]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    isAuthenticated,
    isLoading,
    isInitialized,
    user,
    userProfile,
    error,
    authStatus,

    // Actions
    login,
    register,
    logout,
    clearError: clearAuthError,

    // Utility methods
    isReady: authStatus.isReady,
    hasError: authStatus.hasError,
  };
};

// Hook for login form management
export const useLoginForm = () => {
  const dispatch = useDispatch();
  const form = useSelector(selectLoginForm);
  const validation = useSelector(selectLoginFormValidation);
  const { login, isLoading } = useAuth();

  const updateField = useCallback((field, value) => {
    dispatch(updateLoginForm({ field, value }));
  }, [dispatch]);

  const clearForm = useCallback(() => {
    dispatch(clearLoginForm());
  }, [dispatch]);

  const handleSubmit = useCallback(async (event) => {
    event?.preventDefault();
    
    if (!validation.canSubmit) {
      return;
    }

    try {
      await login(form);
      clearForm();
    } catch (error) {
      // Error handling is done in login function
    }
  }, [form, validation.canSubmit, login, clearForm]);

  return {
    form,
    validation,
    isLoading,
    updateField,
    clearForm,
    handleSubmit,
  };
};

// Hook for register form management
export const useRegisterForm = () => {
  const dispatch = useDispatch();
  const form = useSelector(selectRegisterForm);
  const validation = useSelector(selectRegisterFormValidation);
  const { register, isLoading } = useAuth();

  const updateField = useCallback((field, value) => {
    dispatch(updateRegisterForm({ field, value }));
  }, [dispatch]);

  const clearForm = useCallback(() => {
    dispatch(clearRegisterForm());
  }, [dispatch]);

  const handleSubmit = useCallback(async (event) => {
    event?.preventDefault();
    
    if (!validation.canSubmit) {
      return;
    }

    try {
      const { confirmPassword, agreeToTerms, ...userData } = form;
      await register(userData);
      clearForm();
    } catch (error) {
      // Error handling is done in register function
    }
  }, [form, validation.canSubmit, register, clearForm]);

  return {
    form,
    validation,
    isLoading,
    updateField,
    clearForm,
    handleSubmit,
  };
};

// Hook for protected features
export const useAuthProtection = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const canAccessFeature = useSelector(selectCanAccessFeature);

  const requireAuth = useCallback((callback, options = {}) => {
    const {
      message = "Please sign in to access this feature",
      redirectTo = "/signin",
      showToast: shouldShowToast = true,
    } = options;

    return (event) => {
      if (event) {
        event.preventDefault();
      }

      if (!isAuthenticated) {
        if (shouldShowToast) {
          showToast(message, 'warning');
        }
        
        if (redirectTo) {
          navigate(redirectTo);
        }
        
        return false;
      }

      if (callback) {
        callback(event);
      }
      
      return true;
    };
  }, [isAuthenticated, showToast, navigate]);

  const requireFeature = useCallback((featureName, callback, options = {}) => {
    const {
      message = `This feature requires additional permissions`,
      showToast: shouldShowToast = true,
    } = options;

    return (event) => {
      if (event) {
        event.preventDefault();
      }

      if (!isAuthenticated) {
        return requireAuth(callback, options)(event);
      }

      if (!canAccessFeature(featureName)) {
        if (shouldShowToast) {
          showToast(message, 'warning');
        }
        return false;
      }

      if (callback) {
        callback(event);
      }
      
      return true;
    };
  }, [isAuthenticated, canAccessFeature, requireAuth]);

  return {
    isAuthenticated,
    requireAuth,
    requireFeature,
    canAccessFeature,
  };
};

// Hook for user roles and permissions
export const useUserPermissions = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const isPremium = useSelector(selectIsPremium);
  const canAccessFeature = useSelector(selectCanAccessFeature);

  return {
    isAuthenticated,
    isAdmin,
    isPremium,
    canAccessFeature,
    
    // Convenience methods
    canManageUsers: isAdmin,
    canExportData: isAdmin,
    canAccessPremiumSamples: isPremium,
    canBulkDownload: isPremium,
  };
};

// Legacy hook for backward compatibility
export const useAuthCheck = () => {
  const { isAuthenticated, requireAuth } = useAuthProtection();
  
  return {
    isSignedIn: isAuthenticated, // Legacy naming
    requireAuth,
  };
};
