import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm")}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center justify-center p-1 transition-colors duration-200 rounded-lg hover:bg-gray-50">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-800"
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M33.516 6.5H44.2757C44.3514 6.5 44.4128 6.56087 44.4128 6.63595V41.364C44.4128 41.4391 44.3514 41.5 44.2757 41.5H33.516C33.4402 41.5 33.3788 41.4391 33.3788 41.364V6.63595C33.3788 6.56087 33.4402 6.5 33.516 6.5ZM31.6822 21.0979C31.7079 21.1234 31.7223 21.1579 31.7223 21.1939C31.7223 21.23 31.7079 21.2645 31.6822 21.29L24.0751 28.8327C24.0489 28.8579 24.0138 28.8719 23.9773 28.8719C23.9408 28.8719 23.9057 28.8579 23.8795 28.8327L9.25042 14.331C9.22506 14.3049 9.21088 14.2702 9.21088 14.234C9.21088 14.1978 9.22506 14.163 9.25042 14.137L16.8575 6.59609C16.8703 6.58321 16.8855 6.57298 16.9023 6.566C16.9191 6.55902 16.9371 6.55542 16.9554 6.55542C16.9736 6.55542 16.9916 6.55902 17.0084 6.566C17.0252 6.57298 17.0404 6.58321 17.0532 6.59609L31.6822 21.0979ZM3.71716 20.7172H14.4768C14.5137 20.7172 14.549 20.7317 14.5751 20.7575C14.6012 20.7834 14.6158 20.8184 14.6158 20.8549V41.3622C14.6158 41.3983 14.6014 41.4329 14.5756 41.4584C14.5499 41.4839 14.515 41.4982 14.4787 41.4982H3.71716C3.68079 41.4982 3.64591 41.4839 3.62019 41.4584C3.59447 41.4329 3.58002 41.3983 3.58002 41.3622V20.8549C3.58002 20.8189 3.59447 20.7843 3.62019 20.7588C3.64591 20.7333 3.68079 20.719 3.71716 20.719V20.7172Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>


          {/* Desktop Navigation */}
          <div className="items-center flex-1 hidden ml-8 space-x-8 md:flex">
            

            <div className="items-center hidden px-4 py-2 space-x-10 bg-white shadow-sm md:flex rounded-xl">
  {/* Products dropdown */}
  <div className="relative flex items-center space-x-1 transition-all cursor-pointer group">
    <span className="font-medium text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
      Products
    </span>
    <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-300 group-hover:rotate-180" />
    
    {/* Optional dropdown panel */}
    <div className="absolute top-full mt-2 hidden group-hover:flex flex-col bg-white border border-gray-200 rounded-md shadow-lg p-3 min-w-[150px] z-10">
      <a href="#product1" className="px-2 py-1 text-sm text-gray-700 rounded hover:bg-gray-100">Product 1</a>
      <a href="#product2" className="px-2 py-1 text-sm text-gray-700 rounded hover:bg-gray-100">Product 2</a>
    </div>
  </div>

  {/* Brands link */}
  <a
    href="#brands"
    className="font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 hover:underline"
  >
    Brands
  </a>
</div>

          </div>

          {/* Desktop Actions */}
          <div className="items-center hidden ml-auto space-x-4 md:flex">
            <Button variant="ghost" size="sm" className="text-gray-700 rounded-full shadow-md hover:scale-105">
              <Globe className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 rounded-full shadow-md hover:scale-105" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
            <Button
              size="sm"
              className="px-4 py-2 text-white transition-colors bg-black rounded-full shadow-md hover:bg-gray-800"
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
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* ===== MOBILE NAVIGATION ===== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] w-full h-full md:hidden bg-black/30">
<div className="absolute top-16 left-0 w-full max-h-[calc(100vh-4rem)] bg-white border-t border-gray-200 shadow-lg overflow-y-auto transition-all">
            {/* Close (X) button */}
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
              <div className="my-2 border-t border-gray-200"></div>

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
    </nav>
  );
}
