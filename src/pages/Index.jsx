import React from "react";
import ScrollingHero from "@/components/sections/ScrollingHero";
import TargetAudience from "@/components/sections/TargetAudience";
import ScrollingBrands from "@/components/sections/ScrollingBrands";
import FullScreenImage from "@/components/X/FullScreenImage";
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
    

      {/* Full Screen Image Component */}
      <FullScreenImage />

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
