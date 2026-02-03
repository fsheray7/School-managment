import React, { useState } from "react";
import { FaUpload, FaTimes } from "react-icons/fa";
import CustomDropdown from "../../components/ui/CustomDropdown";
import Button from "../../components/ui/Button";

import { useSettings } from "../../context/SettingsContext";

import { useToast } from "../../context/ToastContext";

const NoticeForm = () => {
  const { showToast } = useToast();
  const { classes, sections } = useSettings();
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    audience: "",
    class: "",
    section: "",
    isImportant: false,
    expiryDate: "",
    attachment: null,
  });

  const audienceOptions = ["All", "Teachers", "Students", "Parents"];

  // Parse classes and sections from settings strings
  const classOptions = classes
    ? classes.split(",").map((c) => c.trim())
    : Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

  const sectionOptions = sections
    ? sections.split(",").map((s) => s.trim())
    : ["A", "B", "C"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset dependent fields
      ...(name === "audience" && value !== "Students"
        ? { class: "", section: "" }
        : {}),
      ...(name === "class" && !value ? { section: "" } : {}),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, attachment: file }));
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      details: "",
      audience: "",
      class: "",
      section: "",
      isImportant: false,
      expiryDate: "",
      attachment: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notice Data Submitted:", formData);
    // Add API call logic here
    showToast("Notice sent successfully!");
  };

  return (
    <div className="w-full max-w-3xl bg-white overflow-hidden">
      <form onSubmit={handleSubmit} className="p-1 md:p-4 space-y-3">
        {/* Notice Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Notice Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter notice title"
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none transition-all text-gray-800"
            style={{
              focusBorderColor: "var(--primary-color)",
              focusRing: "2px var(--primary-color) / 0.1",
            }}
            // Using Tailwind focus:border-[var(--primary-color)]
          />
        </div>

        {/* Notice Details */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Notice Details <span className="text-red-500">*</span>
          </label>
          <textarea
            name="details"
            required
            rows="5"
            value={formData.details}
            onChange={handleChange}
            placeholder="Write notice or event details here..."
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] outline-none transition-all text-gray-800 resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Audience Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Send Notice To
            </label>
            <CustomDropdown
              options={audienceOptions}
              value={formData.audience}
              onChange={(val) => handleDropdownChange("audience", val)}
              placeholder="Select Audience"
              triggerClassName="border-gray-300 bg-gray-50 rounded-lg py-1.5"
            />
          </div>

          {/* Expiry Date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full py-1.5 px-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Class Selection - Conditional */}
          {formData.audience === "Students" && (
            <div className="flex flex-col gap-2 animate-fade-in">
              <label className="text-sm font-semibold text-gray-700">
                Class
              </label>
              <CustomDropdown
                options={classOptions}
                value={formData.class}
                onChange={(val) => handleDropdownChange("class", val)}
                placeholder="Select Class"
                triggerClassName="border-gray-300 bg-gray-50 rounded-lg py-1.5"
              />
            </div>
          )}

          {/* Section Selection - Conditional */}
          {formData.class && (
            <div className="flex flex-col gap-2 animate-fade-in">
              <label className="text-sm font-semibold text-gray-700">
                Section
              </label>
              <CustomDropdown
                options={sectionOptions}
                value={formData.section}
                onChange={(val) => handleDropdownChange("section", val)}
                placeholder="Select Section"
                triggerClassName="border-gray-300 bg-gray-50 rounded-lg py-1.5"
              />
            </div>
          )}
        </div>

        {/* Important Toggle */}
        <div className="flex items-center gap-4 px-2 py-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isImportant"
              checked={formData.isImportant}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
              style={{
                "--tw-ring-color": "var(--primary-color)",
                backgroundColor: formData.isImportant
                  ? "var(--primary-color)"
                  : "",
              }}
            ></div>
            <span className="ml-3 text-sm font-semibold text-gray-700">
              Mark as Important
            </span>
          </label>
          <span className="text-xs text-gray-500 italic">pinned on top</span>
        </div>

        {/* Attachment Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Upload Attachment
          </label>
          <div className="flex items-center gap-4">
            <label
              className="flex items-center gap-2 px-4 py-1 bg-white border rounded-lg cursor-pointer hover:brightness-95 transition-colors font-medium"
              style={{
                borderColor: "var(--primary-color)",
                color: "var(--primary-color)",
              }}
            >
              <FaUpload size={14} />
              <span className="text-sm">Choose File</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".jpg,.png,.pdf"
              />
            </label>
            {formData.attachment && (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  opacity: 0.1,
                }}
              >
                <div className="flex items-center gap-2" style={{ opacity: 1 }}>
                  <span className="truncate max-w-[200px]">
                    {formData.attachment.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, attachment: null }))
                  }
                  className="hover:text-red-500"
                  style={{ color: "var(--primary-color)" }}
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}
          </div>
          <span className="text-[10px] text-gray-400">
            Supported formats: JPG, PNG, PDF
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            type="submit"
            variant="primary"
            className="w-full max-w-40 sm:w-48 py-2 text-lg font-bold shadow-lg shadow-blue-200"
          >
            Send Notice
          </Button>
          <Button
            type="button"
            variant="reset"
            onClick={handleClear}
            className="w-full max-w-40 sm:w-48 py-3 text-lg font-bold"
          >
            Clear Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;
