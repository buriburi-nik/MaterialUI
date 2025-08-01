import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import { ToastProvider } from "@/contexts/ToastContext";
import { useAuth } from "@/hooks/useAuth";
import { loadCartFromStorage } from "../store/slices/cartSlice";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/ui/CartDrawer";
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Brands from "@/pages/Brands";
import Products from "@/pages/Products";
import Dashboard from "@/pages/Dashboard";
import Footer from "@/components/layout/Footer";

// Auth initialization component
function AuthInitializer({ children }) {
  const { isInitialized, isLoading } = useAuth();

  if (!isInitialized || isLoading) {
    // Optional: Show a loading spinner while initializing auth
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
}

function AppRoutes() {
  const dispatch = useDispatch();

  // Load cart from localStorage on app start
  useEffect(() => {
    const savedCart = localStorage.getItem('materialbank-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch(loadCartFromStorage(cartData));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, [dispatch]);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const cartData = {
        items: state.cart.items,
        totalQuantity: state.cart.totalQuantity,
        totalAmount: state.cart.totalAmount
      };
      localStorage.setItem('materialbank-cart', JSON.stringify(cartData));
    });

    return unsubscribe;
  }, []);

  return (
    <AuthInitializer>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<><Navbar /><Index /><Footer/></>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/brands" element={<><Navbar /><Brands /></>} />
          <Route path="/products" element={<><Navbar /><Products /><Footer /></>} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard /><Footer/></>} />
        </Routes>
        <CartDrawer />
      </div>
    </AuthInitializer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
