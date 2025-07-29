import React from "react";
import { useNavigate } from "react-router-dom";

const MaterialBankScrolling = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative flex flex-col items-center justify-center h-[80vh] md:h-[100vh] mx-2 mt-20 overflow-hidden w-90 rounded-2xl"
      style={{ backgroundColor: "#e8a581" }}
    >
      {/* Text Block */}
      <div className="flex flex-col items-center justify-center max-w-4xl px-4 mt-10 text-center text-white">
        <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-extrabold drop-shadow-lg leading-tight mb-2 ">
          More than just materials.
        </h1>

        <p className="max-w-xl mb-4 text-lg sm:text-xl text-white/90">
          We offer a diverse range of 500,000+ products across 300+ categories.
        </p>

        <div className="flex flex-col justify-center gap-4 mb-4 sm:flex-row">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 font-semibold text-gray-800 transition-all duration-300 bg-white rounded-full shadow-md hover:scale-105"
          >
            Join for free
          </button>
          <button className="px-6 py-2 text-white transition-all duration-300 border-2 border-white rounded-full hover:bg-white/10">
            Become a Brand Partner
          </button>
        </div>
      </div>

      {/* Image Box */}
      <div className="flex items-center justify-center">
        <img
          src="https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/box_green2.webp"
          alt="Material Bank Box"
          className="object-contain h-auto max-h-[60vh] max-w-full rounded-xl drop-shadow-2xl transition-all duration-500"
        />
      </div>
    </section>
  );
};

export default MaterialBankScrolling;
