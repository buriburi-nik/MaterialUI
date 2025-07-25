import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scrollY: 0,
  scrollDirection: "down",
  lastScrollY: 0,
  isScrolling: false,
  scrollSections: {},
};

const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    updateScrollPosition: (state, action) => {
      const newScrollY = action.payload;
      state.scrollDirection = newScrollY > state.scrollY ? "down" : "up";
      state.lastScrollY = state.scrollY;
      state.scrollY = newScrollY;
    },
    setScrolling: (state, action) => {
      state.isScrolling = action.payload;
    },
    updateScrollSection: (state, action) => {
      const { sectionId, position } = action.payload;
      state.scrollSections[sectionId] = position;
    },
    resetScrollState: (state) => {
      state.scrollY = 0;
      state.scrollDirection = "down";
      state.lastScrollY = 0;
      state.isScrolling = false;
    },
  },
});

export const {
  updateScrollPosition,
  setScrolling,
  updateScrollSection,
  resetScrollState,
} = scrollSlice.actions;

export default scrollSlice.reducer;
