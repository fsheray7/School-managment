import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const Toast = ({ message, type = "success", onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300); // Wait for fade-out animation
  };

  const icons = {
    success: <FaCheckCircle className="text-white" />,
    error: <FaExclamationCircle className="text-white" />,
    info: <FaInfoCircle className="text-white" />,
    warning: <FaExclamationCircle className="text-white" />,
  };

  const colors = {
    success: "bg-[var(--primary-color)]", // Using primary brand color for success
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-amber-500",
  };

  return (
    <div
      className={`
        pointer-events-auto
        flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl min-w-[300px] max-w-md
        transition-all duration-300 transform
        ${isExiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}
        ${colors[type] || colors.success}
      `}
      role="alert"
    >
      <div className="text-xl flex-shrink-0">
        {icons[type] || icons.success}
      </div>

      <div className="flex-1 text-white font-bold text-sm">{message}</div>

      <button
        onClick={handleClose}
        className="text-white/80 hover:text-white transition-colors p-1"
        aria-label="Close"
      >
        <FaTimes size={14} />
      </button>

      {/* Progress Bar (Visual indicator of timer) */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/20 rounded-full w-full overflow-hidden">
        <div
          className="h-full bg-white/40 animate-toast-progress"
          style={{ width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default Toast;
