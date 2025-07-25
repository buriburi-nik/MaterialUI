import React from "react";
import FeatureList from "./FeatureList";

export default function FeatureCard({
  title,
  features,
  children,
  className = "",
}) {
  return (
    <div className={`bg-gray-100 rounded-xl p-8 ${className}`}>
      <h3 className="mb-6 text-xl font-bold text-slate-800">{title}</h3>
      <div className="mb-8">
        <FeatureList features={features} />
      </div>
      {children}
    </div>
  );
}
