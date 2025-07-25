import React, { useState, useEffect } from "react";

export default function ScrollingBrands() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const brands = [
    "iform",
    "ANN SACKS",
    "MOMENTUM",
    "Stinson",
    "Caesarstone",
    "LebaTex",
    "Interface",
    "Tarkett",
    "Wilsonart",
    "STARK",
    "Benjamin Moore",
    "Milliken",
    "Mohawk Group",
    "filaPar",
    "ARTISTIC TILE",
    "Formica",
    "Shaw",
    "Mannington",
    "Armstrong",
    "Hunter Douglas",
  ];

  // Create multiple sets for seamless loop
  const extendedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="bg-white py-20 overflow-hidden relative">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Hundreds of leading brands
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
          all in one place.
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Material Bank powers complex searches across hundreds of brands and
          thousands of materials in seconds.
        </p>
      </div>

      {/* Brand rows with wave effect - all moving right to left */}
      <div className="space-y-6 relative">
        {[0, 1, 2].map((rowIndex) => {
          const waveOffset = Math.sin(scrollY * 0.01 + rowIndex * 1.2) * 20;
          const baseTransform = -scrollY * 0.3 - rowIndex * 200;
          const finalTransform = baseTransform + waveOffset;

          return (
            <div key={rowIndex} className="relative">
              <div
                className="flex gap-4 transition-transform duration-100 ease-out"
                style={{
                  transform: `translateX(${finalTransform}px)`,
                  width: "fit-content",
                }}
              >
                {extendedBrands.map((brand, index) => (
                  <div
                    key={`row${rowIndex}-${index}`}
                    className="flex-shrink-0 bg-slate-200/80 hover:bg-slate-300/80 transition-colors duration-300 rounded-full px-6 py-3 text-slate-700 font-medium text-sm whitespace-nowrap"
                    style={{
                      transform: `translateY(${Math.sin(scrollY * 0.02 + index * 0.3 + rowIndex * 2) * 8}px)`,
                    }}
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gradient overlays to fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}
