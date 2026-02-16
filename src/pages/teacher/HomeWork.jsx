import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import FileUpload from "../../components/ui/FileUpload";
import CustomDropdown from "../../components/ui/CustomDropdown";
import coursesData from "../../data/admindata/courses";
import { useToast } from "../../context/ToastContext"; // Assuming this context exists as used in AddMarks

const HomeWork = () => {
  const { showToast } = useToast();
  const [homeworkFile, setHomeworkFile] = useState(null);
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [selection, setSelection] = useState({
    class: "",
    section: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Set initial defaults if courses exist
      if (filtered.length > 0) {
        setSelection({
          class: filtered[0].class,
          section: filtered[0].section,
          subject: filtered[0].courseName,
        });
      }
    }
  }, []);

  const handleClassChange = (newClass) => {
    const firstCourseForClass = assignedCourses.find(
      (c) => c.class === newClass,
    );
    setSelection((prev) => ({
      ...prev,
      class: newClass,
      section: firstCourseForClass ? firstCourseForClass.section : "",
      subject: firstCourseForClass ? firstCourseForClass.courseName : "",
    }));
  };

  const handleSectionChange = (newSection) => {
    const firstCourseForSection = assignedCourses.find(
      (c) => c.class === selection.class && c.section === newSection,
    );
    setSelection((prev) => ({
      ...prev,
      section: newSection,
      subject: firstCourseForSection ? firstCourseForSection.courseName : "",
    }));
  };

  const handleSubjectChange = (newSubject) => {
    setSelection((prev) => ({ ...prev, subject: newSubject }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Optional: Check file size (e.g., limit to 2MB for localStorage)
      if (selectedFile.size > 2 * 1024 * 1024) {
        showToast(
          "File size varies large. Please upload strict under 2MB.",
          "error",
        );
        return;
      }
      setHomeworkFile(selectedFile);
    }
  };

  const handleClearFile = () => {
    setHomeworkFile(null);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selection.class || !selection.section || !selection.subject) {
      showToast("Please select Class, Section, and Subject.", "error");
      return;
    }

    if (!description && !homeworkFile) {
      showToast("Please provide a description or attach a file.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      let fileData = null;
      if (homeworkFile) {
        fileData = await convertToBase64(homeworkFile);
      }

      const newAssignment = {
        id: Date.now().toString(),
        class: selection.class,
        section: selection.section,
        subject: selection.subject,
        description: description,
        file: fileData,
        fileName: homeworkFile?.name || null,
        fileType: homeworkFile?.type || null,
        date: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD
        teacherId: teacher?.id || "unknown",
        teacherName: teacher?.fullName || "Teacher",
      };

      // Get existing homework
      const existingHomework =
        JSON.parse(localStorage.getItem("homeworkData")) || [];
      const updatedHomework = [newAssignment, ...existingHomework];

      localStorage.setItem("homeworkData", JSON.stringify(updatedHomework));

      showToast("Homework assigned successfully!", "success");

      // Reset form
      setDescription("");
      setHomeworkFile(null);
      // Keep selection as is for convenience
    } catch (error) {
      console.error("Error saving homework:", error);
      showToast("Failed to save homework. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Derive unique options
  const classes = [...new Set(assignedCourses.map((c) => c.class))];
  const sections = [
    ...new Set(
      assignedCourses
        .filter((c) => c.class === selection.class)
        .map((c) => c.section),
    ),
  ];
  const subjects = assignedCourses
    .filter(
      (c) => c.class === selection.class && c.section === selection.section,
    )
    .map((c) => c.courseName);

  return (
    <section className="w-full bg-white flex flex-col items-center">
      <div className="w-full px-4 text-center sm:text-left">
        {/* Custom Dropdowns Replacement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-4 bg-white mb-6">
          {/* Class Dropdown */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Class
            </label>
            <CustomDropdown
              options={classes}
              value={selection.class}
              onChange={handleClassChange}
              placeholder="Select Class"
              triggerClassName="border-gray-200 focus:border-[var(--primary-color)]"
            />
          </div>

          {/* Section Dropdown */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Section
            </label>
            <CustomDropdown
              options={sections}
              value={selection.section}
              onChange={handleSectionChange}
              placeholder="Select Section"
              triggerClassName="border-gray-200 focus:border-[var(--primary-color)]"
            />
          </div>

          {/* Subject Dropdown */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Subject
            </label>
            <CustomDropdown
              options={subjects}
              value={selection.subject}
              onChange={handleSubjectChange}
              placeholder="Select Subject"
              triggerClassName="border-gray-200 focus:border-[var(--primary-color)]"
            />
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full px-4 bg-white rounded-3xl shadow-xl border border-gray-100 p-4 flex flex-col gap-8 transition-all hover:shadow-2xl"
      >
        <div className="flex justify-between gap-4 items-center">
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm font-bold text-[#64748B] uppercase tracking-widest ml-1">
              Assignment Details
            </label>
            <textarea
              placeholder="Describe the homework assignment in detail..."
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-40 outline-none border border-gray-200 p-5 rounded-2xl transition-all focus:border-[var(--primary-color)] focus:ring-4 focus:ring-[var(--primary-color)]/10 shadow-sm text-gray-700 font-medium resize-none"
            />
          </div>

          <FileUpload
            label="Attach Resources (Optional)"
            file={homeworkFile}
            onChange={handleFileChange}
            onClear={handleClearFile}
            helperText="Upload any documents, images, or instructions for students (Max 2MB)."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Assignment"}
          </Button>

          <Button
            variant="ghost"
            type="button"
            className="border border-[var(--primary-color)]"
          >
            Save Draft
          </Button>
        </div>
      </form>

      <div className="w-full max-w-4xl flex items-center justify-center gap-2 mt-8 text-green-600 font-bold bg-green-50 py-3 px-6 rounded-2xl border border-green-100 animate-pulse">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        Status: Ready to Upload
      </div>
    </section>
  );
};

export default HomeWork;
