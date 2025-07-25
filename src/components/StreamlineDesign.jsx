import React from "react";

export default function StreamlineDesign() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-700 mb-4">
            Streamline your design.
          </h2>
        </div>

        {/* Video Interface Mockup */}
        <div className="max-w-4xl mx-auto">
          {/* Browser Window */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
            {/* Browser Header */}
            <div className="bg-gray-200 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="bg-white rounded px-3 py-1 ml-4 flex-1">
                <div className="text-xs text-gray-600">materialbank.com</div>
              </div>
            </div>

            {/* Material Bank Interface */}
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100 p-8">
              {/* Navigation Bar */}
              <div className="bg-white rounded-lg shadow-sm mb-8 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <span className="font-semibold text-slate-800">
                      Material Bank
                    </span>
                  </div>
                  <nav className="hidden md:flex items-center gap-6">
                    <span className="text-sm text-slate-600">Products</span>
                    <span className="text-sm text-slate-600">Brands</span>
                    <span className="text-sm text-slate-600">Inspiration</span>
                    <span className="text-sm text-slate-600">Boards</span>
                  </nav>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Welcome Message */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-slate-700 mb-2">
                    Hello, Francesca!
                  </h3>
                </div>

                {/* Search Interface */}
                <div className="relative mb-8">
                  <div className="flex items-center bg-gray-50 rounded-lg p-4 border-2 border-blue-200">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="text-slate-600">car</span>
                    <div className="ml-auto">
                      <div className="w-6 h-6 bg-blue-200 rounded flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Search Results Dropdown */}
                  <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 mt-2 z-10">
                    <div className="p-3">
                      <div className="text-xs text-gray-500 mb-3">
                        Search Results
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span className="text-sm">carpet</span>
                          <div className="ml-auto w-6 h-6 bg-blue-500 rounded"></div>
                        </div>
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600">
                            carpet tiles
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600">
                            cardboard
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600">carving</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600">
                            carpentry
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Curated Collections */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-slate-700">
                    Curated collections
                  </h4>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Explore collections
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Tone on tone */}
                  <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                      <div className="text-xs text-red-200 mb-2">
                        Design Trend
                      </div>
                      <h5 className="font-semibold">Tone on tone</h5>
                    </div>
                  </div>

                  {/* Upholstery favorites */}
                  <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                      <div className="text-xs text-slate-300 mb-2">
                        Material Spotlight
                      </div>
                      <h5 className="font-semibold">Upholstery favorites</h5>
                    </div>
                  </div>

                  {/* Innovative wood paneling */}
                  <div className="bg-gradient-to-br from-amber-700 to-amber-800 rounded-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                      <div className="text-xs text-amber-200 mb-2">
                        Material Roundup
                      </div>
                      <h5 className="font-semibold">
                        Innovative wood paneling
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
