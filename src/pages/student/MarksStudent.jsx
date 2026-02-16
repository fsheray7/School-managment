import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaPrint, FaDownload } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";

const MarksStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { terminal } = location.state || { terminal: "First Terminal" }; // Default or handle missing state

  const [student, setStudent] = useState(null);
  const [resultData, setResultData] = useState([]);
  const [summary, setSummary] = useState({
    totalObtained: 0,
    totalMax: 0,
    percentage: 0,
    grade: "",
  });

  useEffect(() => {
    const storedStudent = localStorage.getItem("currentStudent");
    if (storedStudent) {
      const studentData = JSON.parse(storedStudent);
      setStudent(studentData);

      // Fetch Marks Data
      // marksData structure (confirmed from marksManager):
      // [ { studentId, rollNumber, fullName, class, section, subject, terminal, totalMarks, obtainedMarks, percentage, grade, status, academicYear, savedAt }, ... ]
      const allMarks = JSON.parse(localStorage.getItem("studentMarks")) || [];

      // Filter for this student, class, section, and terminal
      const relevantMarks = allMarks.filter(
        (record) =>
          record.studentId === studentData.id &&
          record.terminal === terminal &&
          record.class === studentData.class &&
          record.section === studentData.section,
      );

      // Process data for UI
      let totalObtained = 0;
      let totalMax = 0;

      const processedData = relevantMarks.map((record) => {
        const obtained = parseInt(record.obtainedMarks, 10) || 0;
        const max = parseInt(record.totalMarks, 10) || 100;
        totalObtained += obtained;
        totalMax += max;

        return {
          subject: record.subject,
          obtained: obtained,
          max: max,
          percentage: max > 0 ? ((obtained / max) * 100).toFixed(2) : "0.00",
          passed: record.status === "Pass", // Use saved status
        };
      });

      setResultData(processedData);

      // Calculate Summary
      const percentage =
        totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : 0;
      let grade = "F";
      if (percentage >= 90) grade = "A+";
      else if (percentage >= 80) grade = "A";
      else if (percentage >= 70) grade = "B";
      else if (percentage >= 60) grade = "C";
      else if (percentage >= 50) grade = "D";
      else if (percentage >= 40) grade = "E";

      setSummary({
        totalObtained,
        totalMax,
        percentage,
        grade,
      });
    } else {
      navigate("/");
    }
  }, [navigate, terminal]);

  if (!student) return null;

  return (
    <section className="w-full bg-[#f3f4f6] min-h-screen pt-4 pb-10 flex flex-col items-center gap-6 px-4">
      {/* HEADER BAR */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to="/results-student"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {terminal} Result
            </h1>
            <p className="text-sm text-gray-500">Academic Year 2024-2025</p>
          </div>
        </div>
        <Button variant="outline" className="hidden sm:flex items-center gap-2">
          <FaPrint /> Print Result
        </Button>
      </div>

      {/* STUDENT INFO CARD */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-gray-400 uppercase">
            Student Name
          </span>
          <span className="font-bold text-gray-800 text-lg">
            {student.fullName}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-gray-400 uppercase">
            Roll Number
          </span>
          <span className="font-bold text-gray-800 text-lg">
            {student.rollNumber}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-gray-400 uppercase">
            Class / Section
          </span>
          <span className="font-bold text-gray-800 text-lg">
            {student.class} - {student.section}
          </span>
        </div>
      </div>

      {/* RESULTS TABLE */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg">Detailed Marks</h3>
          <span className="text-sm text-blue-100 font-medium">
            Core Subjects
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4 text-center">Max Marks</th>
                <th className="px-6 py-4 text-center">Obtained</th>
                <th className="px-6 py-4 text-center">Percentage</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {resultData.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-400 italic"
                  >
                    No marks found for this terminal.
                  </td>
                </tr>
              ) : (
                resultData.map((result, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-700">
                      {result.subject}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500">
                      {result.max}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-800">
                      {result.obtained}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-800">
                      {result.percentage}%
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${result.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {result.passed ? "PASS" : "FAIL"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* Footer Row for Total */}
            {resultData.length > 0 && (
              <tfoot className="bg-gray-50 border-t border-gray-200">
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-800 text-right">
                    TOTAL
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-800">
                    {summary.totalMax}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-blue-700 text-lg">
                    {summary.totalObtained}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-blue-700 text-lg">
                    {summary.percentage}%
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      {resultData.length > 0 && (
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-gray-800">
              {summary.percentage}%
            </span>
            <span className="text-xs text-gray-400 uppercase font-bold">
              Percentage
            </span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-gray-800">
              {summary.grade}
            </span>
            <span className="text-xs text-gray-400 uppercase font-bold">
              Grade
            </span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-gray-800">
              {resultData.filter((r) => r.passed).length}
            </span>
            <span className="text-xs text-gray-400 uppercase font-bold">
              Subjects Passed
            </span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-gray-800">
              {resultData.filter((r) => !r.passed).length}
            </span>
            <span className="text-xs text-gray-400 uppercase font-bold">
              Subjects Failed
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarksStudent;
