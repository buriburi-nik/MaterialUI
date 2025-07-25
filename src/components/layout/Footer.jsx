import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Explore Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Brands
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Boards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  FAQ's
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Privacy and Legal Center
                </a>
              </li>
            </ul>
          </div>

          {/* Manufacturer Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Manufacturer? Let's Talk
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get your products in front of thousands of design professionals
              who are specifying materials for their projects.
            </p>
            <button className="bg-gray-700 hover:bg-gray-800 text-white text-sm px-4 py-2 rounded">
              Join Us
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <p className="text-sm text-gray-500">
              © 2025 Material Bank. All rights reserved.
            </p>
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
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
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Instagram
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
