import React from "react";

export default function MockupDialog({ title, message, buttons = [] }) {
  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 max-w-sm mx-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
      </div>

      <div className="flex gap-3">
        {buttons.map((button, index) => (
          <button key={index} className={button.className}>
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
}
