import React from "react";

export default function FilterTabs({ filter, setFilter }) {
  return (
    <div className="flex justify-center gap-3 mb-6">
      {["all", "active", "completed"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-2 rounded font-medium capitalize ${
            filter === f
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
