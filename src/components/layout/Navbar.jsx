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
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex items-center mr-8">
            <div className="flex items-center justify-center w-8 h-8 bg-black rounded">
              <span className="text-lg font-bold text-white">M</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center flex-1 hidden space-x-8 md:flex">
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="text-gray-700 transition-colors hover:text-gray-900">
                Products
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <a
              href="#brands"
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              Brands
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="items-center hidden ml-auto space-x-4 md:flex">
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
              className="px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
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
          <div className="bg-white border-t border-gray-200 md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center px-3 py-2 space-x-1 cursor-pointer">
                <span className="text-gray-700">Products</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <a
                href="#brands"
                className="block px-3 py-2 text-gray-700 transition-colors rounded-md hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Brands
              </a>
              <div className="pt-2 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full text-gray-700"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Language
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full text-gray-700"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="w-full text-white bg-black hover:bg-gray-800"
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
