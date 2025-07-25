import React from "react";

export default function Sustainability() {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              Sample <span className="text-green-500">sustainably.</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-lg">
              Get unlimited brands in a single box, shipped 100% carbon neutral.
              That means less packaging waste and fewer emissions.
            </p>
          </div>

          {/* Right Content - Material Bank Box */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative max-w-lg w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fb205f0e8ef4e4b3dbb4ae7d5f483e9f6%2F5b207308c7be472ebd3b699c9bf3e347?format=webp&width=800"
                alt="Material Bank sustainable packaging box with material samples"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
