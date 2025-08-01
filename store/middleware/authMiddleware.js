import { createListenerMiddleware } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser, loadPersistedAuth } from '../slices/authSlice';

// Create auth listener middleware
export const authListenerMiddleware = createListenerMiddleware();

// Listen for successful login/register to set up auto-refresh
authListenerMiddleware.startListening({
  matcher: (action) => 
    loginUser.fulfilled.match(action) || 
    registerUser.fulfilled.match(action) ||
    loadPersistedAuth.fulfilled.match(action),
  effect: async (action, listenerApi) => {
    const { token, expiresAt } = action.payload;
    
    if (token && expiresAt) {
      // Calculate time until token expires
      const expiresAtTime = new Date(expiresAt).getTime();
      const currentTime = new Date().getTime();
      const timeUntilExpiry = expiresAtTime - currentTime;
      
      // Set up auto-logout 5 minutes before expiry
      const autoLogoutTime = Math.max(timeUntilExpiry - (5 * 60 * 1000), 0);
      
      if (autoLogoutTime > 0) {
        setTimeout(() => {
          console.log('Token expiring soon, logging out...');
          listenerApi.dispatch(logoutUser());
        }, autoLogoutTime);
      }
    }
  },
});

// Listen for logout to clean up any pending timers
authListenerMiddleware.startListening({
  actionCreator: logoutUser.fulfilled,
  effect: async (action, listenerApi) => {
    // Clear any auth-related cached data
    console.log('User logged out, cleaning up...');
    
    // You could dispatch additional cleanup actions here
    // For example, clearing cached data from other slices
  },
});

// Middleware to add auth token to requests
export const authTokenMiddleware = (store) => (next) => (action) => {
  // Add token to any API requests automatically
  if (action.type?.endsWith('/pending') && action.meta?.arg) {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token && action.meta.arg.headers) {
      action.meta.arg.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return next(action);
};

// Network error handling middleware
export const authErrorMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Handle 401 Unauthorized responses
  if (action.type?.endsWith('/rejected') && action.payload?.status === 401) {
    // Automatically logout on 401 responses
    store.dispatch(logoutUser());
  }
  
  return result;
};

export default authListenerMiddleware;
