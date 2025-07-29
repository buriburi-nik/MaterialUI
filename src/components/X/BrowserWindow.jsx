import React from "react";

export default function BrowserWindow({
  className = "",
  contentHeight = "h-auto",
  url = "https://materialbank-eu-cdn.freetls.fastly.net",
  children,
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 ${className}`}
    >
      {/* Browser Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-200">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="flex-1 px-3 py-1 ml-4 bg-white rounded">
          <div className="text-xs text-gray-600">{url}</div>
        </div>
      </div>

      {/* Content */}
      <div className={`bg-white ${contentHeight}`}>
        {children}
      </div>
    </div>
  );
}
