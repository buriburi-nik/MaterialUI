import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Now available in React & Vue
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build beautiful{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              overlay UIs
            </span>{" "}
            effortlessly
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive component library designed for modern web
            applications. Create stunning overlays, modals, and interactive
            elements with ease.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              View Documentation
            </Button>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Live Demo Preview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4 mx-auto"></div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Modal Components
                    </h4>
                    <p className="text-sm text-gray-600">
                      Beautiful, accessible modals with smooth animations
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg mb-4 mx-auto"></div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Overlay System
                    </h4>
                    <p className="text-sm text-gray-600">
                      Flexible overlay system for tooltips and popovers
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-lg mb-4 mx-auto"></div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Interactive Elements
                    </h4>
                    <p className="text-sm text-gray-600">
                      Rich interactive components with smooth transitions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
