// WorkflowSection.jsx
import React from "react";
import FeatureCard from "../X/FeatureCard";
import BrowserWindow from "../X/BrowserWindow";

export default function WorkflowSection() {
  const communicationFeatures = [
    "Keep all of your correspondence in one place",
    "Connect with reps from hundreds of leading brands",
    "Get product details, lead times, and quotes for your projects",
  ];

  const materialFeatures = [
    "Save and organize materials for your projects, create boards",
    "Collaborate with colleagues in seconds",
    "Sample your entire board when you're ready",
  ];

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl text-slate-700">
            Supercharge your workflow.
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left Column - Communication */}
          <FeatureCard
            title="Communicate directly with Brand Reps"
            features={communicationFeatures}
          >
            <BrowserWindow url="materialbank.com/messages">
              <img
                src="https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/Communicate_directly_with_Brand_Reps.webp"
                alt="Communicate directly with Brand Reps"
                className="object-cover w-full h-full"
              />
            </BrowserWindow>
          </FeatureCard>

          {/* Right Column - Material Board */}
          <FeatureCard
            title="Save materials you like, sample later"
            features={materialFeatures}
          >
            <BrowserWindow url="materialbank.com/boards">
              <img
                src="https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/Save_materials_you_like_sample_later.webp"
                alt="Save materials you like, sample later"
                className="object-cover w-full h-full"
              />
            </BrowserWindow>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
