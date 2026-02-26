import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomDropdown from "../ui/CustomDropdown";
import Button from "../ui/Button";
import FileUpload from "../ui/FileUpload";
import { useSettings } from "../../context/SettingsContext";
import { useToast } from "../../context/ToastContext";
import { useTeacher } from "../../context/TeacherContext";
import { addNotice } from "../../utils/noticeManager";

const NoticeForm = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const teacherContext = useTeacher();
  const { classes, sections } = useSettings();

  const isTeacherContext = location.pathname.includes("teacher");
  const author = isTeacherContext
    ? teacherContext.currentTeacher?.fullName
    : "Admin";
  const authorRole = isTeacherContext ? "Teacher" : "Admin";

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    audience: isTeacherContext ? "Students" : "",
    class: "",
    section: "",
    isImportant: false,
    expiryDate: "",
    attachment: null,
    attachmentName: "",
  });
  const [focusedField, setFocusedField] = useState(null);

  const audienceOptions = isTeacherContext
    ? ["All", "Students", "Parents"]
    : ["All", "Teachers", "Students", "Parents"];

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
      if (file.size > 2 * 1024 * 1024) {
        showToast("File size should be less than 2MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          attachment: reader.result,
          attachmentName: file.name,
        }));
      };
      reader.readAsDataURL(file);
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
      attachmentName: "",
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const hasValue = (fieldName) => {
    const value = formData[fieldName];
    return value !== null && value !== undefined && value !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.details || !formData.audience) {
      showToast("Please fill in required fields", "warning");
      return;
    }

    const { attachmentName, ...noticePayload } = formData;
    const result = addNotice({
      ...noticePayload,
      attachmentName: attachmentName,
      author: author,
      authorRole: authorRole,
    });

    if (result.success) {
      showToast(result.message, "success");
      handleClear();
      navigate(isTeacherContext ? "/notice-teacher" : "/notice-admin");
    } else {
      showToast(result.message, "error");
    }
  };

  const handleNavigate = () => {
    navigate(isTeacherContext ? "/notice-teacher" : "/notice-admin");
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Notice</h1>
        <Button
          variant="ghost"
          onClick={handleNavigate}
          className="text-gray-500 hover:text-gray-700"
        >
          ← Back to List
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="p-1 md:p-4 space-y-6">
        {/* Notice Title */}
        <div className="flex flex-col">
          <div className="relative">
            <label
              className={`absolute left-3 transition-all duration-200 pointer-events-none
                ${
                  focusedField === "title" || hasValue("title")
                    ? "-top-2.5 text-[10px] bg-white px-1 text-gray-500"
                    : "top-2.5 text-xs md:text-sm text-gray-400"
                }`}
              style={{ zIndex: 5 }}
            >
              Notice Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              onFocus={() => handleFocus("title")}
              onBlur={handleBlur}
              placeholder=""
              className={`w-full px-3 py-2.5 text-xs md:text-sm focus:outline-none transition-all bg-transparent
                ${
                  focusedField === "title"
                    ? "border border-[var(--primary-color)] rounded-md shadow-sm"
                    : "border-0 border-b-2 border-gray-200 rounded-none"
                }`}
            />
          </div>
        </div>

        {/* Notice Details */}
        <div className="flex flex-col">
          <div className="relative">
            <label
              className={`absolute left-3 transition-all duration-200 pointer-events-none
                ${
                  focusedField === "details" || hasValue("details")
                    ? "-top-2.5 text-[10px] bg-white px-1 text-gray-500"
                    : "top-2.5 text-xs md:text-sm text-gray-400"
                }`}
              style={{ zIndex: 5 }}
            >
              Notice Details <span className="text-red-500">*</span>
            </label>
            <textarea
              name="details"
              required
              rows="5"
              value={formData.details}
              onChange={handleChange}
              onFocus={() => handleFocus("details")}
              onBlur={handleBlur}
              placeholder=""
              className={`w-full p-2 pt-4 text-sm focus:outline-none min-h-[100px] bg-transparent transition-all resize-none
                ${
                  focusedField === "details"
                    ? "border border-[var(--primary-color)] rounded-md shadow-sm"
                    : "border-0 border-b-2 border-gray-200 rounded-none"
                }`}
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Audience Selection */}
          <div className="flex flex-col">
            <div className="relative">
              <label
                className={`absolute -top-2.5 left-3 text-[10px] bg-white px-1 text-gray-500 transition-all duration-200 z-10`}
              >
                Send Notice To
              </label>
              <div
                className={`transition-all ${
                  focusedField === "audience"
                    ? "border border-[var(--primary-color)] rounded-md"
                    : "border-0 border-b-2 border-gray-200 rounded-none"
                }`}
              >
                <CustomDropdown
                  options={audienceOptions}
                  value={formData.audience}
                  onChange={(val) => handleDropdownChange("audience", val)}
                  placeholder="Select Audience"
                  triggerClassName="pt-4 bg-transparent border-0"
                  onFocus={() => handleFocus("audience")}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>

          {/* Expiry Date */}
          <div className="flex flex-col">
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-200 pointer-events-none
                  ${
                    focusedField === "expiryDate" || hasValue("expiryDate")
                      ? "-top-2.5 text-[10px] bg-white px-1 text-gray-500"
                      : "top-2.5 text-xs md:text-sm text-gray-400"
                  }`}
                style={{ zIndex: 5 }}
              >
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                onFocus={() => handleFocus("expiryDate")}
                onBlur={handleBlur}
                className={`w-full py-2.5 px-3 text-xs md:text-sm focus:outline-none transition-all bg-transparent
                  ${
                    focusedField === "expiryDate" || hasValue("expiryDate")
                      ? "border border-[var(--primary-color)] rounded-md shadow-sm"
                      : "border-0 border-b-2 border-gray-200 rounded-none"
                  }`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Class Selection - Conditional */}
          {formData.audience === "Students" && (
            <div className="flex flex-col animate-fade-in">
              <div className="relative">
                <label
                  className={`absolute -top-2.5 left-3 text-[10px] bg-white px-1 text-gray-500 transition-all duration-200 z-10`}
                >
                  Class
                </label>
                <div
                  className={`transition-all ${
                    focusedField === "class"
                      ? "border border-[var(--primary-color)] rounded-md"
                      : "border-0 border-b-2 border-gray-200 rounded-none"
                  }`}
                >
                  <CustomDropdown
                    options={classOptions}
                    value={formData.class}
                    onChange={(val) => handleDropdownChange("class", val)}
                    placeholder=""
                    triggerClassName="pt-4 bg-transparent border-0"
                    onFocus={() => handleFocus("class")}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section Selection - Conditional */}
          {formData.class && (
            <div className="flex flex-col animate-fade-in">
              <div className="relative">
                <label
                  className={`absolute -top-2.5 left-3 text-[10px] bg-white px-1 text-gray-500 transition-all duration-200 z-10`}
                >
                  Section
                </label>
                <div
                  className={`transition-all ${
                    focusedField === "section"
                      ? "border border-[var(--primary-color)] rounded-md"
                      : "border-0 border-b-2 border-gray-200 rounded-none"
                  }`}
                >
                  <CustomDropdown
                    options={sectionOptions}
                    value={formData.section}
                    onChange={(val) => handleDropdownChange("section", val)}
                    placeholder=""
                    triggerClassName="pt-4 bg-transparent border-0"
                    onFocus={() => handleFocus("section")}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Important Toggle */}
        <div className="flex items-center gap-4 justify-between md:flex-row flex-col animate-fade-in">
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

          <div className="relative w-full md:w-auto">
            <label
              className={`absolute -top-2.5 left-3 text-[10px] bg-white px-1 text-gray-500 transition-all duration-200 z-10`}
            >
              Attachment
            </label>
            <div
              className={`transition-all p-2 ${
                focusedField === "attachment"
                  ? "border border-[var(--primary-color)] rounded-md"
                  : "border-0 rounded-none"
              }`}
            >
              <FileUpload
                file={formData.attachment}
                onChange={handleFileChange}
                onClear={() =>
                  setFormData((prev) => ({ ...prev, attachment: null }))
                }
                onFocus={() => handleFocus("attachment")}
                onBlur={handleBlur}
              />
            </div>
          </div>
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
