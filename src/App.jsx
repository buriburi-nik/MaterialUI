import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import { ToastProvider } from "@/contexts/ToastContext";
import Navbar from "@/components/layout/Navbar";
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Brands from "@/pages/Brands";
import Dashboard from "@/pages/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<><Navbar /><Index /></>} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<ForgotPassword />} />
              <Route path="/brands" element={<><Navbar /><Brands /></>} />
              <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
            </Routes>
          </div>
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
