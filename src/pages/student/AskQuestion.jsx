import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../../utils/doubtsManager";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/ui/Button";
import CustomDropdown from "../../components/ui/CustomDropdown";
import FileUpload from "../../components/ui/FileUpload";
import coursesData from "../../data/admindata/courses";

const AskQuestion = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    subject: "",
    question: "",
    file: null,
    fileName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedStudent = localStorage.getItem("currentStudent");
    if (storedStudent) {
      const studentObj = JSON.parse(storedStudent);
      setStudent(studentObj);

      // Filter subjects based on student class and section
      const filteredSubjects = coursesData
        .filter(
          (course) =>
            course.class === studentObj.class &&
            course.section === studentObj.section,
        )
        .map((course) => course.courseName);

      // Remove duplicates and set subjects
      setSubjects([...new Set(filteredSubjects)]);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("File size should be less than 2MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          file: reader.result,
          fileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearFile = () => {
    setFormData({
      ...formData,
      file: null,
      fileName: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.question) {
      showToast("Please fill in all required fields", "warning");
      return;
    }

    setIsSubmitting(true);
    const result = askQuestion({
      studentId: student.id,
      studentName: student.fullName,
      class: student.class,
      section: student.section,
      subject: formData.subject,
      question: formData.question,
      questionFile: formData.file,
    });

    if (result.success) {
      showToast(result.message, "success");
      navigate("/questions");
    } else {
      showToast(result.message, "error");
    }
    setIsSubmitting(false);
  };

  if (!student) return null;

  return (
    <section className="w-full min-h-screen bg-[#f3f4f6] flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6 sm:p-10 border-t-8 border-[var(--primary-color)]">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Ask a Question</h1>
            <p className="text-gray-500 text-sm font-medium">
              Our teachers will get back to you soon.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <CustomDropdown
              title="Select Subject"
              options={subjects}
              value={formData.subject}
              onChange={(val) => setFormData({ ...formData, subject: val })}
              placeholder="Choose a subject"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider px-1">
              Your Question
            </label>
            <textarea
              rows="6"
              className="w-full border border-gray-200 rounded-2xl p-4 focus:border-[var(--primary-color)] outline-none transition-all resize-none bg-gray-50/50 text-gray-700 font-medium"
              placeholder="Explain your doubt clearly..."
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <FileUpload
              label="Attachments (Optional)"
              file={formData.file ? formData.fileName : null}
              onChange={handleFileChange}
              onClear={handleClearFile}
              accept="image/*,.pdf"
              helperText="Upload an image or PDF (Max 2MB)"
              labelClassName="text-sm font-bold text-gray-700 uppercase tracking-wider px-1"
            />
          </div>

          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-xs rounded-2xl text-base shadow-lg shadow-blue-100"
              icon={
                isSubmitting ? <FaSpinner className="animate-spin" /> : null
              }
            >
              {isSubmitting ? "Submitting..." : "Post Question"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AskQuestion;
