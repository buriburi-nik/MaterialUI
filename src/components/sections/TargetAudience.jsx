import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckFeatureList from "../X/CheckFeatureList";

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
    <section className="py-16 bg-slate-50">
      <div className="container px-4 mx-auto">
        <div className="grid max-w-6xl gap-8 mx-auto lg:grid-cols-2">
          {/* For Architects and Interior Designers */}
          <Card className="relative overflow-hidden transition-shadow duration-300 bg-white border-0 shadow-lg hover:shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="mb-6 text-2xl font-bold text-slate-800">
                For architects and interior designers
              </CardTitle>
              <CheckFeatureList features={architectFeatures} />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Button
                  size="lg"
                  className="px-8 py-3 bg-white border text-slate-800 border-slate-200 hover:bg-slate-50"
                  onClick={() => navigate("/register")}
                >
                  Join for free
                </Button>
                <div className="w-16 h-16 overflow-hidden rounded-full bg-slate-100">
                  <img
                    src="https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/For_architects_and_interior_designers.png"
                    alt="Architect working on design"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* For Manufacturers */}
          <Card className="relative overflow-hidden transition-shadow duration-300 bg-white border-0 shadow-lg hover:shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="mb-6 text-2xl font-bold text-slate-800">
                For manufacturers
              </CardTitle>
              <CheckFeatureList features={manufacturerFeatures} />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Button
                  size="lg"
                  className="px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
                >
                  Become a Brand Partner
                </Button>
                <div className="flex items-center justify-center w-16 h-16 overflow-hidden rounded-full bg-gradient-to-br from-orange-300 to-orange-500">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700">
                      <div className="w-4 h-4 bg-orange-800 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional info section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Join thousands of professionals already using our platform
          </p>
          <div className="flex items-center justify-center gap-8 mt-6 opacity-60">
            <span className="text-xs text-slate-400">
              Trusted by leading brands
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-xs text-slate-400">
              Used in 50+ countries
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-xs text-slate-400">99.9% uptime SLA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
