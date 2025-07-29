import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function interpolateColor(color1, color2, factor) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;

  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `rgb(${r},${g},${b})`;
}

export default function ScrollingHero() {
  const navigate = useNavigate();

  const materialBoxes = [
    {
      image:
        "https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/box_blue2.webp",
      bgColor: "#97a2c2",
    },
    {
      image:
        "https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/box_red2.webp",
      bgColor: "#7f3c36",
    },
    {
      image:
        "https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/moss_box2.webp",
      bgColor: "#38a490",
    },
  ];

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const sectionHeight = window.innerHeight;
          const totalSections = materialBoxes.length;

          const fractionalIndex = (scrollY / sectionHeight) % totalSections;
          const normalizedIndex =
            fractionalIndex < 0
              ? fractionalIndex + totalSections
              : fractionalIndex;

          setScrollProgress(normalizedIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [materialBoxes.length]);

  const currentIndex = Math.floor(scrollProgress);
  const nextIndex = (currentIndex + 1) % materialBoxes.length;
  const progressBetween = scrollProgress - currentIndex;

  const bgColor = interpolateColor(
    materialBoxes[currentIndex].bgColor,
    materialBoxes[nextIndex].bgColor,
    progressBetween
  );

  return (
    <section
      className="relative flex flex-col items-center h-[100vh] md:h-[130vh] mx-2 mt-20 overflow-hidden w-90 rounded-2xl"

      style={{ backgroundColor: bgColor }}
    >
      {/* Text Section */}
        <div className="flex flex-col items-center justify-center max-w-4xl pt-8 mx-16 mb-20 text-center text-white">
    <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-extrabold drop-shadow-lg leading-tight mb-2">
      Search. Sample. Specify.
    </h1>

        <p className="max-w-xl mb-6 text-lg sm:text-xl text-white/90">
          Hundreds of leading brands. One site. Order by 6:30pm CET. Free samples by tomorrow.
        </p>

        <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
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

      {/* Hero Images */}
      <div className="flex items-center justify-center mt-10">
        {materialBoxes.map((box, index) => {
          let opacity = 0;
          let scale = 0.9;

          if (index === currentIndex) {
            opacity = 1 - progressBetween;
            scale = 1 - progressBetween * 0.1;
          } else if (index === nextIndex) {
            opacity = progressBetween;
            scale = 0.9 + progressBetween * 0.1;
          }

          return (
            <img
              key={index}
              src={box.image}
              alt={`Material ${index + 1}`}
              className="absolute object-contain rounded-xl"
              style={{
                maxHeight: "100vh",
                maxWidth: "100vw",
                 marginBottom: "2rem",
                opacity,
                transform: `scale(${scale})`,
                transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
                willChange: "opacity, transform",
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
