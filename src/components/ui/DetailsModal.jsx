import React from "react";
import { FaTimes } from "react-icons/fa";
import CustomDropdown from "./CustomDropdown";

const DetailsModal = ({
  isOpen,
  onClose,
  title,
  isEditMode,
  data,
  onDataChange,
  onSave,
  fields,
}) => {
  if (!isOpen || !data) return null;

  const handleChange = (key, value) => {
    onDataChange({ ...data, [key]: value });
  };

  const renderField = (field) => {
    if (field.type === "grid") {
      return (
        <div
          key={field.label || Math.random()}
          className="grid grid-cols-2 gap-4"
        >
          {field.gridFields.map((gridField) => (
            <div key={gridField.key}>
              <label className="text-xs text-gray-500 uppercase font-bold ">
                {gridField.label}
              </label>
              {isEditMode ? (
                gridField.type === "select" ? (
                  <div className="mt-1 ">
                    <CustomDropdown
                      options={gridField.options}
                      value={data[gridField.key] || ""}
                      onChange={(val) => handleChange(gridField.key, val)}
                      placeholder={`Select ${gridField.label}`}
                      containerClassName="w-full"
                      triggerClassName="border-gray-300"
                      searchable={gridField.searchable || false}
                    />
                  </div>
                ) : (
                  <input
                    type={gridField.type || "text"}
                    value={data[gridField.key] || ""}
                    onChange={(e) =>
                      handleChange(gridField.key, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500 text-sm"
                  />
                )
              ) : (
                <p className="text-gray-800 font-medium">
                  {data[gridField.key]}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (field.type === "image") {
      return (
        <div
          key={field.key}
          className="flex flex-col gap-2 items-center justify-center mb-4"
        >
          <div className="relative group">
            <img
              src={
                data[field.key] instanceof File
                  ? URL.createObjectURL(data[field.key])
                  : data[field.key] ||
                    `https://ui-avatars.com/api/?name=${data.fullName}&background=random`
              }
              alt={data.fullName}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-md"
            />
            {isEditMode && (
              <label
                className="absolute bottom-0 right-0 text-white p-1.5 rounded-full cursor-pointer transition-colors shadow-sm hover:brightness-90"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleChange(field.key, e.target.files[0]);
                    }
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
            )}
          </div>
          {isEditMode && (
            <span className="text-xs text-gray-400">Click icon to change</span>
          )}
        </div>
      );
    }

    return (
      <div key={field.key}>
        <label className="text-xs text-gray-500 uppercase font-bold">
          {field.label}
        </label>
        {isEditMode ? (
          field.type === "select" ? (
            <div className="mt-1">
              <CustomDropdown
                options={field.options}
                value={data[field.key] || ""}
                onChange={(val) => handleChange(field.key, val)}
                placeholder={`Select ${field.label}`}
                containerClassName="w-full"
                searchable={field.searchable || false}
              />
            </div>
          ) : field.type === "password" ? (
            <input
              type="text" // Using text to make it visible as per request "edit password input" usually implies visibility for admin or simple edit
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Enter new password"
            />
          ) : (
            <input
              type={field.type || "text"}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500 text-sm"
            />
          )
        ) : field.render ? (
          field.render(data)
        ) : (
          <p className="text-gray-800 font-medium">{data[field.key]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[var(--primary-color)]/10 px-6 py-4 flex justify-between items-center border-b border-[var(--primary-color)]/20">
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-white/50 rounded-full"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {fields.map(renderField)}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          {isEditMode ? (
            <>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2 rounded-xl text-white font-medium hover:brightness-90 transition-shadow hover:shadow-lg shadow-blue-100 text-sm"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors text-sm"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
