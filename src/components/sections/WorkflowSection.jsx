import React from "react";
import { EXTERNAL_ASSETS } from "@assets";

// FeatureCard Component
function FeatureCard({ title, features, children }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-lg font-semibold leading-tight text-slate-700 sm:text-xl lg:text-2xl">
          {title}
        </h3>
        <ul className="space-y-2 sm:space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <svg 
                  className="w-4 h-4 text-gray-500 sm:w-5 sm:h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <span className="text-sm leading-relaxed text-slate-600 sm:text-base">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 sm:mt-6">
        {children}
      </div>
    </div>
  );
}

// BrowserWindow Component
function BrowserWindow({ url, children }) {
  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm sm:rounded-xl sm:shadow-md">
      {/* Browser Header */}
      <div className="flex items-center px-3 py-2 border-b border-gray-200 bg-gray-50 sm:px-4 sm:py-3">
        <div className="flex space-x-1.5 sm:space-x-2">
          <div className="w-2.5 h-2.5 bg-red-400 rounded-full sm:w-3 sm:h-3"></div>
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full sm:w-3 sm:h-3"></div>
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full sm:w-3 sm:h-3"></div>
        </div>
        <div className="flex-1 mx-3 sm:mx-4">
          <div className="px-2 py-1 text-xs text-gray-500 bg-white border border-gray-200 rounded sm:text-sm sm:px-3">
            {url}
          </div>
        </div>
      </div>
      {/* Browser Content */}
      <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
        {children}
      </div>
    </div>
  );
}

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
    <section className="w-full py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12 lg:mb-16">
          <h2 className="text-2xl font-bold leading-tight text-slate-700 sm:text-3xl md:text-4xl lg:text-5xl">
            Supercharge your workflow.
          </h2>
        </div>

        {/* Two Column Layout - Stack on mobile, side by side on desktop */}
        <div className="space-y-8 sm:space-y-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 xl:gap-12">
          {/* Left Column - Communication */}
          <div className="order-1 p-6 border border-gray-200 rounded-lg shadow-sm sm:p-8 lg:p-6 xl:p-8" style={{backgroundColor: '#F5F5F7'}}>
            <FeatureCard
              title="Communicate directly with Brand Reps"
              features={communicationFeatures}
            >
              <BrowserWindow url="materialbank.com/messages">
                <img
                  src={EXTERNAL_ASSETS.WORKFLOW.COMMUNICATE}
                  alt="Communicate directly with Brand Reps interface showing messaging with brand representatives"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </BrowserWindow>
            </FeatureCard>
          </div>

          {/* Right Column - Material Board */}
          <div className="order-2 p-6 border border-gray-200 rounded-lg shadow-sm sm:p-8 lg:p-6 xl:p-8" style={{backgroundColor: '#F5F5F7'}}>
            <FeatureCard
              title="Save materials you like, sample later"
              features={materialFeatures}
            >
              <BrowserWindow url="materialbank.com/boards">
                <img
                  src={EXTERNAL_ASSETS.WORKFLOW.SAVE_MATERIALS}
                  alt="Material board interface showing saved materials and sampling options"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </BrowserWindow>
            </FeatureCard>
          </div>
        </div>
      </div>
    </section>
  );
}
