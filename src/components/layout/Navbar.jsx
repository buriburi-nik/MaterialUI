import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown, Search, ShoppingCart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, useAuthProtection } from "@/hooks/useAuth";
import { useToast } from "@/contexts/ToastContext";
import { openCart } from "../../../store/slices/cartSlice";
import { setGlobalSearchQuery } from "../../../store/slices/searchSlice";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, userProfile, logout } = useAuth();
  const { requireAuth } = useAuthProtection();
  const { showAuthToast } = useToast();
  const { totalQuantity } = useSelector(state => state.cart);
  const { globalSearchQuery, isSearching } = useSelector(state => state.search);

  const handleSignOut = () => {
    logout({ showSuccessToast: true });
  };

  const getInitials = (user) => {
    if (!user?.email) return "U";
    const email = user.email;
    const parts = email.split("@")[0].split(".");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email[0].toUpperCase();
  };

  const getUserDisplayName = (user) => {
    if (!user?.email) return "User";
    const email = user.email;
    const localPart = email.split("@")[0];
    return localPart.replace(".", " ");
  };

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false);
      }
      if (isProductsDropdownOpen && !event.target.closest('.products-dropdown')) {
        setIsProductsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen, isProductsDropdownOpen]);

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm")}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
              className="flex items-center justify-center p-1 transition-colors duration-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
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
            </button>
          </div>


          {/* Desktop Navigation */}
          <div className="items-center flex-1 hidden ml-8 space-x-8 md:flex">
            {/* Navigation Links */}
            <div className="items-center hidden px-4 py-2 space-x-10 bg-white shadow-sm md:flex rounded-xl">
              {/* Products dropdown */}
              <div className="relative products-dropdown">
                <button
                  className="flex items-center space-x-1 transition-all cursor-pointer"
                  onClick={() => {
                    if (isAuthenticated) {
                      setIsProductsDropdownOpen(!isProductsDropdownOpen);
                    } else {
                      showAuthToast("Sign in to explore our product catalog");
                    }
                  }}
                >
                  <span className="font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900">
                    Products
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Clean dropdown panel */}
                {isAuthenticated && isProductsDropdownOpen && (
                  <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-4 min-w-[600px] z-10">
                    <div className="grid grid-cols-3 gap-6 px-4">
                      {/* Architectural */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 text-sm">Architectural</h3>
                        <div className="space-y-1">
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Ceiling</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Decking</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Facade</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">HVAC</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Moulding & Trim</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Paving & Landscape</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Stair & Elevator</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Wall Systems</button>
                        </div>
                      </div>

                      {/* Materials */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 text-sm">Materials</h3>
                        <div className="space-y-1">
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Film</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Flooring</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Glass</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Leather</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Masonry & Stone</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Metal</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-900 hover:text-gray-900 py-1 font-medium text-left w-full">Paints</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Paneling</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Resin</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Surfaces</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Textiles</button>
                        </div>
                      </div>

                      {/* Furniture Fixtures And Equipment */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 text-sm">Furniture Fixtures And Equipment</h3>
                        <div className="space-y-1">
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Acoustical</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Appliances</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Bathroom</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Decor & Accessories</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Furniture</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Gym & Recreation</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Hardware</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 font-medium text-left w-full">Kitchen</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Lighting</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Outdoor</button>
                          <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="block text-sm text-gray-600 hover:text-gray-900 py-1 text-left w-full">Window Treatments</button>
                        </div>
                      </div>
                    </div>

                    {/* Footer buttons */}
                    <div className="mt-4 pt-4 border-t border-gray-100 px-4 flex justify-between">
                      <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="text-sm text-gray-600 hover:text-gray-900">See all Products</button>
                      <button onClick={() => { setIsProductsDropdownOpen(false); navigate('/products'); }} className="text-sm bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-800">See all New Products</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Brands link */}
              <a
                href="/brands"
                onClick={(e) => {
                  e.preventDefault();
                  if (isAuthenticated) {
                    navigate("/brands");
                  } else {
                    showAuthToast("Sign in to explore our brand catalog");
                  }
                }}
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 hover:underline cursor-pointer"
              >
                Brands
              </a>
            </div>

            {/* Search Bar - Only show when authenticated */}
            {isAuthenticated && (
              <div className="flex-1 max-w-lg mx-8">
                <div className="relative">
                  {isSearching ? (
                    <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
                  ) : (
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  )}
                  <input
                    type="text"
                    placeholder="Search materials, products, brands..."
                    value={globalSearchQuery}
                    onChange={(e) => {
                      dispatch(setGlobalSearchQuery(e.target.value));
                      // Navigate to products page if not already there and there's a search query
                      if (e.target.value && window.location.pathname !== '/products') {
                        navigate('/products');
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && globalSearchQuery.trim()) {
                        navigate('/products');
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="items-center hidden ml-auto space-x-4 md:flex">
            {/* Language/Globe button - always visible */}
            <Button variant="ghost" size="sm" className="text-gray-700 rounded-full shadow-md hover:scale-105">
              <Globe className="w-4 h-4" />
            </Button>

            {isAuthenticated ? (
              /* Authenticated state */
              <>
                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {getInitials(user)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{getUserDisplayName(user)}</span>
                    </div>
                  </div>

                  {/* User dropdown */}
                  <div className="relative user-dropdown">
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Dropdown menu */}
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setIsUserDropdownOpen(false);
                              handleSignOut();
                            }}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shopping Cart */}
                <button
                  onClick={() => dispatch(openCart())}
                  className="relative p-2 text-gray-700 rounded-full shadow-md hover:scale-105 hover:bg-gray-50 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {totalQuantity}
                    </span>
                  )}
                </button>
              </>
            ) : (
              /* Unauthenticated state */
              <>
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
              </>
            )}
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
              {/* Search Bar - Only show when authenticated */}
              {isAuthenticated && (
                <div className="mb-4">
                  <div className="relative">
                    {isSearching ? (
                      <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
                    ) : (
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    )}
                    <input
                      type="text"
                      placeholder="Search materials, products, brands..."
                      value={globalSearchQuery}
                      onChange={(e) => {
                        dispatch(setGlobalSearchQuery(e.target.value));
                        // Navigate to products page if not already there and there's a search query
                        if (e.target.value && window.location.pathname !== '/products') {
                          setIsMobileMenuOpen(false);
                          navigate('/products');
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && globalSearchQuery.trim()) {
                          setIsMobileMenuOpen(false);
                          navigate('/products');
                        }
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Products dropdown */}
              <div
                className="flex items-center justify-between px-3 py-3 transition-colors rounded-md cursor-pointer hover:bg-gray-50"
                onClick={isAuthenticated ? null : () => showAuthToast("Sign in to explore our product catalog")}
              >
                <span className="font-medium text-gray-700">Products</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>

              {/* Brands link */}
              <a
                href="/brands"
                className="block px-3 py-3 font-medium text-gray-700 transition-colors rounded-md hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  if (isAuthenticated) {
                    navigate("/brands");
                  } else {
                    showAuthToast("Sign in to explore our brand catalog");
                  }
                }}
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

                {isAuthenticated ? (
                  /* Authenticated mobile actions */
                  <>
                    {/* User Profile */}
                    <div className="flex items-center px-3 py-3 space-x-3 bg-gray-50 rounded-md">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {getInitials(user)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{getUserDisplayName(user)}</span>
                        <span className="text-xs text-gray-500">{user?.email}</span>
                      </div>
                    </div>

                    {/* Shopping Cart */}
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        dispatch(openCart());
                      }}
                      className="flex items-center justify-start w-full h-12 px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-md"
                    >
                      <div className="relative mr-3">
                        <ShoppingCart className="w-4 h-4" />
                        {totalQuantity > 0 && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                            {totalQuantity > 9 ? '9+' : totalQuantity}
                          </span>
                        )}
                      </div>
                      Cart {totalQuantity > 0 && `(${totalQuantity})`}
                    </button>

                    {/* Sign Out */}
                    <Button
                      variant="ghost"
                      size="default"
                      className="justify-start w-full h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleSignOut();
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  /* Unauthenticated mobile actions */
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
