import React from "react";
import { FaUpload, FaTimes } from "react-icons/fa";

const FileUpload = ({
  label,
  file,
  onChange,
  onClear,
  onPreview,
  accept = ".jpg,.png,.pdf",
  helperText = "Supported formats: JPG, PNG, PDF",
  className = "",
  labelClassName = "text-sm font-semibold text-gray-700",
}) => {
  const fileName = file instanceof File ? file.name : null;
  const isUrl = typeof file === "string";

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className={labelClassName}>{label}</label>}
      <div className="flex items-center gap-4">
        <label
          className="flex items-center gap-2 px-6 py-2 bg-white border rounded-lg cursor-pointer hover:scale-101 transform duration-300 border border-gray-300 transition-all font-medium whitespace-nowrap"
          style={{
            color: "var(--primary-color)",
          }}
        >
          <FaUpload size={14} />
          <span className="text-sm">Choose File</span>
          <input
            type="file"
            className="hidden"
            onChange={onChange}
            accept={accept}
          />
        </label>

        {(fileName || isUrl) && (
          <div
            onClick={onPreview}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border animate-fade-in ${onPreview ? "cursor-pointer hover:brightness-110 active:scale-95" : ""}`}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              opacity: 0.9,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="truncate max-w-[150px] md:max-w-[170px]">
                {fileName || "Current File"}
              </span>
            </div>
            {onClear && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="hover:text-red-500 transition-colors cursor-pointer"
                title="Remove file"
              >
                <FaTimes size={14} />
              </button>
            )}
          </div>
        )}
      </div>
      {helperText && (
        <span className="text-[10px] text-gray-400">{helperText}</span>
      )}
    </div>
  );
};

export default FileUpload;
