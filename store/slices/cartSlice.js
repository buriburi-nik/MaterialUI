import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isOpen: false,
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === newItem.id
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === itemId
      );

      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items.splice(existingItemIndex, 1);
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === id
      );

      if (existingItemIndex >= 0 && quantity > 0) {
        const existingItem = state.items[existingItemIndex];
        const quantityDiff = quantity - existingItem.quantity;
        
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += existingItem.price * quantityDiff;
      } else if (existingItemIndex >= 0 && quantity <= 0) {
        // Remove item if quantity is 0 or less
        const existingItem = state.items[existingItemIndex];
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items.splice(existingItemIndex, 1);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    loadCartFromStorage: (state, action) => {
      const savedCart = action.payload;
      if (savedCart) {
        state.items = savedCart.items || [];
        state.totalQuantity = savedCart.totalQuantity || 0;
        state.totalAmount = savedCart.totalAmount || 0;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
