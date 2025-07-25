import React from "react";

export default function FeatureList({ features, bulletColor = "green-600" }) {
  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <div
            className={`w-1.5 h-1.5 bg-${bulletColor} rounded-full mt-2 flex-shrink-0`}
          ></div>
          <span className="text-slate-700 text-sm">{feature}</span>
        </div>
      ))}
    </div>
  );
}
