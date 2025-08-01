import React, { useState, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import Footer from "@/components/layout/Footer";
import brandData from "@/data/brands.json"; 

export default function Brands() {
  
  const [activeFilter, setActiveFilter] = useState("All");
  // Get all categories for filter
  const categories = useMemo(() => {
    const cats = new Set();
    Object.values(brandData).flat().forEach(brand => cats.add(brand.category));
    return ["All", ...Array.from(cats).sort()];
  }, []);

  // Filter brands based on active filter
  const filteredBrandData = useMemo(() => {
    if (activeFilter === "All") return brandData;
    
    const filtered = {};
    Object.entries(brandData).forEach(([letter, brands]) => {
      const filteredBrands = brands.filter(brand => brand.category === activeFilter);
      if (filteredBrands.length > 0) {
        filtered[letter] = filteredBrands;
      }
    });
    return filtered;
  }, [activeFilter, brandData]);

  // Alphabet navigation
  const alphabetFilters = ["0-9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const scrollToSection = (letter) => {
    const element = document.getElementById(`section-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen px-4 mx-2 mt-20 bg-white">
      {/* Header */}
      <div className="py-12 bg-white border-b border-gray-200">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Explore Our Brands
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Discover materials from 300+ leading brands, all in one place. 
              From furniture to flooring, lighting to textiles.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container px-4 mx-auto">
          {/* Alphabet Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 py-4">
            {alphabetFilters.map((letter) => (
              <button
                key={letter}
                onClick={() => scrollToSection(letter)}
                className="px-3 py-2 text-sm font-medium text-gray-600 transition-colors rounded-md hover:text-gray-900 hover:bg-gray-100"
              >
                {letter}
              </button>
            ))}
          </div>
          
          {/* Category Filter */}
          <div className="pb-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeFilter === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Listings */}
      <div className="container px-4 py-8 mx-auto">
        {Object.entries(filteredBrandData).map(([letter, brands]) => (
          <div key={letter} id={`section-${letter}`} className="mb-12">
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="mb-2 text-3xl font-bold text-gray-900">{letter}</h2>
              <div className="w-12 h-1 bg-gray-900"></div>
            </div>
            
            {/* Brand Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {brands.map((brand, index) => (
                <div
                  key={`${letter}-${index}`}
                  className="p-4 transition-all duration-200 border border-gray-200 rounded-lg cursor-pointer group hover:border-gray-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                      {brand.name}
                    </h3>
                    {brand.isNew && (
                      <Badge variant="secondary" className="text-xs text-blue-800 bg-blue-100">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{brand.category}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Can't find what you're looking for?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600">
            Our team is constantly adding new brands and materials. 
            Contact us if you have a specific brand in mind.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="px-8 py-3 font-semibold text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800">
              Request a Brand
            </button>
            <button className="px-8 py-3 font-semibold text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
