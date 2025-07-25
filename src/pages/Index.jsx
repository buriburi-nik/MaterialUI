import React from "react";
import ScrollingHero from "@/components/sections/ScrollingHero";
import TargetAudience from "@/components/sections/TargetAudience";
import ScrollingBrands from "@/components/sections/ScrollingBrands";
import MaterialBankScrolling from "@/components/sections/MaterialBankScrolling";
import WorkflowSection from "@/components/sections/WorkflowSection";
import StreamlineDesign from "@/components/X/StreamlineDesign";
import Testimonials from "@/components/X/Testimonials";
import Registration from "@/components/X/Registration";
import Sustainability from "@/components/X/Sustainability";
import Footer from "@/components/layout/Footer";

export default function Index() {
  return (
    <div>
      {/* Scrolling Hero Section */}
      <ScrollingHero />

      {/* Target Audience Section */}
      <TargetAudience />

      {/* Scrolling Brands Section */}
      <ScrollingBrands />

      {/* Full Screen Image */}
      <div className="w-screen h-screen">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fbb6e0610e17c4abba875c2c0c2ae96dc%2Fab6734a58863497ca033f4d91a619b59?format=webp&width=800"
          alt="Material samples showcase featuring various textures and patterns"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Material Bank Scrolling Section */}
      <MaterialBankScrolling />

      {/* Supercharge Workflow Section */}
      <WorkflowSection />

      {/* Streamline Design Section */}
      <StreamlineDesign />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Registration Section */}
      <Registration />

      {/* Sustainability Section */}
      <Sustainability />

      {/* Footer */}
      <Footer />
    </div>
  );
}
