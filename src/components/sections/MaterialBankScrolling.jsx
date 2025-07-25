import React from "react";
import { useNavigate } from "react-router-dom";

const MaterialBankScrolling = () => {
  const navigate = useNavigate();
  return (
    <section
      className="w-full min-h-screen flex items-center justify-center px-8 py-16"
      style={{ backgroundColor: "#e8a581" }}
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          More than just materials.
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          We offer a diverse range of 500,000+ products across 300+ categories.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-white/90 transition-colors text-lg"
            onClick={() => navigate("/register")}
          >
            Join for free
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-lg">
            Become a Brand Partner
          </button>
        </div>

        {/* Material Bank Box Image */}
        <div className="flex justify-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F42130226a8824935b18674a2c8e7630d%2F18cc02dec18344b6abde9ce40578310d?format=webp&width=800"
            alt="Material Bank box containing various material samples"
            className="max-w-full h-auto max-w-md drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default MaterialBankScrolling;
