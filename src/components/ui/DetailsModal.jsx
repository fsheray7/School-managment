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
                      triggerClassName="text-red-500"
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
        <div className="bg-[#E8F8F6] px-6 py-4 flex justify-between items-center border-b border-teal-100">
          <h3 className="text-lg font-bold text-[#0C46C4]">{title}</h3>
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
                className="px-5 py-2 rounded-xl bg-[#0C46C4] text-white font-medium hover:bg-[#08308d] transition-shadow hover:shadow-lg shadow-blue-100 text-sm"
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
