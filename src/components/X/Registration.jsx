import React from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();

  return (
    <section className="relative px-4 py-16 mx-2 mt-20 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600">
      <div className="flex flex-col-reverse items-center max-w-6xl gap-12 mx-auto lg:grid lg:grid-cols-2 lg:items-center">

        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Register now.
          </h2>
          <p className="max-w-md mx-auto mb-6 text-lg text-white/90 sm:text-xl lg:mx-0">
            Join the world’s most powerful platform for searching and sampling materials.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start">
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 font-semibold text-teal-600 transition duration-300 bg-white rounded-full shadow-lg hover:bg-white/90"
            >
              Join for free
            </button>
            <button className="px-6 py-3 font-semibold text-white transition duration-300 border-2 border-white rounded-full hover:bg-white/10">
              Become a Brand Partner
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xl">
            <img
              src="https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/emerald_box2.webp"
              alt="Material Bank sustainable packaging box with material samples"
              className="w-full h-auto"
            />
          </div>
        </div>

      </div>

      {/* Blurred background dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute w-24 h-24 bg-white rounded-full top-20 left-10 blur-3xl"></div>
        <div className="absolute w-20 h-20 bg-white rounded-full bottom-20 right-10 blur-2xl"></div>
      </div>
    </section>
  );
}
