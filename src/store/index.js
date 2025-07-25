import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import scrollReducer from "./slices/scrollSlice";
import materialsReducer from "./slices/materialsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    scroll: scrollReducer,
    materials: materialsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
