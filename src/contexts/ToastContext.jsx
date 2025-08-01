import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '@/components/ui/Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type = 'info', options = {}) => {
    setToast({
      message,
      type,
      isVisible: true,
      ...options
    });
  };

  const showAuthToast = (message = "Sign in to access this feature") => {
    showToast(message, 'auth', {
      showLogin: true,
      duration: 0, // Don't auto-close auth toasts
      onLogin: () => {
        hideToast();
        navigate('/signin');
      },
      onRegister: () => {
        hideToast();
        navigate('/register');
      }
    });
  };

  const hideToast = () => {
    if (toast) {
      setToast({ ...toast, isVisible: false });
      setTimeout(() => setToast(null), 300);
    }
  };

  const value = {
    showToast,
    showAuthToast,
    hideToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <Toast
          {...toast}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};
