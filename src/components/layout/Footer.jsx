import React from "react";

export default function Footer() {
  const handleJoinUs = () => {
    // Replace with your navigation logic
    console.log("Navigate to register page");
  };
  
  return (
    <footer className="px-4 py-8 bg-gray-50 sm:px-6 lg:px-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Top Section - Three columns side by side on mobile */}
        <div className="grid grid-cols-3 gap-4 mb-6 sm:gap-8 lg:grid-cols-4 lg:mb-8">
          
          {/* Explore Column */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs font-semibold text-gray-900 sm:text-sm sm:mb-4">
              Explore
            </h3>
            <ul className="space-y-1 text-xs text-gray-600 sm:space-y-3 sm:text-sm">
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  Brands
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  Boards
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs font-semibold text-gray-900 sm:text-sm sm:mb-4">
              About
            </h3>
            <ul className="space-y-1 text-xs text-gray-600 sm:space-y-3 sm:text-sm">
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs font-semibold text-gray-900 sm:text-sm sm:mb-4">
              Support
            </h3>
            <ul className="space-y-1 text-xs text-gray-600 sm:space-y-3 sm:text-sm">
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  FAQ's
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 hover:text-gray-900 active:text-gray-900">
                  Privacy and Legal Center
                </a>
              </li>
            </ul>
          </div>

          {/* Manufacturer Section - Hidden on mobile, shows on lg+ */}
          <div className="hidden space-y-3 lg:block">
            <h3 className="text-sm font-semibold text-gray-900 sm:mb-4">
              Manufacturer? Let's Talk
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 sm:mb-4">
              Get your products in front of thousands of design professionals
              who are specifying materials for their projects.
            </p>
            <button
              onClick={handleJoinUs}
              className="w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-700 rounded-md hover:bg-gray-800 active:bg-gray-900 sm:w-auto"
            >
              Join Us
            </button>
          </div>
        </div>

        {/* Manufacturer Section - Shows on mobile and tablet only */}
        <div className="mb-6 space-y-3 lg:hidden sm:mb-8">
          <h3 className="text-sm font-semibold text-gray-900 sm:mb-4">
            Manufacturer? Let's Talk
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 sm:mb-4">
            Get your products in front of thousands of design professionals
            who are specifying materials for their projects.
          </p>
          <button
            onClick={handleJoinUs}
            className="w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-gray-700 rounded-md hover:bg-gray-800 active:bg-gray-900 sm:w-auto sm:py-2"
          >
            Join Us
          </button>
        </div>

        {/* Bottom Section - Stack on mobile */}
        <div className="pt-4 border-t border-gray-200 sm:pt-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            
            {/* Copyright and Language */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              <p className="text-sm text-gray-500">
                © 2025 Material Bank. All rights reserved.
              </p>
              <div className="flex items-center space-x-2">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-500">English</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <a 
                href="#" 
                className="py-2 text-sm text-gray-500 hover:text-gray-900 active:text-gray-900"
                aria-label="Follow us on Instagram"
              >
                Instagram
              </a>
              <a 
                href="#" 
                className="py-2 text-sm text-gray-500 hover:text-gray-900 active:text-gray-900"
                aria-label="Connect with us on LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}