import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import FileUpload from "../../components/ui/FileUpload";
import CustomDropdown from "../../components/ui/CustomDropdown";
import coursesData from "../../data/admindata/courses";
import { useToast } from "../../context/ToastContext";
import { addNotice } from "../../utils/noticeManager";

const NoticeTeacher = () => {
  const { showToast } = useToast();
  const [teacher, setTeacher] = useState(null);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    class: "",
    section: "",
    isImportant: false,
    expiryDate: "",
    attachment: null,
    attachmentName: "",
  });

  useEffect(() => {
    const storedTeacher = localStorage.getItem("currentTeacher");
    if (storedTeacher) {
      const teacherData = JSON.parse(storedTeacher);
      setTeacher(teacherData);

      // Filter courses where this teacher is the instructor
      const filtered = coursesData.filter(
        (course) => course.instructor === teacherData.fullName,
      );
      setAssignedCourses(filtered);
    }
  }, []);

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
      class: "",
      section: "",
      isImportant: false,
      expiryDate: "",
      attachment: null,
      attachmentName: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.details) {
      showToast("Please fill in title and details.", "warning");
      return;
    }

    setIsSubmitting(true);

    const noticePayload = {
      ...formData,
      audience: "Students", // Teachers send to students
      author: teacher?.fullName || "Teacher",
      authorRole: "Teacher",
    };

    const result = addNotice(noticePayload);

    if (result.success) {
      showToast("Notice sent to students successfully!", "success");
      handleClear();
    } else {
      showToast(result.message, "error");
    }
    setIsSubmitting(false);
  };

  // Derive unique options for the teacher
  const classOptions = ["All", ...new Set(assignedCourses.map((c) => c.class))];
  const sectionOptions = [
    "All",
    ...new Set(
      assignedCourses
        .filter((c) => c.class === formData.class)
        .map((c) => c.section),
    ),
  ];

  return (
    <section className="w-full bg-white flex flex-col items-center px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
            Notice Title
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a brief title for the notice"
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/10 focus:border-[var(--primary-color)] transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Target Class
            </label>
            <CustomDropdown
              options={classOptions}
              value={formData.class}
              onChange={(val) => handleDropdownChange("class", val)}
              placeholder="Select Class (Leave empty for All)"
              triggerClassName="bg-gray-50 border-gray-200 rounded-lg py-1.5"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Target Section
            </label>
            <CustomDropdown
              options={sectionOptions}
              value={formData.section}
              onChange={(val) => handleDropdownChange("section", val)}
              placeholder="Select Section (Optional)"
              triggerClassName="bg-gray-50 border-gray-200 rounded-lg py-1.5"
              disabled={!formData.class || formData.class === "All"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
            Notice Details
          </label>
          <textarea
            name="details"
            required
            rows="6"
            value={formData.details}
            onChange={handleChange}
            placeholder="Write your detailed notice or event information here..."
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/10 focus:border-[var(--primary-color)] transition-all font-medium resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/10 focus:border-[var(--primary-color)] transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 h-[58px]">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isImportant"
                checked={formData.isImportant}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                  formData.isImportant ? "bg-red-500" : ""
                }`}
                style={{
                  backgroundColor: formData.isImportant ? "#ef4444" : "",
                }}
              ></div>
              <span className="ml-3 text-sm font-bold text-gray-700">
                Mark as Important
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
            Attachment (Optional)
          </label>
          <FileUpload
            label="Upload Image or Document"
            file={formData.attachment}
            onChange={handleFileChange}
            onClear={() =>
              setFormData((prev) => ({
                ...prev,
                attachment: null,
                attachmentName: "",
              }))
            }
          />
        </div>

        <div className="flex items-center justify-end gap-4 mt-6">
          <Button
            type="submit"
            variant="primary"
            className="w-full max-w-[150px] text-base font-bold shadow-lg shadow-blue-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Notice"}
          </Button>
          <Button
            type="button"
            variant="reset"
            onClick={handleClear}
            className="px-8 py-4 text-lg font-bold"
          >
            Clear
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NoticeTeacher;
