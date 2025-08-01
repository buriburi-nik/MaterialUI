import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/contexts/ToastContext';
import { addItem } from '../../store/slices/cartSlice';
import { setGlobalSearchQuery, setSearchResults, setSearching } from '../../store/slices/searchSlice';
import { useDebounce } from '@/hooks/useDebounce';
import ProductDetailModal from '@/components/ui/ProductDetailModal';
import productsData from '@/data/products.json';

const Products = () => {
  const { user, userProfile } = useAuth();
  const dispatch = useDispatch();
  const { showToast } = useToast();
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
  const { globalSearchQuery, isSearching } = useSelector(state => state.search);
  const debouncedSearchQuery = useDebounce(globalSearchQuery, 300);
  const [searchFilter, setSearchFilter] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsPerPage] = useState(12);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showOrderHistoryModal, setShowOrderHistoryModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [boardForm, setBoardForm] = useState({ name: '', description: '', category: 'design' });
  const [orderHistory, setOrderHistory] = useState([
    { id: 1, orderNumber: 'ORD-2025-001', date: '2025-01-15', items: 3, total: '$245.00', status: 'Delivered' },
    { id: 2, orderNumber: 'ORD-2025-002', date: '2025-01-20', items: 5, total: '$189.50', status: 'Processing' },
    { id: 3, orderNumber: 'ORD-2025-003', date: '2025-01-25', items: 2, total: '$320.00', status: 'Shipped' }
  ]);

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

  // Import products from JSON file
  const products = productsData;

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

  const handleSidebarAction = (action) => {
    switch(action) {
      case 'Boards':
        setShowBoardModal(true);
        break;
      case 'Notes':
        setShowNotesModal(true);
        break;
      case 'Help':
        setShowHelpModal(true);
        break;
      case 'Order history':
        setShowOrderHistoryModal(true);
        break;
      default:
        break;
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note = {
      id: Date.now(),
      content: newNote,
      createdAt: new Date().toISOString()
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
  };

  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleCreateBoard = () => {
    if (!boardForm.name.trim()) return;

    const newBoard = {
      id: Date.now(),
      name: boardForm.name,
      description: boardForm.description,
      category: boardForm.category,
      createdAt: new Date().toISOString(),
      itemsCount: 0
    };

    setBoardForm({ name: '', description: '', category: 'design' });
    setShowBoardModal(false);
    showToast(`Board "${newBoard.name}" created successfully!`, 'success');
  };

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
    if (debouncedSearchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.brandName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
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
    // Start searching indicator
    if (globalSearchQuery !== debouncedSearchQuery) {
      dispatch(setSearching(true));
    } else {
      // Search is complete
      const results = filterProducts();
      setFilteredProducts(results);
      setCurrentPage(1);
      dispatch(setSearchResults(results.length));
      dispatch(setSearching(false));
    }
  }, [selectedFilters, debouncedSearchQuery, searchFilter]);

  // Handle immediate search feedback
  useEffect(() => {
    if (globalSearchQuery.length > 0) {
      dispatch(setSearching(true));
    }
  }, [globalSearchQuery]);

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

  // Handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    showToast(`${product.name} added to cart`, 'success');
  };

  // Handle product detail view
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
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
    <div className="flex flex-col h-screen overflow-hidden mt-18 bg-gray-50 md:mt-0">
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
                            onClick={() => handleSidebarAction(item.name)}
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
                            onClick={() => handleSidebarAction(item.name)}
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
          {/* Filters Sidebar - Hidden on mobile, shown as modal */}
          <div className={`${isFiltersCollapsed ? 'w-0' : 'w-64'} transition-all duration-300 overflow-hidden bg-white border-r border-gray-200 hidden lg:block`}>
            <div className="w-64 overflow-y-auto scrollbar-hide">
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
                  <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder="Search filters"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                      className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                      className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">All Colorways</span>
                  </label>
                </div>

                {/* Expandable Sections */}
                <div className="space-y-3">
                  {/* Brand */}
                  <div className="pb-2 border-b border-gray-100">
                    <button
                      onClick={() => toggleSection('Brand')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Brand</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.Brand ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.Brand && (
                      <div className="mt-2 space-y-2 overflow-y-auto scrollbar-hide max-h-40">
                        {getUniqueValues('brandName').map(brand => (
                          <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.brands.includes(brand)}
                              onChange={() => toggleArrayFilter('brands', brand)}
                              className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{brand}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Range */}
                  <div className="pb-2 border-b border-gray-100">
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
                  <div className="pb-2 border-b border-gray-100">
                    <button
                      onClick={() => toggleSection('Color')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Color</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.Color ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.Color && (
                      <div className="mt-2 space-y-2 overflow-y-auto scrollbar-hide max-h-40">
                        {getUniqueValues('colors').map(color => (
                          <label key={color} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.colors.includes(color)}
                              onChange={() => toggleArrayFilter('colors', color)}
                              className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{color}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Country of Origin */}
                  <div className="pb-2 border-b border-gray-100">
                    <button
                      onClick={() => toggleSection('Country of Origin')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Country of Origin</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections['Country of Origin'] ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections['Country of Origin'] && (
                      <div className="mt-2 space-y-2 overflow-y-auto scrollbar-hide max-h-40">
                        {getUniqueValues('country').map(country => (
                          <label key={country} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.countries.includes(country)}
                              onChange={() => toggleArrayFilter('countries', country)}
                              className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{country}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pattern */}
                  <div className="pb-2 border-b border-gray-100">
                    <button
                      onClick={() => toggleSection('Pattern')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Pattern</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.Pattern ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.Pattern && (
                      <div className="mt-2 space-y-2 overflow-y-auto scrollbar-hide max-h-40">
                        {getUniqueValues('pattern').map(pattern => (
                          <label key={pattern} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.patterns.includes(pattern)}
                              onChange={() => toggleArrayFilter('patterns', pattern)}
                              className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{pattern}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="pb-2 border-b border-gray-100">
                    <button
                      onClick={() => toggleSection('Features')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Features</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.Features ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.Features && (
                      <div className="mt-2 space-y-2 overflow-y-auto scrollbar-hide max-h-40">
                        {getUniqueValues('features').map(feature => (
                          <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.features.includes(feature)}
                              onChange={() => toggleArrayFilter('features', feature)}
                              className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Application */}
                  <div className="pb-2 border-b border-gray-100">
                    <button
                      onClick={() => toggleSection('Application')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900">Application</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.Application ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.Application && (
                      <div className="mt-2 space-y-2 overflow-y-auto scrollbar-hide max-h-40">
                        {getUniqueValues('application').map(application => (
                          <label key={application} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters.applications.includes(application)}
                              onChange={() => toggleArrayFilter('applications', application)}
                              className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-600">{application}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Products Content */}
          <div className="flex-1 overflow-hidden">
            {/* FIXED: Sticky Header Section */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
              {/* Main Header Row - Filters, Categories, and Controls */}
              <div className="flex items-center gap-4 px-3 py-3 overflow-x-auto lg:px-6 scrollbar-hide">
                {/* Filters Button */}
                <button
                  onClick={() => {
                    // On mobile, open modal. On desktop, toggle sidebar
                    if (window.innerWidth < 1024) {
                      setIsMobileFiltersOpen(true);
                    } else {
                      setIsFiltersCollapsed(!isFiltersCollapsed);
                    }
                  }}
                  className="flex items-center flex-shrink-0 gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-gray-900"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                </button>

                {/* Category Tabs */}
                <div className="flex items-center flex-1 gap-2 lg:gap-4">
                {categories.map((category) => {
                  // Calculate count based on current filters (excluding category filter)
                  const tempFilters = { ...selectedFilters, category: category.name };
                  let filtered = products;

                  // Apply all filters except category to get the base filtered set
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
                  if (debouncedSearchQuery.trim()) {
                    filtered = filtered.filter(product =>
                      product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                      product.brandName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                      product.brand.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
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

                  // Now apply category filter to get final count
                  const count = category.name === 'All'
                    ? filtered.length
                    : filtered.filter(p => p.category === category.name).length;
                  return (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryChange(category.name)}
                      className={`flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                        selectedFilters.category === category.name
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span className="text-sm lg:text-base">{category.name}</span>
                      <span className="px-1.5 lg:px-2 py-0.5 lg:py-1 text-xs text-white bg-gray-900 rounded">
                        {count}
                      </span>
                    </button>
                  );
                })}
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                </div>

                {/* Right Side Controls */}
                <div className="items-center flex-shrink-0 hidden gap-3 lg:flex">
                  <div className="relative">
                    <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={globalSearchQuery}
                      onChange={(e) => dispatch(setGlobalSearchQuery(e.target.value))}
                      className="w-48 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Grid className="w-5 h-5" />
                  </button>
                  <div className="w-6 h-6 rounded-full cursor-pointer bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400"></div>
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Compare</button>
                </div>
              </div>

              {/* Mobile Search Bar */}
              <div className="px-3 pb-3 lg:hidden">
                <div className="relative">
                  <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={globalSearchQuery}
                    onChange={(e) => dispatch(setGlobalSearchQuery(e.target.value))}
                    className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="h-full p-3 overflow-y-auto lg:p-6">
              {/* Product Count and Status */}
              <div className="flex items-center justify-between mb-6">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  {isSearching ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    `${filteredProducts.length} products found`
                  )}
                </span>
                <div className="text-xs text-gray-600 lg:text-sm">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
                {getCurrentPageProducts().length > 0 ? (
                  getCurrentPageProducts().map((product) => (
                    <div key={product.id} className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
                      <div
                        className="bg-gray-100 cursor-pointer aspect-square"
                        onClick={() => handleProductClick(product)}
                      >
                        <img
                          src={product.image || `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&seed=${product.id}`}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                          onError={(e) => {
                            e.target.src = '/public/placeholder.svg';
                          }}
                        />
                      </div>
                      <div className="p-2 lg:p-4">
                        <div className="mb-1 text-xs tracking-wide text-gray-500 uppercase">
                          {product.brand}
                        </div>
                        <h3
                          className="mb-1 text-xs font-medium leading-tight text-gray-900 cursor-pointer lg:mb-2 lg:text-sm hover:text-blue-600"
                          onClick={() => handleProductClick(product)}
                        >
                          {product.name}
                        </h3>
                        <div className="mb-1 text-xs font-semibold text-gray-900 lg:mb-2">
                          ${product.price}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2 lg:mb-3">
                          {product.colors.slice(0, 2).map(color => (
                            <span key={color} className="px-1.5 py-0.5 text-xs text-gray-600 bg-gray-100 rounded">
                              {color}
                            </span>
                          ))}
                        </div>
                        <Button
                          variant={product.hasButton ? "default" : "outline"}
                          size="sm"
                          className="w-full h-8 text-xs lg:h-9"
                          onClick={() => handleAddToCart(product)}
                        >
                          <span className="sm:hidden">Add</span>
                          <span className="hidden sm:inline">{product.buttonText}</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center col-span-full">
                    <div className="mb-2 text-gray-500">No products found</div>
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
              <div className="mt-4 text-sm text-center text-gray-500">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
      />

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileFiltersOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-xl shadow-xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <div className="flex items-center gap-2">
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
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filters Content - Same as desktop but in mobile modal */}
            <div className="p-4 overflow-y-auto scrollbar-hide max-h-[calc(80vh-80px)]">
              {/* Search Filters */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder="Search filters"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Filter Categories - Simplified for mobile */}
              <div className="space-y-4">
                {/* Commercial/Residential */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.commercial}
                        onChange={(e) => toggleFilter('commercial', e.target.checked)}
                        className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Commercial</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.residential}
                        onChange={(e) => toggleFilter('residential', e.target.checked)}
                        className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Residential</span>
                    </label>
                  </div>
                </div>

                {/* Quick Filters - Most used ones */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Quick Filters</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {getUniqueValues('brandName').slice(0, 6).map(brand => (
                      <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFilters.brands.includes(brand)}
                          onChange={() => toggleArrayFilter('brands', brand)}
                          className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-xs text-gray-600">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Price Range</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={selectedFilters.priceRange.min}
                      onChange={(e) => setSelectedFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, min: Number(e.target.value) || 0 }
                      }))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={selectedFilters.priceRange.max}
                      onChange={(e) => setSelectedFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, max: Number(e.target.value) || 1000 }
                      }))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Apply Filters ({filteredProducts.length} products)
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Board Creation Modal */}
      {showBoardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-xl">
            <div className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Create New Board</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Board Name</label>
                  <input
                    type="text"
                    value={boardForm.name}
                    onChange={(e) => setBoardForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter board name"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={boardForm.category}
                    onChange={(e) => setBoardForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="design">Design</option>
                    <option value="mood">Mood Board</option>
                    <option value="materials">Materials</option>
                    <option value="inspiration">Inspiration</option>
                    <option value="presentation">Presentation</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Description (Optional)</label>
                  <textarea
                    value={boardForm.description}
                    onChange={(e) => setBoardForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter board description"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowBoardModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateBoard}
                  disabled={!boardForm.name.trim()}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Create Board
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-6 space-y-4">
                <div className="flex gap-3">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed h-fit"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {notes.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">No notes yet. Add your first note above.</p>
                ) : (
                  notes.map((note) => (
                    <div key={note.id} className="p-4 rounded-lg bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm text-gray-600">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-gray-800">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order History Modal */}
      {showOrderHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Order History</h3>
                <button
                  onClick={() => setShowOrderHistoryModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-sm font-medium text-left text-gray-500">Order Number</th>
                      <th className="py-3 text-sm font-medium text-left text-gray-500">Date</th>
                      <th className="py-3 text-sm font-medium text-left text-gray-500">Items</th>
                      <th className="py-3 text-sm font-medium text-left text-gray-500">Total</th>
                      <th className="py-3 text-sm font-medium text-left text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                        <td className="py-4 text-sm text-gray-600">{order.date}</td>
                        <td className="py-4 text-sm text-gray-600">{order.items} items</td>
                        <td className="py-4 text-sm font-medium text-gray-900">{order.total}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Help & Support</h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 font-medium text-gray-900">Frequently Asked Questions</h4>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h5 className="mb-2 font-medium text-gray-800">How do I filter products?</h5>
                      <p className="text-sm text-gray-600">Use the filters panel on the left to narrow down products by brand, price, color, and more.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h5 className="mb-2 font-medium text-gray-800">How do I add products to my cart?</h5>
                      <p className="text-sm text-gray-600">Click the "Add to cart" button on any product card or use the detailed product view.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h5 className="mb-2 font-medium text-gray-800">Can I save products for later?</h5>
                      <p className="text-sm text-gray-600">Yes! Create boards to organize and save products for your projects.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-medium text-gray-900">Contact Support</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Need additional help? Reach out to our support team:</p>
                    <div className="flex gap-4">
                      <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Email Support
                      </button>
                      <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Live Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
