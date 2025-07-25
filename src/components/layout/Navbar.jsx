import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "bg-white border-b border-gray-200",
        "shadow-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex items-center mr-8">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1">
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="text-gray-700 hover:text-gray-900 transition-colors">
                Products
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <a
              href="#brands"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Brands
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Globe className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
              onClick={() => navigate("/register")}
            >
              Join for free
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center space-x-1 px-3 py-2 cursor-pointer">
                <span className="text-gray-700">Products</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <a
                href="#brands"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Brands
              </a>
              <div className="pt-2 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-700"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Language
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-700"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  onClick={() => {
                    navigate("/register");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Join for free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
