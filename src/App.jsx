import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import { ToastProvider } from "@/contexts/ToastContext";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Brands from "@/pages/Brands";
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
  return (
    <AuthInitializer>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<><Navbar /><Index /><Footer/></>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/brands" element={<><Navbar /><Brands /></>} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard /><Footer/></>} />
        </Routes>
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
