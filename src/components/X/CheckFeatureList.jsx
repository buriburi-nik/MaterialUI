import React from "react";
import { Check } from "lucide-react";

export default function CheckFeatureList({ features }) {
  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="mt-1">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-slate-600 leading-relaxed">{feature}</span>
        </div>
      ))}
    </div>
  );
}
