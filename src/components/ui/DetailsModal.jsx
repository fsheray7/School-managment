import React from "react";
import { FaTimes } from "react-icons/fa";
import DynamicForm from "./DynamicForm";
import Button from "./Button";
const DetailsModal = ({
  isOpen,
  onClose,
  title,
  isEditMode,
  data,
  onDataChange,
  onSave,
  fields,
  readOnly,
}) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[var(--primary-color)]/10 px-6 py-4 flex justify-between items-center border-b border-[var(--primary-color)]/20">
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            {title}
          </h3>
          <Button
            onClick={onClose}
            variant="reset"
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-white/50 rounded-full"
          >
            <FaTimes size={18} />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <DynamicForm
            fields={fields}
            formData={data}
            setFormData={onDataChange}
            readOnly={!isEditMode}
            showDefaultHeader={false}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
          />
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          {isEditMode ? (
            <>
              <Button
                onClick={onClose}
                variant="danger"
                className="px-5 py-2 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={onSave}
                variant="primary"
                className="px-5 py-2 rounded-xl text-white font-medium hover:brightness-90 transition-shadow hover:shadow-lg shadow-blue-100 text-sm"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              onClick={onClose}
              variant="danger"
              className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors text-sm"
            >
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
