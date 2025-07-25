import React from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  return (
    <section className="w-full py-20 bg-gradient-to-br from-teal-500 to-teal-600 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Register now.
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-lg">
              Join the world's most powerful platform for searching and sampling
              materials.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="px-8 py-3 bg-white text-teal-600 font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg"
                onClick={() => navigate("/signin")}
              >
                Join for free
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                Become a Brand Partner
              </button>
            </div>
          </div>

          {/* Right Content - Material Bank Box */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative max-w-lg w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fb205f0e8ef4e4b3dbb4ae7d5f483e9f6%2F255b15dcbb4442b9930aa9ec6a5c8880?format=webp&width=800"
                alt="Material Bank box with various material samples"
                className="w-full h-auto drop-shadow-2xl"
              />

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-xl"></div>
      </div>
    </section>
  );
}
