import React, { useState, useEffect } from "react";
import { FaEye, FaPrint, FaCheck } from "react-icons/fa";
import Button from "../../components/ui/Button";
import TeacherSelector from "../../components/teacher/TeacherSelector";
import DataTable from "../../components/ui/DataTable";
import studentsData from "../../data/admindata/students/students";
import {
  getClassMarks,
  submitResultsForPromotion,
} from "../../utils/marksManager";
import ResultPreviewModal from "../../components/ui/ResultPreviewModal";
import ActionButtons from "../../components/ui/ActionButtons";
import PreviewModal from "../../components/ui/PreviewModal";
import { useToast } from "../../context/ToastContext";
import { useTeacher } from "../../context/TeacherContext";

const Results = () => {
  const [selection, setSelection] = useState({
    class: "",
    section: "",
    subject: "",
  });

  const { showToast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentsWithMarks, setStudentsWithMarks] = useState([]);
  const { currentTeacher } = useTeacher();

  // useEffect(() => {
  //   // Teacher is now available via context
  // }, []);

  // Two separate modal states
  const [showPreviewModal, setShowPreviewModal] = useState(false); // For all students (Result Cards)
  const [showResultModal, setShowResultModal] = useState(false); // For single student (View button)

  /* ================= GRADE SYSTEM ================= */
  const calculateGrade = (percentage) => {
    if (percentage >= 80) return "A+";
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };

  /* ================= DATA BUILDER ================= */
  const buildResultsData = (classValue, sectionValue, subjectValue) => {
    const classMarks = getClassMarks(classValue, sectionValue);

    const filteredStudents = studentsData.filter(
      (s) => s.class === classValue && s.section === sectionValue,
    );

    return filteredStudents.map((student) => {
      const first = classMarks.find(
        (m) =>
          Number(m.studentId) === Number(student.id) &&
          m.subject === subjectValue &&
          m.terminal?.trim() === "First Terminal",
      );

      const second = classMarks.find(
        (m) =>
          Number(m.studentId) === Number(student.id) &&
          m.subject === subjectValue &&
          m.terminal?.trim() === "Second Terminal",
      );

      const firstObtained = first ? Number(first.obtainedMarks) : 0;
      const firstTotal = first ? Number(first.totalMarks ?? 100) : 0;

      const secondObtained = second ? Number(second.obtainedMarks) : 0;
      const secondTotal = second ? Number(second.totalMarks ?? 100) : 0;

      const overallObtained = firstObtained + secondObtained;
      const overallTotal = firstTotal + secondTotal;

      const overallPercentage =
        overallTotal > 0
          ? Number(((overallObtained / overallTotal) * 100).toFixed(2))
          : 0;

      const overallGrade =
        overallTotal > 0 ? calculateGrade(overallPercentage) : "-";

      const overallStatus =
        overallTotal > 0 ? (overallPercentage >= 40 ? "Pass" : "Fail") : "-";

      return {
        ...student,
        subject: subjectValue,

        /* ===== FIRST TERM ===== */
        firstTerminalMarks: first ? firstObtained : "-",
        firstTerminalGrade: first ? first.grade : "-",
        firstTerminalStatus: first ? first.status : "-",
        firstTerminalTotal: first ? firstTotal : "-",

        /* ===== SECOND TERM ===== */
        secondTerminalMarks: second ? secondObtained : "-",
        secondTerminalGrade: second ? second.grade : "-",
        secondTerminalStatus: second ? second.status : "-",
        secondTerminalTotal: second ? secondTotal : "-",

        /* ===== OVERALL ===== */
        overallObtained,
        overallTotal,
        overallPercentage,
        overallGrade,
        overallStatus,
        final: overallTotal > 0 ? `${overallObtained} / ${overallTotal}` : "-",
      };
    });
  };

  /* ================= HELPER FUNCTIONS ================= */
  const formatStudentResult = (student) => ({
    // Basic Info
    id: student.id,
    studentId: student.id,
    name: student.fullName,
    rollNo: student.rollNumber,
    class: student.class,
    section: student.section,
    fatherName: student.guardianName || "N/A",
    photo: student.profileImage || null,
    subject: student.subject,

    // First Term Details
    firstTerm: {
      obtained:
        student.firstTerminalMarks !== "-" ? student.firstTerminalMarks : 0,
      total:
        student.firstTerminalTotal !== "-" ? student.firstTerminalTotal : 100,
      grade:
        student.firstTerminalGrade !== "-" ? student.firstTerminalGrade : "N/A",
      status:
        student.firstTerminalStatus !== "-"
          ? student.firstTerminalStatus
          : "N/A",
    },

    // Second Term Details
    secondTerm: {
      obtained:
        student.secondTerminalMarks !== "-" ? student.secondTerminalMarks : 0,
      total:
        student.secondTerminalTotal !== "-" ? student.secondTerminalTotal : 100,
      grade:
        student.secondTerminalGrade !== "-"
          ? student.secondTerminalGrade
          : "N/A",
      status:
        student.secondTerminalStatus !== "-"
          ? student.secondTerminalStatus
          : "N/A",
    },

    // Subjects Array for Table Display
    subjects: [
      {
        id: 1,
        name: student.subject,
        total:
          Number(
            student.firstTerminalTotal !== "-"
              ? student.firstTerminalTotal
              : 100,
          ) +
          Number(
            student.secondTerminalTotal !== "-"
              ? student.secondTerminalTotal
              : 100,
          ),
        obtained:
          Number(
            student.firstTerminalMarks !== "-" ? student.firstTerminalMarks : 0,
          ) +
          Number(
            student.secondTerminalMarks !== "-"
              ? student.secondTerminalMarks
              : 0,
          ),
        firstTermObtained:
          student.firstTerminalMarks !== "-" ? student.firstTerminalMarks : 0,
        firstTermTotal:
          student.firstTerminalTotal !== "-" ? student.firstTerminalTotal : 100,
        secondTermObtained:
          student.secondTerminalMarks !== "-" ? student.secondTerminalMarks : 0,
        secondTermTotal:
          student.secondTerminalTotal !== "-"
            ? student.secondTerminalTotal
            : 100,
        grade: student.overallGrade,
        percentage: student.overallPercentage,
        status: student.overallStatus,
      },
    ],

    // Overall Performance
    totals: student.overallTotal || 0,
    obtainedTotal: student.overallObtained || 0,
    percentage: student.overallPercentage || 0,
    grade: student.overallGrade || "N/A",
    result: student.overallStatus || "N/A",
    remarks:
      student.overallStatus === "Pass"
        ? "Excellent performance! Promoted to next class."
        : "Needs improvement. Focus on weak areas.",

    // Term-wise Summary (for detailed view)
    termSummary: {
      firstTerm: {
        obtained: Number(
          student.firstTerminalMarks !== "-" ? student.firstTerminalMarks : 0,
        ),
        total: Number(
          student.firstTerminalTotal !== "-" ? student.firstTerminalTotal : 100,
        ),
        percentage:
          student.firstTerminalMarks !== "-" &&
          student.firstTerminalTotal !== "-"
            ? (
                (Number(student.firstTerminalMarks) /
                  Number(student.firstTerminalTotal)) *
                100
              ).toFixed(1)
            : 0,
        grade:
          student.firstTerminalGrade !== "-"
            ? student.firstTerminalGrade
            : "N/A",
        status:
          student.firstTerminalStatus !== "-"
            ? student.firstTerminalStatus
            : "N/A",
      },
      secondTerm: {
        obtained: Number(
          student.secondTerminalMarks !== "-" ? student.secondTerminalMarks : 0,
        ),
        total: Number(
          student.secondTerminalTotal !== "-"
            ? student.secondTerminalTotal
            : 100,
        ),
        percentage:
          student.secondTerminalMarks !== "-" &&
          student.secondTerminalTotal !== "-"
            ? (
                (Number(student.secondTerminalMarks) /
                  Number(student.secondTerminalTotal)) *
                100
              ).toFixed(1)
            : 0,
        grade:
          student.secondTerminalGrade !== "-"
            ? student.secondTerminalGrade
            : "N/A",
        status:
          student.secondTerminalStatus !== "-"
            ? student.secondTerminalStatus
            : "N/A",
      },
    },
  });

  // Format for PreviewModal (All Students - Simple Table View)
  const formatForPreviewModal = (student) => ({
    rollNumber: student.rollNumber,
    fullName: student.fullName,
    subject: student.subject,
    firstTerminalMarks: student.firstTerminalMarks,
    firstTerminalTotal: student.firstTerminalTotal,
    secondTerminalMarks: student.secondTerminalMarks,
    secondTerminalTotal: student.secondTerminalTotal,
    final: student.final,
    overallPercentage: student.overallPercentage,
    overallGrade: student.overallGrade,
    overallStatus: student.overallStatus,
  });

  // Handle View Single Student - Opens ResultPreviewModal
  const handleViewSingleStudent = (student) => {
    setSelectedStudent(formatStudentResult(student));
    setShowResultModal(true);
  };

  // Handle View All Students - Opens PreviewModal
  const handleViewAllStudents = () => {
    setShowPreviewModal(true);
  };

  const handleSubmitForPromotion = () => {
    if (studentsWithMarks.length === 0) {
      showToast("No results to submit.", "error");
      return;
    }

    const result = submitResultsForPromotion({
      results: studentsWithMarks,
      class: selection.class,
      section: selection.section,
      subject: selection.subject,
    });

    if (result.success) {
      showToast(result.message, "success");
    } else {
      showToast(result.message, "error");
    }
  };

  /* ================= MAIN EFFECT ================= */
  useEffect(() => {
    if (selection.class && selection.section && selection.subject) {
      const results = buildResultsData(
        selection.class,
        selection.section,
        selection.subject,
      );
      setStudentsWithMarks(results);
    } else {
      setStudentsWithMarks([]);
    }
  }, [selection]);

  /* ================= UPDATE LISTENER ================= */
  useEffect(() => {
    const handleMarksUpdate = (event) => {
      const { class: c, section: s, subject: sub } = event.detail;

      if (
        selection.class === c &&
        selection.section === s &&
        selection.subject === sub
      ) {
        const results = buildResultsData(c, s, sub);
        setStudentsWithMarks(results);
      }
    };

    window.addEventListener("marksUpdated", handleMarksUpdate);
    return () => window.removeEventListener("marksUpdated", handleMarksUpdate);
  }, [selection]);

  return (
    <>
      <section className="w-full bg-white flex flex-col px-4 items-center">
        <TeacherSelector
          onSelectionChange={(newSelection) => setSelection(newSelection)}
        />

        {/* ================= HEADER ACTIONS ================= */}
        {studentsWithMarks.length > 0 && (
          <div className="flex gap-3 mt-4 w-full flex justify-end items-center">
            <Button
              onClick={handleSubmitForPromotion}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaCheck /> Submit Results
            </Button>
            <Button
              onClick={handleViewAllStudents} // Opens PreviewModal
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaPrint /> Result Cards
            </Button>
          </div>
        )}

        <div className="w-full mt-6">
          <DataTable
            renderActions={(student) => (
              <ActionButtons
                onView={() => handleViewSingleStudent(student)} // Opens ResultPreviewModal
              />
            )}
            columns={[
              { header: "Roll No", key: "rollNumber" },
              { header: "Student", key: "fullName" },
              { header: "Subject", key: "subject" },

              {
                header: "First Terminal",
                children: [
                  { header: "Obtained", key: "firstTerminalMarks" },
                  { header: "Grade", key: "firstTerminalGrade" },
                  { header: "Status", key: "firstTerminalStatus" },
                  { header: "Total", key: "firstTerminalTotal" },
                ],
              },

              {
                header: "Second Terminal",
                children: [
                  { header: "Obtained", key: "secondTerminalMarks" },
                  { header: "Grade", key: "secondTerminalGrade" },
                  { header: "Status", key: "secondTerminalStatus" },
                  { header: "Total", key: "secondTerminalTotal" },
                ],
              },

              { header: "Overall", key: "final" },
              { header: "Percentage", key: "overallPercentage" },
              { header: "Grade", key: "overallGrade" },
              { header: "Result", key: "overallStatus" },
            ]}
            data={studentsWithMarks}
            emptyMessage="Select class, section, and subject to view results."
            renderMobileCard={(student) => (
              <div className="bg-white border flex justify-between items-center rounded-lg p-3 shadow-sm">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {student.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Roll No: {student.rollNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    Overall: {student.final}
                  </p>
                  <p className="text-sm text-gray-600">
                    Percentage: {student.overallPercentage}%
                  </p>
                </div>
                <div className="text-right mr-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      student.overallStatus === "Pass"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.overallStatus}
                  </span>
                  <p className="text-sm text-gray-700 mt-1">
                    Grade: {student.overallGrade}
                  </p>
                </div>
                <Button
                  onClick={() => handleViewSingleStudent(student)}
                  variant="ghost"
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <FaEye size={18} />
                </Button>
              </div>
            )}
          />
        </div>
      </section>

      {/* ================= PREVIEW MODAL - ALL STUDENTS (Result Cards Button) ================= */}
      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Student Result Cards"
        data={
          studentsWithMarks?.map((student) => formatForPreviewModal(student)) ||
          []
        }
        columns={[
          { header: "Roll No", key: "rollNumber" },
          { header: "Name", key: "fullName" },
          { header: "Subject", key: "subject" },
          { header: "1st Term", key: "firstTerminalMarks" },
          { header: "2nd Term", key: "secondTerminalMarks" },
          { header: "Overall", key: "final" },
          { header: "Percentage", key: "overallPercentage" },
          { header: "Grade", key: "overallGrade" },
          {
            header: "Result",
            render: (row) => (
              <span
                className={
                  row?.overallStatus === "Pass"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {row?.overallStatus || "-"}
              </span>
            ),
          },
        ]}
        headerInfo={
          selection?.class
            ? {
                title: "School Name",
                subtitle: "Student Results Summary",
                details: [
                  { label: "Class", value: selection.class },
                  { label: "Section", value: selection.section },
                  { label: "Subject", value: selection.subject },
                  { label: "Class Teacher", value: currentTeacher?.fullName },
                  {
                    label: "Total Students",
                    value: studentsWithMarks?.length || 0,
                  },
                ],
              }
            : null
        }
        footerText="This is a computer generated result summary."
        onPrint={() => window.print()}
      />

      {/* ================= RESULT PREVIEW MODAL - SINGLE STUDENT (View Button) ================= */}
      <ResultPreviewModal
        isOpen={showResultModal}
        onClose={() => {
          setShowResultModal(false);
          setSelectedStudent(null);
        }}
        studentsResults={selectedStudent ? [selectedStudent] : []}
      />
    </>
  );
};

export default Results;
