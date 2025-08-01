import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Auth storage utilities
const AUTH_STORAGE_KEY = 'materialbank_auth';

const authStorage = {
  get: () => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading auth from localStorage:', error);
      return null;
    }
  },
  set: (authData) => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    } catch (error) {
      console.error('Error saving auth to localStorage:', error);
    }
  },
  remove: () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Error removing auth from localStorage:', error);
    }
  }
};

// Async thunks for authentication operations
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // Mock authentication - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Basic credential validation
      if (!credentials.email || !credentials.password) {
        return rejectWithValue('Please fill in all required fields');
      }

      if (!/\S+@\S+\.\S+/.test(credentials.email)) {
        return rejectWithValue('Please enter a valid email address');
      }

      // Mock user data
      const userData = {
        user: {
          id: Date.now(),
          firstName: credentials.email.split('@')[0].split('.')[0] || 'User',
          lastName: credentials.email.split('@')[0].split('.')[1] || '',
          email: credentials.email,
          role: credentials.email.includes('admin') ? 'admin' : 'user',
          subscriptionType: credentials.email.includes('premium') ? 'premium' : 'basic',
        },
        token: 'mock_jwt_token_' + Date.now(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      };

      // Save to localStorage
      authStorage.set({
        user: userData.user,
        token: userData.token,
        expiresAt: userData.expiresAt
      });

      return userData;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Mock authentication - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Basic validation
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
        return rejectWithValue('Please fill in all required fields');
      }

      if (!/\S+@\S+\.\S+/.test(userData.email)) {
        return rejectWithValue('Please enter a valid email address');
      }

      // Mock successful registration
      const responseData = {
        user: {
          id: Date.now(),
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          linkedinProfile: userData.linkedinProfile || '',
          role: 'user',
          subscriptionType: 'basic',
        },
        token: 'mock_jwt_token_' + Date.now(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      };

      // Save to localStorage
      authStorage.set({
        user: responseData.user,
        token: responseData.token,
        expiresAt: responseData.expiresAt
      });

      return responseData;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Mock logout - simulate small delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Remove from localStorage
      authStorage.remove();

      return null;
    } catch (error) {
      // Even if logout fails, clear local storage
      authStorage.remove();
      return rejectWithValue(error.message);
    }
  }
);

export const loadPersistedAuth = createAsyncThunk(
  'auth/loadPersistedAuth',
  async (_, { rejectWithValue }) => {
    try {
      const storedAuth = authStorage.get();

      if (!storedAuth || !storedAuth.token) {
        return rejectWithValue('No stored authentication found');
      }

      // Check if token is expired
      if (storedAuth.expiresAt && new Date() > new Date(storedAuth.expiresAt)) {
        authStorage.remove();
        return rejectWithValue('Token expired');
      }

      // For mock auth, just return the stored data
      return storedAuth;
    } catch (error) {
      authStorage.remove();
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false, // Track if we've attempted to load persisted auth
  error: null,
  
  // Form states
  loginForm: {
    email: "",
    password: "",
    rememberMe: false,
  },
  
  registerForm: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    linkedinProfile: "",
    agreeToTerms: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Form management
    updateLoginForm: (state, action) => {
      const { field, value } = action.payload;
      state.loginForm[field] = value;
    },
    
    updateRegisterForm: (state, action) => {
      const { field, value } = action.payload;
      state.registerForm[field] = value;
    },
    
    clearLoginForm: (state) => {
      state.loginForm = initialState.loginForm;
    },
    
    clearRegisterForm: (state) => {
      state.registerForm = initialState.registerForm;
    },
    
    // Error management
    clearError: (state) => {
      state.error = null;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // Manual auth state updates (for testing or emergency override)
    setAuthState: (state, action) => {
      const { user, token, isAuthenticated } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = isAuthenticated;
    },
  },
  
  extraReducers: (builder) => {
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.loginForm = initialState.loginForm; // Clear form on success
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });

    // Register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.registerForm = initialState.registerForm; // Clear form on success
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Logout user
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loginForm = initialState.loginForm;
        state.registerForm = initialState.registerForm;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Even if logout fails, clear the state
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    // Load persisted auth
    builder
      .addCase(loadPersistedAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadPersistedAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loadPersistedAuth.rejected, (state) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const {
  updateLoginForm,
  updateRegisterForm,
  clearLoginForm,
  clearRegisterForm,
  clearError,
  setError,
  setAuthState,
} = authSlice.actions;

// Legacy exports for backward compatibility
export const updateSignInForm = updateRegisterForm;
export const clearSignInForm = clearRegisterForm;
export const setLoading = setError; // Deprecated
export const signInSuccess = setAuthState; // Deprecated
export const signOut = logoutUser; // Use logoutUser async thunk instead

export default authSlice.reducer;
