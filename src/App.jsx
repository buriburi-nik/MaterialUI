import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import Navbar from "@/components/layout/Navbar";
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import Register from "@/pages/Register";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<><Navbar /><Index /></>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
