import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileMenuOpen: false,
  activeOverlay: null,
  isLoading: false,
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
    setActiveOverlay: (state, action) => {
      state.activeOverlay = action.payload;
    },
    clearActiveOverlay: (state) => {
      state.activeOverlay = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  setActiveOverlay,
  clearActiveOverlay,
  setLoading,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
