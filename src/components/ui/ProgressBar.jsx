import React from "react";
import { FaCheck } from "react-icons/fa";

const ProgressBar = ({ currentStep, steps }) => {
  return (
    <div className="w-full max-w-3xl mt-8 px-4">
      <div className="relative flex justify-between items-center w-full">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2 rounded-full"></div>

        {/* Active Line */}
        <div
          className="absolute top-1/2 left-0 h-1 -z-10 transform -translate-y-1/2 rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            backgroundColor: "var(--primary-color)",
          }}
        ></div>

        {/* Steps */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300 border-2`}
                style={
                  isActive || isCompleted
                    ? {
                        backgroundColor: "var(--primary-color)",
                        borderColor: "var(--primary-color)",
                        color: "white",
                      }
                    : {
                        backgroundColor: "white",
                        borderColor: "#D1D5DB", // border-gray-300
                        color: "#6B7280", // text-gray-500
                      }
                }
              >
                {isCompleted ? <FaCheck size={12} /> : stepNumber}
              </div>
              <span
                className={`text-xs font-semibold whitespace-nowrap absolute -bottom-6`}
                style={{
                  transform: "translateX(0%)",
                  color: isActive ? "var(--primary-color)" : "#9CA3AF", // text-gray-400
                }}
              >
                {isActive ? step.title : ""}
              </span>
            </div>
          );
        })}
      </div>
      {/* Spacing for titles */}
      <div className="h-6"></div>
    </div>
  );
};

export default ProgressBar;
