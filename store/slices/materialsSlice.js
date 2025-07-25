import { createSlice } from "@reduxjs/toolkit";

const materialBoxes = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F42130226a8824935b18674a2c8e7630d%2F4c14cf2f7d0e4a938324d8b5f7ad67cb?format=webp&width=800",
    bgColor: "#97a2c2",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F42130226a8824935b18674a2c8e7630d%2Fbc28b4f7176e4971a27adf12ddb5c8e2?format=webp&width=800",
    bgColor: "#7F3F98",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F42130226a8824935b18674a2c8e7630d%2F7ea55839a8b94a81b2645d91ffa3b90b?format=webp&width=800",
    bgColor: "#4A90E2",
  },
];

const brands = [
  "iform",
  "ANN SACKS",
  "MOMENTUM",
  "Stinson",
  "Caesarstone",
  "LebaTex",
  "Interface",
  "Tarkett",
  "Wilsonart",
  "STARK",
  "Benjamin Moore",
  "Milliken",
  "Mohawk Group",
  "filaPar",
  "ARTISTIC TILE",
  "Formica",
  "Shaw",
  "Mannington",
  "Armstrong",
  "Hunter Douglas",
];

const initialState = {
  currentMaterialIndex: 0,
  materialBoxes,
  brands,
  extendedBrands: [...brands, ...brands, ...brands],
  isAnimating: false,
  searchQuery: "",
  selectedCategories: [],
  favoriteItems: [],
};

const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    setCurrentMaterialIndex: (state, action) => {
      state.currentMaterialIndex = action.payload;
    },
    nextMaterial: (state) => {
      state.currentMaterialIndex =
        (state.currentMaterialIndex + 1) % state.materialBoxes.length;
    },
    previousMaterial: (state) => {
      state.currentMaterialIndex =
        state.currentMaterialIndex === 0
          ? state.materialBoxes.length - 1
          : state.currentMaterialIndex - 1;
    },
    setAnimating: (state, action) => {
      state.isAnimating = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addToFavorites: (state, action) => {
      const item = action.payload;
      if (!state.favoriteItems.find((fav) => fav.id === item.id)) {
        state.favoriteItems.push(item);
      }
    },
    removeFromFavorites: (state, action) => {
      const itemId = action.payload;
      state.favoriteItems = state.favoriteItems.filter(
        (item) => item.id !== itemId,
      );
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      const index = state.selectedCategories.indexOf(category);
      if (index > -1) {
        state.selectedCategories.splice(index, 1);
      } else {
        state.selectedCategories.push(category);
      }
    },
    clearSelectedCategories: (state) => {
      state.selectedCategories = [];
    },
  },
});

export const {
  setCurrentMaterialIndex,
  nextMaterial,
  previousMaterial,
  setAnimating,
  setSearchQuery,
  addToFavorites,
  removeFromFavorites,
  toggleCategory,
  clearSelectedCategories,
} = materialsSlice.actions;

export default materialsSlice.reducer;
