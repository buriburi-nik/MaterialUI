import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  globalSearchQuery: '',
  searchHistory: [],
  isSearchActive: false,
  isSearching: false,
  searchResults: null,
  lastSearchTime: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setGlobalSearchQuery: (state, action) => {
      state.globalSearchQuery = action.payload;
      state.isSearchActive = action.payload.length > 0;

      // Start searching immediately when there's a query
      if (action.payload.length > 0) {
        state.isSearching = true;
      } else {
        state.isSearching = false;
        state.searchResults = null;
      }

      // Add to search history if it's a meaningful search (3+ characters)
      if (action.payload.length >= 3 && !state.searchHistory.includes(action.payload)) {
        state.searchHistory.unshift(action.payload);
        // Keep only last 10 searches
        if (state.searchHistory.length > 10) {
          state.searchHistory = state.searchHistory.slice(0, 10);
        }
      }
    },

    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.isSearching = false;
      state.lastSearchTime = Date.now();
    },

    setSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    
    clearGlobalSearch: (state) => {
      state.globalSearchQuery = '';
      state.isSearchActive = false;
      state.isSearching = false;
      state.searchResults = null;
    },
    
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    
    removeFromSearchHistory: (state, action) => {
      state.searchHistory = state.searchHistory.filter(
        search => search !== action.payload
      );
    },
  },
});

export const {
  setGlobalSearchQuery,
  setSearchResults,
  setSearching,
  clearGlobalSearch,
  clearSearchHistory,
  removeFromSearchHistory,
} = searchSlice.actions;

export default searchSlice.reducer;
