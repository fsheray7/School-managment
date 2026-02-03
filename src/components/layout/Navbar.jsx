import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import {
  IoCheckmarkDoneSharp,
  IoAlertCircleSharp,
  IoInformationCircleSharp,
} from "react-icons/io5";
import { useSettings } from "../../context/SettingsContext";

const Navbar = ({ onToggleSidebar, isSidebarOpen, role = "admin" }) => {
  const { schoolLogo } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "New Student Enrolled",
      time: "2 mins ago",
      type: "success",
      icon: <IoCheckmarkDoneSharp className="text-green-500" />,
    },
    {
      id: 2,
      title: "Teacher Meeting @ 3PM",
      time: "1 hour ago",
      type: "info",
      icon: <IoInformationCircleSharp className="text-blue-500" />,
    },
    {
      id: 3,
      title: "Exam Results Pending",
      time: "3 hours ago",
      type: "warning",
      icon: <IoAlertCircleSharp className="text-amber-500" />,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageTitles = {
    "/admin-dashboard": "Admin Dashboard",
    "/teachers": "Teachers",
    "/students": "Students",
    "/courses": "Courses",
    "/meetings": "Meetings",
    "/settings": "Settings",
    "/add-course": "Add Course",
    "/add-teacher": "Add Teacher",
    "/add-student": "Add Student",
    "/generate-fee": "Generate Fee",
    "/finance": "Finance",
    "/notice-admin": "Notice & Announcements",
    // Teacher Routes
    "/teacher-dashboard": "Teacher Dashboard",
    "/attendance": "Attendance",
    "/homework": "Homework",
    "/results": "Results",
    "/marks": "Add Marks",
    "/notice": "Notice",
    "/solutions": "Solutions",
    "/add-account": "Add Account",
    "/add-classes": "Add Classes",
    "/exam-routine": "Exam Routine",
    // Student Routes
    "/student-dashboard": "Student Dashboard",
    "/attendance-student": "My Attendance",
    "/homework-student": "My Homework",
    "/results-student": "My Results",
    "/marks-student": "My Marks",
    "/questions": "Solutions",
    "/ask-question": "Ask Question",
    "/answer": "Answers",
    "/exam-routine-student": "Exam Routine",
    "/quiz": "Quiz List",
    "/quizoptions": "Quiz Options",
    "/quiz-multiple-options": "Multiple Choice Quiz",
    "/quiz-score": "Quiz Result",
    "/student-profile": "My Profile",
    "/generate-fee": "Generate Fee",
  };

  const currentTitle =
    pageTitles[location.pathname] ||
    (role === "admin"
      ? "Admin Dashboard"
      : role === "teacher"
        ? "Teacher Dashboard"
        : "Student Dashboard");

  const roleNames = {
    admin: "Admin",
    teacher: "Teacher",
    student: "Student",
  };

  const currentUserName = roleNames[role] || "User";

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-40 transition-all duration-300 lg:left-64 flex items-center px-4 lg:px-6 justify-between">
      {/* Left Side: Hamburger (mobile), Logo, Title */}
      <div className="flex items-center gap-3">
        {/* Animated Hamburger Toggle Button - Only visible on small screens */}
        <button
          id="hamburger-button"
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden transition-colors relative w-10 h-10 flex items-center justify-center"
          aria-label="Toggle Sidebar"
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            {/* Top bar */}
            <span
              className={`block h-0.5 w-full rounded-full transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
              style={{ backgroundColor: "var(--primary-color)" }}
            ></span>
            {/* Middle bar */}
            <span
              className={`block h-0.5 w-full rounded-full transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "opacity-0" : "opacity-100"
              }`}
              style={{ backgroundColor: "var(--primary-color)" }}
            ></span>
            {/* Bottom bar */}
            <span
              className={`block h-0.5 w-full rounded-full transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
              style={{ backgroundColor: "var(--primary-color)" }}
            ></span>
          </div>
        </button>

        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <h1
            className="text-xs md:text-2xl lg:text-2xl font-bold whitespace-nowrap"
            style={{ color: "var(--primary-color)" }}
          >
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Right Side: Notification and Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification Button */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className={`relative p-2 rounded-lg cursor-pointer transition-all duration-200 ${
              isNotificationOpen
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-label="Notifications"
          >
            <FaBell style={{ color: "var(--primary-color)" }} size={20} />
            {/* Notification Badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-3 w-52 sm:w-70 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden transform transition-all duration-200 origin-top-right">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-bold text-gray-800 text-sm">
                  Notifications
                </h3>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {notifications.length} New
                </span>
              </div>

              {/* List */}
              <div className="max-h-[350px] overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 flex gap-3 items-start"
                  >
                    <div className="mt-1">{notif.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 leading-tight">
                        {notif.title}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <button
                className="w-full py-2.5 text-xs font-bold transition-colors border-t border-gray-50 hover:bg-[var(--primary-color)]/10"
                style={{ color: "var(--primary-color)" }}
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile Button */}
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="flex items-center gap-2 p-1 sm:p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors   "
          aria-label="Profile"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 bg-gray-50 flex-shrink-0">
            <img
              src={schoolLogo}
              alt="Profile"
              className="p-1 w-full h-full object-contain"
            />
          </div>
          <span
            className="text-xs md:text-sm lg:text-base font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            {currentUserName}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
