import React, { useState, useEffect } from "react";
import { FaSave, FaCalendarAlt } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import TeacherSelector from "../../components/teacher/TeacherSelector";
import CustomDropdown from "../../components/ui/CustomDropdown";
import DataTable from "../../components/ui/DataTable";
import studentsData from "../../data/admindata/students/students";
import { getStudentMarks, saveStudentMarks } from "../../utils/marksManager";
import { useToast } from "../../context/ToastContext";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import { useTeacher } from "../../context/TeacherContext";

// Helper functions for grade and status calculation
const calculatePercentage = (obtained, total) => {
  if (!obtained || obtained === "") return 0;
  return parseFloat(((parseInt(obtained) / total) * 100).toFixed(2));
};

const getGrade = (percentage) => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

const getStatus = (percentage) => {
  return percentage >= 40 ? "Pass" : "Fail";
};

const AddMarks = () => {
  const location = useLocation();
  const { showToast } = useToast();
  const [selection, setSelection] = useState({
    terminal: "",
    class: "",
    section: "",
    subject: "",
  });
  const [marksDate, setMarksDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentMarks, setStudentMarks] = useState({});
  const [teacherDept, setTeacherDept] = useState("General");
  const [totalMarks, setTotalMarks] = useState(50); // Standard total marks
  const [marksSaved, setMarksSaved] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { currentTeacher } = useTeacher();

  useEffect(() => {
    if (location.state?.selection) {
      setSelection(location.state.selection);
    }
    if (location.state?.terminal) {
      setSelection((prev) => ({ ...prev, terminal: location.state.terminal }));
    }
  }, [location.state]);

  useEffect(() => {
    if (currentTeacher) {
      setTeacherDept(currentTeacher.department || "General");
    }
  }, [currentTeacher]);

  useEffect(() => {
    if (selection.class && selection.section) {
      const filtered = studentsData.filter(
        (s) => s.class === selection.class && s.section === selection.section,
      );
      setFilteredStudents(filtered);

      // Load marks from localStorage for this terminal
      const initialMarks = {};
      filtered.forEach((s) => {
        if (selection.subject && selection.terminal) {
          const savedMarks = getStudentMarks(
            s.id,
            selection.class,
            selection.section,
            selection.subject,
            selection.terminal,
          );
          initialMarks[s.id] = savedMarks ? savedMarks.obtainedMarks : "";
        } else {
          initialMarks[s.id] = "";
        }
      });
      setStudentMarks(initialMarks);
    }
  }, [selection]);

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

  const handleSaveMarksClick = () => {
    // Validation
    if (!selection.class || !selection.section || !selection.subject) {
      showToast("Please select class, section, and subject", "error");
      return;
    }

    if (!selection.terminal) {
      showToast("Terminal information is missing", "error");
      return;
    }

    // Check if at least one mark is entered
    const hasMarks = Object.values(studentMarks).some(
      (mark) => mark !== "" && mark !== null && mark !== undefined,
    );
    if (!hasMarks) {
      showToast(
        "Please enter marks for at least one student before saving",
        "error",
      );
      return;
    }

    // Show confirmation modal
    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    setShowConfirmModal(false);

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
      terminal: selection.terminal,
      totalMarks: totalMarks,
      academicYear: "2024-25",
    });

    if (result.success) {
      const dynamicMessage = `${result.message} for ${selection.subject} subject in ${selection.terminal} terminal`;
      showToast(dynamicMessage, "success");
      setMarksSaved(true);

      // Dispatch custom event to notify Results page to refresh data
      window.dispatchEvent(
        new CustomEvent("marksUpdated", {
          detail: {
            class: selection.class,
            section: selection.section,
            subject: selection.subject,
          },
        }),
      );
    } else {
      showToast(result.message, "error");
    }
  };

  const handleCancelSave = () => {
    setShowConfirmModal(false);
  };

  return (
    <section className="w-full pt-2 bg-white flex flex-col items-center">
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
          Terminal: <span className="font-normal">{selection.terminal}</span>
        </h2>
        <div className="flex items-center gap-2">
          <label className="text-white text-sm font-bold">Date:</label>
          <div className="text-white font-bold text-sm sm:text-base">
            {marksDate}
          </div>
        </div>
      </div>
      <div className=" w-full bg-white flex justify-between items-center items-center px-4">
        <TeacherSelector
          onSelectionChange={(newSelection) => setSelection(newSelection)}
        />
      </div>

      {/* TABLE */}
      <div className="w-full mt-6 px-4">
        <DataTable
          columns={[
            {
              header: "Roll No",
              key: "rollNumber",
              render: (student) => (
                <span className="font-medium">{student.rollNumber}</span>
              ),
            },
            {
              header: "Student Name",
              key: "fullName",
              render: (student) => (
                <span className="font-semibold">{student.fullName}</span>
              ),
            },
            {
              header: `Total Marks`,
              render: (student) => (
                <div className="flex items-center">
                  <span className="font-semibold">{totalMarks}</span>
                </div>
              ),
            },
            {
              header: `Obtained Marks`,
              render: (student) => (
                <div className="flex items-center ">
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
                </div>
              ),
            },
            {
              header: `Grade`,
              render: (student) => {
                const obtained = studentMarks[student.id];
                const percentage = calculatePercentage(obtained, totalMarks);
                const grade = getGrade(percentage);
                return (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">
                      {obtained !== "" ? grade : "-"}
                    </span>
                  </div>
                );
              },
            },
            {
              header: `Status`,
              render: (student) => {
                const obtained = studentMarks[student.id];
                const percentage = calculatePercentage(obtained, totalMarks);
                const status = getStatus(percentage);
                return (
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${status === "Pass" ? "text-green-600" : "text-red-600"}`}
                    >
                      {obtained !== "" ? status : "-"}
                    </span>
                  </div>
                );
              },
            },
          ]}
          data={filteredStudents}
          emptyMessage="Select a class and section to add marks."
          renderMobileCard={(student) => {
            const obtained = studentMarks[student.id];
            const percentage = calculatePercentage(obtained, totalMarks);
            const grade = getGrade(percentage);
            const status = getStatus(percentage);
            return (
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">
                    Roll No: {student.rollNumber}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {student.fullName}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
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
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-800">
                    Grade: {obtained !== "" ? grade : "-"}
                  </span>
                  <span
                    className={`font-semibold ${status === "Pass" ? "text-green-600" : "text-red-600"}`}
                  >
                    Status: {obtained !== "" ? status : "-"}
                  </span>
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Action Button */}
      {filteredStudents.length > 0 && (
        <div className="w-full flex justify-end mt-6  px-4">
          <Button
            variant="primary"
            className="w-full max-w-[150px] py-1 shadow-md"
            icon={<FaSave />}
            onClick={handleSaveMarksClick}
          >
            Save Marks
          </Button>
        </div>
      )}

      {/* Fixed Info Footer */}
      {/* <footer
        className="w-full max-w-5xl px-8 mt-20 py-4 flex fixed bottom-0 justify-between items-center text-white text-sm sm:text-base font-bold z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] rounded-t-2xl"
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
        </div> */}
      {/* </footer> */}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCancelSave}
        onConfirm={handleConfirmSave}
        title="Confirm Save Marks"
        message={`Are you sure you want to save marks for ${selection.subject} subject in ${selection.terminal} terminal? This will update the marks for all students with entered values.`}
      />
    </section>
  );
};

export default AddMarks;
