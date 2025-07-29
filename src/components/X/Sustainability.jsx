import React from "react";

export default function Sustainability() {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl text-slate-800">
              Sample <span className="text-green-500">sustainably.</span>
            </h2>
            <p className="max-w-lg text-lg text-slate-600">
              Get unlimited brands in a single box, shipped 100% carbon neutral.
              That means less packaging waste and fewer emissions.
            </p>
          </div>

          {/* Right Content - Material Bank Box */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <img
                src="https://mb-site-assets.global.ssl.fastly.net/homepage/images/packages-v3.webp"
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
