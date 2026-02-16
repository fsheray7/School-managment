import React, { useEffect, useState } from "react";
import {
  FaCheckDouble,
  FaClipboardList,
  FaTrophy,
  FaRegClock,
  FaLightbulb,
  FaBell,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { getNoticesForUser } from "../../utils/noticeManager";
import NoticePreviewModal from "../../components/common/NoticePreviewModal";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [resultsData, setResultsData] = useState([]);
  const [averagePercentage, setAveragePercentage] = useState(0);
  const [recentHomework, setRecentHomework] = useState([]);
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const storedStudent = localStorage.getItem("currentStudent");
    if (storedStudent) {
      const studentData = JSON.parse(storedStudent);
      setStudent(studentData);

      // --- HOMEWORK LOGIC ---
      const allHomework =
        JSON.parse(localStorage.getItem("homeworkData")) || [];
      const relevantHomework = allHomework.filter(
        (hw) =>
          hw.class === studentData.class && hw.section === studentData.section,
      );
      relevantHomework.sort((a, b) => new Date(b.date) - new Date(a.date));
      const topHomework = relevantHomework.slice(0, 5).map((hw) => ({
        ...hw,
        title: hw.description
          ? hw.description.length > 30
            ? hw.description.substring(0, 30) + "..."
            : hw.description
          : "No Description",
        status: "Assigned",
        statusColor: "text-blue-500",
      }));
      setRecentHomework(topHomework);

      // --- RESULTS LOGIC ---
      const allMarks = JSON.parse(localStorage.getItem("studentMarks")) || [];
      const myMarks = allMarks.filter((m) => m.studentId === studentData.id);

      // Determine latest terminal (Simple logic: If Second exists, use it; else First)
      const secondTermMarks = myMarks.filter(
        (m) => m.terminal === "Second Terminal",
      );
      const firstTermMarks = myMarks.filter(
        (m) => m.terminal === "First Terminal",
      );

      const targetMarks =
        secondTermMarks.length > 0 ? secondTermMarks : firstTermMarks;

      if (targetMarks.length > 0) {
        let totalObtained = 0;
        let totalMax = 0;

        const subjectsData = targetMarks.map((m) => {
          const obt = parseInt(m.obtainedMarks) || 0;
          const max = parseInt(m.totalMarks) || 100;
          totalObtained += obt;
          totalMax += max;

          // Generate a color based on subject name or random
          const colors = [
            "#1e40af",
            "#2563eb",
            "#0d9488",
            "#ca8a04",
            "#059669",
            "#7c3aed",
            "#db2777",
          ];
          const colorIndex = m.subject.length % colors.length;

          return {
            name: m.subject,
            value: obt, // Displaying obtained marks, could be percentage
            maxValue: max,
            color: colors[colorIndex],
          };
        });

        setResultsData(subjectsData);
        const avg =
          totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(0) : 0;
        setAveragePercentage(avg);
      }

      // --- NOTICE LOGIC ---
      const activeNotices = getNoticesForUser(
        "student",
        studentData.class,
        studentData.section,
      );
      setNotices(activeNotices.slice(0, 5));

      // Show welcome toast
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  if (!student) return null;

  // --- MOCK DATA ---
  const stats = [
    {
      title: "Attendance",
      value: "92%", // Todo: Make real if needed
      subtitle: "2 Days Absent",
      icon: <FaCheckDouble size={24} className="text-white" />,
      color: "bg-blue-600",
      link: "/attendance-student",
    },
    {
      title: "Homework",
      value: recentHomework.length.toString(),
      subtitle: "Assigned",
      icon: <FaClipboardList size={24} className="text-white" />,
      color: "bg-yellow-500",
      link: "/homework-student",
    },
    {
      title: "Average",
      value: `${averagePercentage}%`,
      subtitle: resultsData.length > 0 ? "Last Term" : "No Data",
      icon: <FaTrophy size={24} className="text-white" />,
      color: "bg-indigo-600",
      link: "/results-student",
    },
    {
      title: "Routine",
      value: "Exam",
      subtitle: "View Schedule",
      icon: <FaRegClock size={24} className="text-white" />,
      color: "bg-gray-500",
      link: "/exam-routine-student",
    },
  ];

  return (
    <section className="flex flex-col w-full bg-[#f3f4f6] min-h-screen px-4 pt-4 gap-8">
      {/* WELCOME TOAST / HEADER */}
      <div className="relative min-h-[80px]">
        {showWelcome ? (
          <div className="absolute inset-0 bg-blue-600 rounded-2xl p-6 flex items-center justify-between text-white shadow-xl animate-fade-in-down transition-all duration-500 overflow-hidden">
            <div className="flex flex-col gap-1 z-10">
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-3">
                Welcome back, {student.fullName.split(" ")[0]}!
                <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm font-medium tracking-wide">
                Ready to continue your learning journey today?
              </p>
            </div>
            <div className="hidden sm:block opacity-20 transform rotate-12 -mr-8">
              <FaLightbulb size={120} />
            </div>
            {/* Dynamic background pulse */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in transition-all duration-500">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Explore Your Details
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Everything you need to succeed, all in one place.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            to={stat.link}
            key={index}
            className="bg-white rounded-lg px-4 py-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.color} shadow-lg`}
              >
                {stat.icon}
              </div>
              <div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                  {stat.title}
                </h3>
                <p className="text-gray-400 text-[10px] font-medium">
                  {stat.subtitle}
                </p>
              </div>
            </div>
            <div className="text-xl font-black text-gray-800">{stat.value}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* RECENT HOMEWORK */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Homework
              </h2>
              <Link
                to="/homework-student"
                className="text-blue-600 text-sm font-bold hover:underline"
              >
                View All &gt;
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {recentHomework.length === 0 ? (
                <p className="text-gray-400 italic text-center py-4">
                  No recent homework found.
                </p>
              ) : (
                recentHomework.map((hw) => (
                  <div
                    key={hw.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="mt-1 text-gray-400">
                        <FaClipboardList />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">
                          {hw.subject}
                        </p>
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                          {hw.title}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <span
                        className={`text-xs font-bold ${hw.statusColor} flex items-center gap-1`}
                      >
                        <FaRegClock />
                        {hw.date}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ACTIVE NOTICES */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Active Notices
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {notices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <FaBell size={40} className="mb-4 opacity-20" />
                  <p className="italic">No active notices for you.</p>
                </div>
              ) : (
                notices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => handleNoticeClick(notice)}
                    className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all cursor-pointer group border border-transparent hover:border-blue-100"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-1 p-2 rounded-lg ${
                          notice.isImportant
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <FaBell />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm group-hover:text-blue-700 transition-colors">
                          {notice.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                          <FaCalendarAlt size={10} />
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {notice.isImportant && (
                      <span className="text-[9px] font-black bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Important
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - RESULTS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Results Overview
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center mb-8 relative">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resultsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {resultsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Centered Stats */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="block text-3xl font-black text-gray-800">
                  {averagePercentage}%
                </span>
                <span className="text-xs text-gray-400 font-bold uppercase">
                  Average
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Total Courses: {resultsData.length}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {resultsData.length === 0 ? (
              <p className="text-gray-400 text-center">
                No results available yet.
              </p>
            ) : (
              resultsData.map((result, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: result.color }}
                    ></span>
                    <span className="text-sm font-medium text-gray-600">
                      {result.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 w-1/2">
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(result.value / result.maxValue) * 100}%`,
                          backgroundColor: result.color,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-800 w-8 text-right">
                      {result.value}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-auto pt-8">
            <Link to="/results-student">
              <button className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-200">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
      <NoticePreviewModal
        notice={selectedNotice}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default StudentDashboard;
