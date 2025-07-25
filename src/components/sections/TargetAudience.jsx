import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckFeatureList from "../CheckFeatureList";

export default function TargetAudience() {
  const navigate = useNavigate();
  const architectFeatures = [
    "Hundreds of leading brands",
    "One site",
    "Order before 6:30 PM CET, receive your samples the next day",
    "All your samples in one package",
    "Free for architects and designers",
  ];

  const manufacturerFeatures = [
    "Thousands of new specifiers every month",
    "Leads on-demand",
    "Ultra-fast sample logistics",
    "Sample reclamation",
    "Strong ROI and massive brand awareness",
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* For Architects and Interior Designers */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-slate-800 mb-6">
                For architects and interior designers
              </CardTitle>
              <CheckFeatureList features={architectFeatures} />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Button
                  size="lg"
                  className="bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 px-8 py-3"
                  onClick={() => navigate("/register")}
                >
                  Join for free
                </Button>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fd3abc8b84bb34537b8335a0239d6fa84%2F3a31c628b8a148a0bda4b5156d6f2403?format=webp&width=800"
                    alt="Architect working on design"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* For Manufacturers */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-slate-800 mb-6">
                For manufacturers
              </CardTitle>
              <CheckFeatureList features={manufacturerFeatures} />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 px-8 py-3"
                >
                  Become a Brand Partner
                </Button>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-orange-800" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional info section */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            Join thousands of professionals already using our platform
          </p>
          <div className="flex justify-center items-center gap-8 mt-6 opacity-60">
            <span className="text-slate-400 text-xs">
              Trusted by leading brands
            </span>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="text-slate-400 text-xs">
              Used in 50+ countries
            </span>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="text-slate-400 text-xs">99.9% uptime SLA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
