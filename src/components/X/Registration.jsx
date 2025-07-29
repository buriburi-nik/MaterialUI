import React from "react";
import { useNavigate } from "react-router-dom";
export default function Registration() {
  
  const navigate = useNavigate();

  return (
    <section className="relative px-6 py-20 mx-4 mt-8 overflow-hidden shadow-2xl rounded-3xl bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700">
      <div className="flex flex-col-reverse items-center gap-16 mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">

        {/* Left Content */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Register now.
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-white/30 lg:mx-0"></div>
          </div>
          
          <p className="max-w-lg mx-auto text-xl leading-relaxed text-white/90 sm:text-2xl lg:mx-0">
            Join the world's most powerful platform for searching and sampling materials.
          </p>

          <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row lg:items-start lg:justify-start">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 text-lg font-semibold text-teal-700 transition-all duration-300 bg-white rounded-full shadow-xl hover:bg-white/95 hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              Join for free
            </button>
            <button 
          
              className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-full hover:bg-white/15 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Become a Brand Partner
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex justify-center w-full lg:justify-end">
          <div className="relative w-full max-w-2xl">
            <div className="relative transition-transform duration-500 transform hover:scale-105">
              <img
                src="https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/emerald_box2.webp"
                alt="Material Bank sustainable packaging box with material samples"
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating accent elements */}
            <div className="absolute w-8 h-8 rounded-full -top-4 -right-4 bg-white/20 blur-sm animate-pulse"></div>
            <div className="absolute w-12 h-12 rounded-full -bottom-6 -left-6 bg-white/15 blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

      </div>
    </section>
  );
}