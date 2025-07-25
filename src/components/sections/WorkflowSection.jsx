import React from "react";
import FeatureCard from "../X/FeatureCard";
import BrowserWindow from "../X/BrowserWindow";
import MockupDialog from "../X/MockupDialog";

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

  const dialogButtons = [
    {
      text: "Start Chat",
      className:
        "bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium flex-1",
    },
    {
      text: "Later",
      className:
        "border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm",
    },
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
              <div className="relative">
                {/* Background with material samples */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-6 gap-1 p-4">
                    <div className="rounded aspect-square bg-amber-800"></div>
                    <div className="bg-red-900 rounded aspect-square"></div>
                    <div className="bg-blue-900 rounded aspect-square"></div>
                    <div className="bg-green-900 rounded aspect-square"></div>
                    <div className="bg-purple-900 rounded aspect-square"></div>
                    <div className="bg-gray-800 rounded aspect-square"></div>
                  </div>
                </div>

                {/* Modal Dialog */}
                <div className="relative flex items-center h-full p-6">
                  <MockupDialog
                    title="We're here to help with your project needs"
                    message="Hi! I can help you find the perfect materials for your project. What are you working on?"
                    buttons={dialogButtons}
                  />
                </div>
              </div>
            </BrowserWindow>
          </FeatureCard>

          {/* Right Column - Material Board */}
          <FeatureCard
            title="Save materials you like, sample later"
            features={materialFeatures}
          >
            <BrowserWindow url="materialbank.com/boards">
              <div className="flex flex-col h-64 p-6">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded">
                      <span className="text-xs font-bold text-white">M</span>
                    </div>
                    <span className="text-sm font-medium text-slate-800">
                      Material Board
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded">
                      Sample All
                    </button>
                    <button className="px-3 py-1 text-xs text-gray-700 border border-gray-300 rounded">
                      Share
                    </button>
                  </div>
                </div>

                {/* Material Grid - Single Placeholder */}
                <div className="flex items-center justify-center flex-1">
                  <div className="flex items-center justify-center w-20 h-20 bg-gray-100 border border-gray-200 border-dashed rounded-lg shadow-sm">
                    <span className="text-xs text-gray-400">+</span>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="flex justify-center mt-4">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < 4 ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </BrowserWindow>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
