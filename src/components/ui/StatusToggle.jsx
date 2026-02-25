import React from "react";

const StatusToggle = ({ status, onToggle, label = false }) => {
  const isActive = status === "Active";

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-300 focus:outline-none ${
          isActive
            ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
            isActive ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      {label && (
        <span
          className={`text-[10px] font-black uppercase tracking-widest ${
            isActive ? "text-emerald-600" : "text-gray-400"
          }`}
        >
          {status}
        </span>
      )}
    </div>
  );
};

export default StatusToggle;
