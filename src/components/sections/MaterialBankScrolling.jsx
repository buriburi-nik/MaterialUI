import React from "react";
import { useNavigate } from "react-router-dom";
import { EXTERNAL_ASSETS } from "@assets";

const MaterialBankScrolling = () => {
  
  const navigate = useNavigate();
  
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen mx-4 mt-20 overflow-hidden rounded-2xl md:" 
      style={{ backgroundColor: "#e8a581" }}
    >
      {/* Content Container */}
      <div className="flex flex-col items-center justify-center w-full max-w-6xl px-6 py-8">
        
        {/* Text Block */}
        <div className="flex flex-col items-center justify-center max-w-4xl mb-2 text-center text-white">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-lg">
            More than just materials.
          </h1>
          <p className="max-w-2xl mb-6 text-lg leading-relaxed sm:text-xl md:text-2xl text-white/90">
            We offer a diverse range of 500,000+ products across 300+ categories.
          </p>
          
          {/* Buttons */}
          <div className="z-10 flex flex-col justify-center w-full max-w-md gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 font-semibold text-gray-800 transition-all duration-300 bg-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Join for free
            </button>
            <button className="px-8 py-3 font-semibold text-white transition-all duration-300 border-2 border-white rounded-full hover:bg-white/10 hover:scale-105 active:scale-95">
              Become a Brand Partner
            </button>
          </div>
        </div>
        
        {/* Image Container */}
        <div className="flex items-center justify-center w-full mt-5 md:-mt-32">
          
          <div className="relative">
            <img
              src={EXTERNAL_ASSETS.BOXES.GREEN}
              alt="Material Bank Box"
              className="object-contain h-auto max-h-[75vh] w-auto rounded-2xl drop-shadow-2xl transition-all duration-500 hover:scale-105"
            />
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialBankScrolling;
