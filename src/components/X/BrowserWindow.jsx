import React from "react";

export default function BrowserWindow({
  url,
  children,
  className = "",
  contentHeight = "h-64",
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 ${className}`}
    >
      {/* Browser Header */}
      <div className="bg-gray-200 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="bg-white rounded px-3 py-1 ml-4 flex-1">
          <div className="text-xs text-gray-600">{url}</div>
        </div>
      </div>

      {/* Content Area */}
      <div className={`${contentHeight}`}>{children}</div>
    </div>
  );
}
