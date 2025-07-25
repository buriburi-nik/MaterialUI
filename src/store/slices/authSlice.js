import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isSignedIn: false,
  isLoading: false,
  error: null,
  signInForm: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    linkedinProfile: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateSignInForm: (state, action) => {
      const { field, value } = action.payload;
      state.signInForm[field] = value;
    },
    clearSignInForm: (state) => {
      state.signInForm = initialState.signInForm;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.isSignedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    signOut: (state) => {
      state.user = null;
      state.isSignedIn = false;
      state.error = null;
    },
  },
});

export const {
  updateSignInForm,
  clearSignInForm,
  setLoading,
  setError,
  signInSuccess,
  signOut,
} = authSlice.actions;

export default authSlice.reducer;
