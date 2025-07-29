import React from "react";

const FullScreenImage = () => {
  return (
    <div className="relative w-full h-[100vh] sm:h-[80vh] md:h-screen overflow-hidden">
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fbb6e0610e17c4abba875c2c0c2ae96dc%2Fab6734a58863497ca033f4d91a619b59?format=webp&width=800"
        alt="Material samples showcase featuring various textures and patterns"
        className="absolute inset-0 object-cover w-full h-full"
      />
    </div>
  );
};

export default FullScreenImage;
