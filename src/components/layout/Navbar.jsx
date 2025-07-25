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
        "shadow-sm"
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
          <div className="ml-auto md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* ===== MOBILE NAVIGATION ===== */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] w-dvw h-dvh md:hidden bg-black/30">
            <div className="absolute top-16 left-0 w-full h-[calc(100dvh-4rem)] bg-white border-t border-gray-200 shadow-lg overflow-y-auto transition-all">
              {/* Close (X) button inside overlay */}
              <div className="flex justify-end px-4 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <div className="px-4 py-3 space-y-3">
                {/* Products dropdown */}
                <div className="flex items-center justify-between px-3 py-3 transition-colors rounded-md cursor-pointer hover:bg-gray-50">
                  <span className="font-medium text-gray-700">Products</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                {/* Brands link */}
                <a
                  href="#brands"
                  className="block px-3 py-3 font-medium text-gray-700 transition-colors rounded-md hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Brands
                </a>

                {/* Divider */}
                <div className="my-3 border-t border-gray-200"></div>

                {/* Mobile Actions */}
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    size="default"
                    className="justify-start w-full h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <Globe className="w-4 h-4 mr-3" />
                    Language
                  </Button>

                  <Button
                    variant="ghost"
                    size="default"
                    className="justify-start w-full h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/signin");
                    }}
                  >
                    Sign In
                  </Button>

                  <Button
                    size="default"
                    className="w-full h-12 text-white bg-black hover:bg-gray-800"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/register");
                    }}
                  >
                    Join for free
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
