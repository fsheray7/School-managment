import React, { useState, useEffect } from "react";
import { FaSave, FaCalendarAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";
import TeacherSelector from "../../components/teacher/TeacherSelector";
import studentsData from "../../data/admindata/students/students";
import { getStudentMarks, saveStudentMarks } from "../../utils/marksManager";
import { useToast } from "../../context/ToastContext";

const AddMarks = () => {
  const location = useLocation();
  const { showToast } = useToast();
  const [selection, setSelection] = useState({
    class: "",
    section: "",
    subject: "",
  });
  const [terminal, setTerminal] = useState("First"); // Default terminal
  const [marksDate, setMarksDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentMarks, setStudentMarks] = useState({});
  const [teacherDept, setTeacherDept] = useState("General");
  const [totalMarks, setTotalMarks] = useState(100); // Standard total marks

  useEffect(() => {
    if (location.state?.selection) {
      setSelection(location.state.selection);
    }
    if (location.state?.terminal) {
      setTerminal(location.state.terminal);
    }
  }, [location.state]);

  useEffect(() => {
    const storedTeacher = localStorage.getItem("currentTeacher");
    if (storedTeacher) {
      const teacherData = JSON.parse(storedTeacher);
      setTeacherDept(teacherData.department || "General");
    }
  }, []);

  useEffect(() => {
    if (selection.class && selection.section) {
      const filtered = studentsData.filter(
        (s) => s.class === selection.class && s.section === selection.section,
      );
      setFilteredStudents(filtered);

      // Load marks from localStorage for this terminal
      const initialMarks = {};
      filtered.forEach((s) => {
        if (selection.subject && terminal) {
          const savedMarks = getStudentMarks(
            s.id,
            selection.class,
            selection.section,
            selection.subject,
            terminal,
          );
          initialMarks[s.id] = savedMarks ? savedMarks.obtainedMarks : "";
        } else {
          initialMarks[s.id] = "";
        }
      });
      setStudentMarks(initialMarks);
    }
  }, [selection, terminal]);

  const handleMarkChange = (studentId, value) => {
    // Validate input
    const numValue = parseInt(value);
    if (
      value !== "" &&
      (isNaN(numValue) || numValue < 0 || numValue > totalMarks)
    ) {
      return; // Don't update if invalid
    }

    setStudentMarks((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSaveMarks = () => {
    // Validation
    if (!selection.class || !selection.section || !selection.subject) {
      showToast("Please select class, section, and subject", "error");
      return;
    }

    if (!terminal) {
      showToast("Terminal information is missing", "error");
      return;
    }

    // Prepare students data with marks
    const studentsWithMarks = filteredStudents.map((student) => ({
      studentId: student.id,
      rollNumber: student.rollNumber,
      fullName: student.fullName,
      obtainedMarks: studentMarks[student.id],
    }));

    // Save marks
    const result = saveStudentMarks({
      students: studentsWithMarks,
      class: selection.class,
      section: selection.section,
      subject: selection.subject,
      terminal: terminal,
      totalMarks: totalMarks,
      academicYear: "2024-25",
    });

    if (result.success) {
      showToast(result.message, "success");
    } else {
      showToast(result.message, "error");
    }
  };

  return (
    <section className="w-full mt-13 bg-white flex flex-col items-center">
      {/* CLASS AND DATE BAR (Classic Design - Matching Attendance) */}
      <div
        className="flex w-full items-center justify-between py-3 px-4 shadow-sm"
        style={{ backgroundColor: "var(--primary-color)", opacity: 0.9 }}
      >
        <h2 className="text-sm sm:text-base text-white font-bold">
          Class:{" "}
          <span className="font-normal">
            {selection.class} - {selection.section}
          </span>
          <span className="mx-2">|</span>
          Subject: <span className="font-normal">{selection.subject}</span>
          <span className="mx-2">|</span>
          Terminal: <span className="font-normal">{terminal}</span>
        </h2>
        <div className="flex items-center gap-2">
          <label className="text-white text-sm font-bold">Date:</label>
          <div className="text-white font-bold text-sm sm:text-base">
            {marksDate}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full mt-6 px-0 sm:px-4">
        {/* Header */}
        <div
          className="flex justify-between items-center border-b py-3 px-4 text-white text-xs sm:text-sm font-bold shadow-sm"
          style={{ backgroundColor: "var(--primary-color)", opacity: 0.9 }}
        >
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
            <p>Roll No</p>
            <p className="ml-4">Student Name</p>
          </div>
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
            <p>Obtained Marks / {totalMarks}</p>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex justify-between items-center border-b border-[#C4C4C4] py-3 mt-1 px-4 text-xs sm:text-sm hover:bg-gray-50 transition-all font-medium text-gray-700"
              >
                <div className="flex items-center gap-4">
                  <p className="w-16">{student.rollNumber}:</p>
                  <p className="font-semibold">{student.fullName}</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="00"
                    min="0"
                    max={totalMarks}
                    value={studentMarks[student.id] || ""}
                    onChange={(e) =>
                      handleMarkChange(student.id, e.target.value)
                    }
                    className="w-16 h-10 border border-gray-200 rounded-lg text-center outline-none transition-all focus:border-[var(--primary-color)] focus:ring-4 focus:ring-[var(--primary-color)]/10 font-bold text-gray-700"
                  />
                  <span className="text-gray-400 font-medium">
                    / {totalMarks}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-400 font-medium">
              Select a class and section to add marks.
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      {filteredStudents.length > 0 && (
        <div className="w-full flex justify-center mt-10 px-4">
          <Button
            variant="primary"
            className="w-full max-w-[150px] py-1 shadow-md"
            icon={<FaSave />}
            onClick={handleSaveMarks}
          >
            Save All Marks
          </Button>
        </div>
      )}

      {/* Fixed Info Footer */}
      <footer
        className="w-full max-w-5xl px-8 py-4 flex fixed bottom-0 justify-between items-center text-white text-sm sm:text-base font-bold z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] rounded-t-2xl"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <div className="flex flex-col">
          <span className="text-[10px] opacity-70 uppercase">Subject</span>
          <h3 className="tracking-wide">
            {selection.subject || "Not Selected"}
          </h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] opacity-70 uppercase">Department</span>
          <h3 className="tracking-wide">{teacherDept}</h3>
        </div>
      </footer>
    </section>
  );
};

export default AddMarks;
