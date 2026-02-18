import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaPrint, FaDownload } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import DataCard from "../../components/ui/DataCard";
import ActionButtons from "../../components/ui/ActionButtons";

const MarksStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { terminal } = location.state || { terminal: "First Terminal" };

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

      const allMarks = JSON.parse(localStorage.getItem("studentMarks")) || [];

      const relevantMarks = allMarks.filter(
        (record) =>
          record.studentId === studentData.id &&
          record.terminal === terminal &&
          record.class === studentData.class &&
          record.section === studentData.section,
      );

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
          passed: record.status === "Pass",
        };
      });

      setResultData(processedData);

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

  const columns = [
    { header: "Subject", key: "subject", fontBold: true },
    { header: "Max Marks", key: "max", className: "text-center" },
    {
      header: "Obtained",
      key: "obtained",
      className: "text-center font-bold text-gray-800",
    },
    {
      header: "Percentage",
      key: "percentage",
      className: "text-center font-bold text-gray-800",
      render: (r) => `${r.percentage}%`,
    },
    {
      header: "Status",
      key: "passed",
      className: "text-center",
      render: (r) => (
        <span
          className={`px-2 py-1 rounded text-xs font-bold ${r.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {r.passed ? "PASS" : "FAIL"}
        </span>
      ),
    },
  ];

  const renderMobileCard = (r) => (
    <DataCard
      title={r.subject}
      fields={[
        { label: "Max", value: r.max },
        { label: "Obtained", value: r.obtained },
        { label: "Percentage", value: `${r.percentage}%` },
        {
          label: "Status",
          value: r.passed ? "PASS" : "FAIL",
          render: (val) => (
            <span
              className={`font-bold ${val === "PASS" ? "text-green-600" : "text-red-600"}`}
            >
              {val}
            </span>
          ),
        },
      ]}
    />
  );

  if (!student) return null;

  return (
    <section className="w-full bg-[#f3f4f6] min-h-screen pt-4 pb-10 flex flex-col items-center gap-6 px-4">
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

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
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

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg">Detailed Marks</h3>
          <span className="text-sm text-blue-100 font-medium">
            Core Subjects
          </span>
        </div>

        <DataTable
          columns={columns}
          data={resultData}
          renderMobileCard={renderMobileCard}
          emptyMessage="No marks found for this terminal."
        />

        {resultData.length > 0 && (
          <div className="bg-gray-50 border-t border-gray-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-8 text-sm font-bold">
              <div className="flex flex-col">
                <span className="text-gray-400 uppercase text-[10px]">
                  Total Max
                </span>
                <span className="text-gray-800">{summary.totalMax}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 uppercase text-[10px]">
                  Total Obtained
                </span>
                <span className="text-blue-700 text-lg">
                  {summary.totalObtained}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 uppercase text-[10px]">
                  Aggregate
                </span>
                <span className="text-blue-700 text-lg">
                  {summary.percentage}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

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
