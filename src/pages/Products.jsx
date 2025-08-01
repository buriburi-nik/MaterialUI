import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  Filter,
  Search,
  Grid,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  FileText,
  Headphones,
  Calendar,
  Menu,
  X,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Products = () => {
  const { user, userProfile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'All',
    commercial: false,
    residential: false,
    allColorways: false,
    brands: [],
    priceRange: { min: 0, max: 1000 },
    colors: [],
    countries: [],
    availability: 'all',
    patterns: [],
    metallicFinish: false,
    features: [],
    applications: [],
    content: [],
    flammability: 'all',
    abrasion: 'all',
    climateImpact: 'all',
    humanHealthImpact: 'all',
    socialEquityImpact: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsPerPage] = useState(12);

  const sidebarItems = [
    {
      category: "Project resources",
      items: [
        { name: "Boards", icon: FolderOpen },
        { name: "Notes", icon: FileText },
      ],
    },
    {
      category: "Messaging",
      items: [{ name: "Help", icon: Headphones }],
    },
    {
      category: "History",
      items: [{ name: "Order history", icon: Calendar }],
    },
  ];

  // Dynamic category counts
  const getCategoryCount = (categoryName) => {
    if (categoryName === 'All') return filteredProducts.length;
    return filteredProducts.filter(product => product.category === categoryName).length;
  };

  const categories = [
    { name: 'All' },
    { name: 'Surfaces' },
    { name: 'Bathroom' },
    { name: 'Flooring' },
    { name: 'Tile' },
    { name: 'Furniture' },
  ];

  const products = [
    {
      id: 1,
      name: 'PROJECT FLOORS',
      brand: 'VINYL FLOORING',
      brandName: 'Project Floors',
      image: '/api/placeholder/200/150',
      type: 'flooring',
      category: 'Flooring',
      price: 45.99,
      colors: ['Brown', 'Wood'],
      country: 'Germany',
      commercial: true,
      residential: true,
      pattern: 'Wood Grain',
      features: ['Waterproof', 'Easy Install'],
      application: 'Indoor',
      hasButton: true,
      buttonText: 'Add to Cart'
    },
    {
      id: 2,
      name: 'LASERHOLZ by Keplinger',
      brand: 'WOOD',
      brandName: 'Keplinger',
      image: '/api/placeholder/200/150',
      type: 'surfaces',
      category: 'Surfaces',
      price: 89.50,
      colors: ['Gray', 'Natural'],
      country: 'Austria',
      commercial: true,
      residential: false,
      pattern: 'Geometric',
      features: ['Laser Cut', 'Precision'],
      application: 'Wall',
      hasButton: true,
      buttonText: 'Add to Cart'
    },
    {
      id: 3,
      name: 'Laminum',
      brand: 'PORCELAIN PANEL',
      brandName: 'Laminum',
      image: '/api/placeholder/200/150',
      type: 'surfaces',
      category: 'Surfaces',
      price: 125.00,
      colors: ['Black', 'Charcoal'],
      country: 'Italy',
      commercial: true,
      residential: true,
      pattern: 'Solid',
      features: ['Heat Resistant', 'Durable'],
      application: 'Kitchen',
      hasButton: true,
      buttonText: 'Add to Cart'
    },
    {
      id: 4,
      name: 'PIANI',
      brand: 'FINISHES',
      brandName: 'Piani',
      image: '/api/placeholder/200/150',
      type: 'surfaces',
      category: 'Surfaces',
      price: 67.25,
      colors: ['White', 'Cream'],
      country: 'USA',
      commercial: false,
      residential: true,
      pattern: 'Smooth',
      features: ['Stain Resistant'],
      application: 'Bathroom',
      hasButton: false,
      buttonText: 'Sample Finishes'
    },
    {
      id: 5,
      name: 'STARON',
      brand: 'SOLID SURFACE',
      brandName: 'Staron',
      image: '/api/placeholder/200/150',
      type: 'surfaces',
      category: 'Surfaces',
      price: 95.75,
      colors: ['Pearl', 'White'],
      country: 'South Korea',
      commercial: true,
      residential: true,
      pattern: 'Solid',
      features: ['Non-porous', 'Repairable'],
      application: 'Countertop',
      hasButton: true,
      buttonText: 'Add to Cart'
    },
    {
      id: 6,
      name: 'QuartzDesign',
      brand: 'FINISHES',
      brandName: 'QuartzDesign',
      image: '/api/placeholder/200/150',
      type: 'surfaces',
      category: 'Surfaces',
      price: 156.00,
      colors: ['Beige', 'Sand'],
      country: 'Spain',
      commercial: true,
      residential: false,
      pattern: 'Speckled',
      features: ['Quartz Composite'],
      application: 'Countertop',
      hasButton: false,
      buttonText: 'Sample Finishes'
    },
    {
      id: 7,
      name: 'Expormim',
      brand: '15 FINISHES',
      brandName: 'Expormim',
      image: '/api/placeholder/200/150',
      type: 'furniture',
      category: 'Furniture',
      price: 890.00,
      colors: ['Natural', 'Wicker'],
      country: 'Spain',
      commercial: true,
      residential: true,
      pattern: 'Woven',
      features: ['Handcrafted', 'Sustainable'],
      application: 'Outdoor',
      hasButton: false,
      buttonText: 'Sample Finishes'
    },
    {
      id: 8,
      name: 'Forest Wallcovering',
      brand: 'SPECIALTY WALLCOVERING',
      brandName: 'Forest Collection',
      image: '/api/placeholder/200/150',
      type: 'surfaces',
      category: 'Surfaces',
      price: 78.50,
      colors: ['Green', 'Forest'],
      country: 'Canada',
      commercial: false,
      residential: true,
      pattern: 'Nature',
      features: ['Eco-friendly', 'Textured'],
      application: 'Wall',
      hasButton: true,
      buttonText: 'Add to Cart'
    },
    {
      id: 9,
      name: 'AllStar Acoustic',
      brand: '15 FINISHES',
      brandName: 'AllStar',
      image: '/api/placeholder/200/150',
      type: 'surfaces',
      category: 'Surfaces',
      price: 234.75,
      colors: ['Red', 'Blue'],
      country: 'USA',
      commercial: true,
      residential: false,
      pattern: 'Geometric',
      features: ['Acoustic', 'Fire Resistant'],
      application: 'Office',
      hasButton: false,
      buttonText: 'Sample Finishes'
    },
    {
      id: 10,
      name: 'LaFaenza Leonardo',
      brand: 'PORCELAIN TILE',
      brandName: 'LaFaenza',
      image: '/api/placeholder/200/150',
      type: 'tile',
      category: 'Tile',
      price: 34.99,
      colors: ['Beige', 'Travertine'],
      country: 'Italy',
      commercial: true,
      residential: true,
      pattern: 'Stone Look',
      features: ['Anti-slip', 'Frost Resistant'],
      application: 'Floor',
      hasButton: true,
      buttonText: 'Add to Cart'
    },
    {
      id: 11,
      name: 'Modern Bathroom Suite',
      brand: 'BATHROOM FIXTURES',
      brandName: 'ModernBath',
      image: '/api/placeholder/200/150',
      type: 'bathroom',
      category: 'Bathroom',
      price: 1250.00,
      colors: ['White', 'Chrome'],
      country: 'Germany',
      commercial: true,
      residential: true,
      pattern: 'Contemporary',
      features: ['Water Saving', 'Easy Clean'],
      application: 'Bathroom',
      hasButton: true,
      buttonText: 'Add to Cart'
    },
    {
      id: 12,
      name: 'Executive Office Chair',
      brand: 'OFFICE FURNITURE',
      brandName: 'OfficePro',
      image: '/api/placeholder/200/150',
      type: 'furniture',
      category: 'Furniture',
      price: 567.50,
      colors: ['Black', 'Leather'],
      country: 'USA',
      commercial: true,
      residential: false,
      pattern: 'Leather',
      features: ['Ergonomic', 'Adjustable'],
      application: 'Office',
      hasButton: true,
      buttonText: 'Add to Cart'
    }
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleFilter = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedFilters(prev => ({
      ...prev,
      category: category
    }));
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Helper function to get unique values for filter options
  const getUniqueValues = (key) => {
    if (key === 'colors') {
      return [...new Set(products.flatMap(product => product.colors))].sort();
    }
    if (key === 'brandName') {
      return [...new Set(products.map(product => product.brandName))].sort();
    }
    if (key === 'country') {
      return [...new Set(products.map(product => product.country))].sort();
    }
    if (key === 'pattern') {
      return [...new Set(products.map(product => product.pattern))].sort();
    }
    if (key === 'features') {
      return [...new Set(products.flatMap(product => product.features))].sort();
    }
    if (key === 'application') {
      return [...new Set(products.map(product => product.application))].sort();
    }
    return [];
  };

  // Filter products based on selected filters
  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedFilters.category !== 'All') {
      filtered = filtered.filter(product => product.category === selectedFilters.category);
    }

    // Filter by commercial/residential
    if (selectedFilters.commercial && !selectedFilters.residential) {
      filtered = filtered.filter(product => product.commercial);
    } else if (selectedFilters.residential && !selectedFilters.commercial) {
      filtered = filtered.filter(product => product.residential);
    }

    // Filter by brands
    if (selectedFilters.brands.length > 0) {
      filtered = filtered.filter(product => selectedFilters.brands.includes(product.brandName));
    }

    // Filter by colors
    if (selectedFilters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedFilters.colors.includes(color))
      );
    }

    // Filter by countries
    if (selectedFilters.countries.length > 0) {
      filtered = filtered.filter(product => selectedFilters.countries.includes(product.country));
    }

    // Filter by patterns
    if (selectedFilters.patterns.length > 0) {
      filtered = filtered.filter(product => selectedFilters.patterns.includes(product.pattern));
    }

    // Filter by features
    if (selectedFilters.features.length > 0) {
      filtered = filtered.filter(product =>
        product.features.some(feature => selectedFilters.features.includes(feature))
      );
    }

    // Filter by applications
    if (selectedFilters.applications.length > 0) {
      filtered = filtered.filter(product => selectedFilters.applications.includes(product.application));
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= selectedFilters.priceRange.min &&
      product.price <= selectedFilters.priceRange.max
    );

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by search filter
    if (searchFilter.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        product.brandName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        product.colors.some(color => color.toLowerCase().includes(searchFilter.toLowerCase())) ||
        product.features.some(feature => feature.toLowerCase().includes(searchFilter.toLowerCase()))
      );
    }

    return filtered;
  };

  // Update filtered products when filters change
  useEffect(() => {
    setFilteredProducts(filterProducts());
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedFilters, searchQuery, searchFilter]);

  // Initialize filtered products
  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  // Get products for current page
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  // Get total pages
  const getTotalPages = () => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  };

  // Toggle expanded section
  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Handle array filter toggle (for multi-select filters)
  const toggleArrayFilter = (filterType, value) => {
    setSelectedFilters(prev => {
      const currentArray = prev[filterType] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [filterType]: newArray
      };
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <div className="flex flex-1 h-0 overflow-hidden lg:pt-16">
        {/* Dashboard Sidebar */}
        {isMobile ? (
          <>
            {/* Mobile Sidebar Drawer */}
            <div
              className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Menu</span>
                  <button onClick={toggleSidebar}>
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="space-y-6">
                  {sidebarItems.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        {section.category}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <button
                            key={itemIndex}
                            className="flex items-center w-full gap-3 p-2 text-left text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
                          >
                            <item.icon className="w-5 h-5 text-gray-500" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Sidebar Toggle Button */}
            <div className="fixed z-40 bottom-4 left-4">
              <button
                onClick={toggleSidebar}
                className="p-3 text-white bg-gray-800 rounded-full shadow-lg hover:bg-gray-700"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div
            className={`h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative z-50 flex-shrink-0 ${
              isSidebarOpen ? "w-80" : "w-16"
            }`}
          >
            <button
              onClick={toggleSidebar}
              className="absolute top-4 -right-3 z-20 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarOpen ? (
                <X className="w-4 h-4 text-gray-600" />
              ) : (
                <Menu className="w-4 h-4 text-gray-600" />
              )}
            </button>

            <div
              className={`h-full flex flex-col transition-opacity duration-300 overflow-hidden ${
                !isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="flex-1 p-6">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="mb-4 text-sm font-medium text-gray-700">
                      Choose project
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                  <button className="flex items-center justify-center w-full gap-2 p-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700">
                    <Plus className="w-4 h-4" />
                    New project
                  </button>
                </div>

                <div className="space-y-8">
                  {sidebarItems.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="mb-4 text-sm font-medium text-gray-500">
                        {section.category}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <button
                            key={itemIndex}
                            className="flex items-center w-full gap-3 p-1 text-left text-gray-700 transition-colors rounded-lg hover:bg-gray-50 group"
                          >
                            <item.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                            <span className="font-medium">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content with Filters and Products */}
        <div className="flex flex-1 overflow-hidden">
          {/* Filters Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              {/* Filters Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="font-medium text-gray-900">Filters</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedFilters({
                      category: 'All',
                      commercial: false,
                      residential: false,
                      allColorways: false,
                      brands: [],
                      priceRange: { min: 0, max: 1000 },
                      colors: [],
                      countries: [],
                      availability: 'all',
                      patterns: [],
                      metallicFinish: false,
                      features: [],
                      applications: [],
                      content: [],
                      flammability: 'all',
                      abrasion: 'all',
                      climateImpact: 'all',
                      humanHealthImpact: 'all',
                      socialEquityImpact: 'all'
                    });
                    setSearchFilter('');
                    setSearchQuery('');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              </div>

              {/* Search Filters */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search filters"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Filter Categories */}
              <div className="space-y-4">
                {/* Commercial/Residential */}
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.commercial}
                      onChange={(e) => toggleFilter('commercial', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Commercial</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.residential}
                      onChange={(e) => toggleFilter('residential', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Residential</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.allColorways}
                      onChange={(e) => toggleFilter('allColorways', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">All Colorways</span>
                  </label>
                </div>

                {/* Expandable Sections */}
                <div className="space-y-3">
                  {/* Brand */}
                  <div className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => toggleSection('Brand')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Brand</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.Brand ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.Brand && (
                      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                        {getUniqueValues('brandName').map(brand => (
                          <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.brands.includes(brand)}
                              onChange={() => toggleArrayFilter('brands', brand)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{brand}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Range */}
                  <div className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => toggleSection('Price Range')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Price Range</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections['Price Range'] ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections['Price Range'] && (
                      <div className="mt-2 space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={selectedFilters.priceRange.min}
                            onChange={(e) => setSelectedFilters(prev => ({
                              ...prev,
                              priceRange: { ...prev.priceRange, min: Number(e.target.value) || 0 }
                            }))}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                          />
                          <span className="text-xs text-gray-500">to</span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={selectedFilters.priceRange.max}
                            onChange={(e) => setSelectedFilters(prev => ({
                              ...prev,
                              priceRange: { ...prev.priceRange, max: Number(e.target.value) || 1000 }
                            }))}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Color */}
                  <div className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => toggleSection('Color')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Color</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.Color ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.Color && (
                      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                        {getUniqueValues('colors').map(color => (
                          <label key={color} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.colors.includes(color)}
                              onChange={() => toggleArrayFilter('colors', color)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{color}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Country of Origin */}
                  <div className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => toggleSection('Country of Origin')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Country of Origin</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections['Country of Origin'] ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections['Country of Origin'] && (
                      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                        {getUniqueValues('country').map(country => (
                          <label key={country} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.countries.includes(country)}
                              onChange={() => toggleArrayFilter('countries', country)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{country}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pattern */}
                  <div className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => toggleSection('Pattern')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Pattern</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.Pattern ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.Pattern && (
                      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                        {getUniqueValues('pattern').map(pattern => (
                          <label key={pattern} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.patterns.includes(pattern)}
                              onChange={() => toggleArrayFilter('patterns', pattern)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{pattern}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => toggleSection('Features')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Features</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.Features ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.Features && (
                      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                        {getUniqueValues('features').map(feature => (
                          <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.features.includes(feature)}
                              onChange={() => toggleArrayFilter('features', feature)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Application */}
                  <div className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => toggleSection('Application')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Application</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.Application ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.Application && (
                      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                        {getUniqueValues('application').map(application => (
                          <label key={application} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.applications.includes(application)}
                              onChange={() => toggleArrayFilter('applications', application)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{application}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Static sections that don't have content yet */}
                  {['Availability', 'Metallic Finish', 'Content', 'Flammability', 'Abrasion', 'Climate Impact', 'Human Health Impact', 'Social Equity Impact'].map((section) => (
                    <div key={section} className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => toggleSection(section)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <span className="text-sm font-medium text-gray-900">{section}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections[section] ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedSections[section] && (
                        <div className="mt-2 text-xs text-gray-500">
                          No options available
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Category Tabs */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
              {categories.map((category) => {
                const count = products.filter(p => category.name === 'All' ? true : p.category === category.name).length;
                return (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                      selectedFilters.category === category.name
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded">
                      {count}
                    </span>
                  </button>
                );
              })}
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400"></div>
                <button className="text-sm text-gray-600 hover:text-gray-900">Compare</button>
              </div>
              <div className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {getCurrentPageProducts().length > 0 ? (
                getCurrentPageProducts().map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {product.brand}
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm mb-2">
                        {product.name}
                      </h3>
                      <div className="text-xs text-gray-600 mb-2">
                        ${product.price}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.colors.slice(0, 2).map(color => (
                          <span key={color} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {color}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant={product.hasButton ? "default" : "outline"}
                        size="sm"
                        className="w-full text-xs"
                      >
                        {product.buttonText}
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-500 mb-2">No products found</div>
                  <div className="text-sm text-gray-400">Try adjusting your filters or search terms</div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {getTotalPages() > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                {(() => {
                  const totalPages = getTotalPages();
                  const pages = [];
                  const showEllipsis = totalPages > 7;

                  if (!showEllipsis) {
                    // Show all pages if 7 or fewer
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Show selective pages with ellipsis
                    if (currentPage <= 4) {
                      pages.push(1, 2, 3, 4, 5, '...', totalPages);
                    } else if (currentPage >= totalPages - 3) {
                      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                    } else {
                      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                    }
                  }

                  return pages.map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="text-gray-400">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded text-sm ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ));
                })()}

                <button
                  onClick={() => setCurrentPage(Math.min(getTotalPages(), currentPage + 1))}
                  disabled={currentPage === getTotalPages()}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Pagination Info */}
            <div className="text-center text-sm text-gray-500 mt-4">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
