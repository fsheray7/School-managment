import React, { useEffect, useState } from "react";
import {
  FaCheckDouble,
  FaClipboardList,
  FaTrophy,
  FaRegClock,
  FaLightbulb,
  FaQuestionCircle,
  FaBell,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedStudent = localStorage.getItem("currentStudent");
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!student) return null;

  // --- MOCK DATA ---
  const stats = [
    {
      title: "Attendance",
      value: "92%",
      subtitle: "2 Days Absent",
      icon: <FaCheckDouble size={24} className="text-white" />,
      color: "bg-blue-600",
      link: "/attendance-student",
    },
    {
      title: "Homework",
      value: "5",
      subtitle: "Assigned",
      icon: <FaClipboardList size={24} className="text-white" />,
      color: "bg-yellow-500",
      link: "/homework-student",
    },
    {
      title: "Average",
      value: "92%",
      subtitle: "Last Term",
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

  const recentHomework = [
    {
      id: 1,
      subject: "Science",
      title: "Chapter 2 - Cells and Organisms",
      date: "Today",
      status: "Pending",
      statusColor: "text-orange-500",
    },
    {
      id: 2,
      subject: "Mathematics",
      title: "Algebraic Expressions",
      date: "Apr 25",
      status: "Overdue",
      statusColor: "text-red-500",
    },
    {
      id: 3,
      subject: "English",
      title: "Essay on Social Media Impact",
      date: "Apr 26",
      status: "Submitted",
      statusColor: "text-blue-500",
    },
    {
      id: 4,
      subject: "History",
      title: "Causes of World War I",
      date: "Apr 28",
      status: "Submitted",
      statusColor: "text-green-500",
    },
  ];

  const resultsData = [
    { name: "Mathematics", value: 95, color: "#1e40af" },
    { name: "Science", value: 93, color: "#2563eb" },
    { name: "English", value: 90, color: "#0d9488" },
    { name: "Social Studies", value: 92, color: "#ca8a04" },
    { name: "History", value: 88, color: "#059669" },
  ];

  const upcomingExams = [
    {
      subject: "Mathematics",
      topic: "Unit 3 - Quadratic Equations",
      date: "Tue, Apr 30",
      color: "text-yellow-500",
    },
    {
      subject: "Science",
      topic: "Chapter 5 - Ecosystems",
      date: "Fri, May 3",
      color: "text-yellow-500",
    },
  ];

  const latestQuizzes = [
    {
      title: "English - Grammar Quiz",
      date: "Apr 20",
      score: "18/20",
      icon: <FaTrophy className="text-blue-600" />,
    },
    {
      title: "History - WWI Quiz",
      date: "Apr 15",
      score: "20/20",
      icon: <FaTrophy className="text-yellow-500" />,
    },
  ];

  return (
    <section className="flex flex-col w-full bg-[#f3f4f6] min-h-screen pt-20 pb-10 px-4 sm:px-8 gap-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome back, {student.fullName.split(" ")[0]}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Build your future with every lesson.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-full shadow-sm text-gray-400">
            <FaSearch />
          </div>
          <div className="bg-white p-2 rounded-full shadow-sm text-gray-400 relative">
            <FaBell />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            to={stat.link}
            key={index}
            className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color} shadow-lg`}
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
            <div className="text-2xl font-black text-gray-800">
              {stat.value}
            </div>
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
              {recentHomework.map((hw) => (
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
                      {hw.status === "Pending" || hw.status === "Overdue" ? (
                        <FaRegClock />
                      ) : (
                        <FaCheckDouble />
                      )}
                      {hw.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* UPCOMING EXAMS */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Upcoming Exams
              </h2>
              <div className="flex flex-col gap-4">
                {upcomingExams.map((exam, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="flex items-start gap-3">
                      <FaBell className={`${exam.color} mt-1`} />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">
                          {exam.subject}
                        </h4>
                        <p className="text-xs text-gray-400">{exam.topic}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-500">
                      {exam.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* LATEST QUIZZES */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Latest Quizzes
              </h2>
              <div className="flex flex-col gap-4">
                {latestQuizzes.map((quiz, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      {quiz.icon}
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">
                          {quiz.title}
                        </h4>
                        <p className="text-xs text-gray-400">{quiz.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-blue-900 text-sm">
                        {quiz.score}
                      </span>
                      <span className="text-[10px] text-gray-400">Score</span>
                    </div>
                  </div>
                ))}
              </div>
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
                  92%
                </span>
                <span className="text-xs text-gray-400 font-bold uppercase">
                  Average
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">Total Courses: 5</p>
          </div>

          <div className="flex flex-col gap-3">
            {resultsData.map((result, idx) => (
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
                        width: `${result.value}%`,
                        backgroundColor: result.color,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-8 text-right">
                    {result.value}
                  </span>
                </div>
              </div>
            ))}
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
    </section>
  );
};

export default StudentDashboard;
