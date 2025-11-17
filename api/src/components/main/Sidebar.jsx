// src/components/Sidebar.jsx
import React from "react";

const items = [
  { key: "energy", label: "Energy" },
  { key: "environment", label: "Environment" },
  { key: "mobility", label: "Mobility" },
];

export default function Sidebar({ activeItem, onSelect }) {
  return (
    <div
    className="
        w-64 
        rounded-r-2xl
        bg-slate-900 
        shadow-2xl 
        border-r border-slate-700 
        p-6 space-y-6 flex flex-col">     
     <div className="px-3 mb-4">
        <h1 className="text-xl font-semibold tracking-wide">
          Smart Dashboard
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Επιλογή θεματικής περιοχής
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.key === activeItem;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={
                "w-full text-left px-3 py-2 rounded-lg text-sm transition " +
                (isActive
                  ? "bg-slate-700 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white")
              }
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 mt-auto text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} City Dashboard</p>
      </div>
    </div>
  );
}
