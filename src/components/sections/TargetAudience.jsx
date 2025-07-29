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
                  className="z-10 px-6 py-2 font-semibold text-gray-800 transition-all duration-300 bg-white rounded-full shadow-md hover:scale-105 hover:bg-slate-50"
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
className="z-10 px-6 py-2 font-semibold text-gray-800 transition-all duration-300 bg-white rounded-full shadow-md hover:scale-105 hover:bg-slate-50"                >
                  Become a Brand Partner
                </Button>
             <div className="w-16 h-16 overflow-hidden rounded-full bg-slate-100">
                  <img
                    src="https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/For_manufacturers.png"
                    alt="Architect working on design"
                    className="object-cover w-full h-full"
                  />
                </div>      
                        </div>
            </CardContent>
          </Card>
        </div>

       
      </div>
    </section>
  );
}
