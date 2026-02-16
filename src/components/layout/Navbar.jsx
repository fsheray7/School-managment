import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { IoPersonSharp, IoLogOutOutline } from "react-icons/io5";
import { useSettings } from "../../context/SettingsContext";
import teachersData from "../../data/teachers/teacher";
import finalStudentsData from "../../data/admindata/students/students";
import {
  getStudentNotifications,
  getTeacherNotifications,
  getAdminNotifications,
} from "../../utils/notificationsManager.jsx";

const Navbar = ({ onToggleSidebar, isSidebarOpen, role = "admin" }) => {
  const { schoolLogo } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [readIds, setReadIds] = useState([]);

  // Load readIds from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("readNotificationIds");
    if (stored) {
      try {
        setReadIds(JSON.parse(stored));
      } catch (e) {
        setReadIds([]);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        if (isNotificationOpen) {
          // Sync read status when closing by clicking outside
          const stored = localStorage.getItem("readNotificationIds");
          if (stored) setReadIds(JSON.parse(stored));
        }
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
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
    "/classes": "Classes",
    "/add-class": "Add Class",
    "/student-promotion": "Student Promotion",
    // Teacher Routes
    "/teacher-dashboard": "Dashboard",
    "/add-attendance": "Add Attendance",
    "/homework": "Homework",
    "/results": "Results",
    "/marks": "Add Marks",
    "/notice": "Notice",
    "/solutions": "Solutions",

    "/exam-routine": "Exam Routine",
    "/attendance": "Attendance",
    // Student Routes
    "/student-dashboard": "Dashboard",
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

  const [currentUserName, setCurrentUserName] = useState(
    roleNames[role] || "User",
  );

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (role === "student") {
      const storedStudent = localStorage.getItem("currentStudent");
      if (storedStudent) {
        const sessionData = JSON.parse(storedStudent);
        const updatedStudent =
          finalStudentsData.find((s) => s.id === sessionData.id) || sessionData;
        setCurrentUserName(updatedStudent.fullName || "Student");
        setProfileImage(updatedStudent.profileImage || "");
        // Load student notifications
        setNotifications(getStudentNotifications(updatedStudent));
      }
    } else if (role === "teacher") {
      const storedTeacher = localStorage.getItem("currentTeacher");
      if (storedTeacher) {
        const sessionData = JSON.parse(storedTeacher);
        const updatedTeacher =
          teachersData.find((t) => t.id === sessionData.id) || sessionData;
        setCurrentUserName(updatedTeacher.fullName || "Teacher");
        setProfileImage(updatedTeacher.profileImage || "");
        // Load teacher notifications
        setNotifications(getTeacherNotifications(updatedTeacher));
      }
    } else {
      setCurrentUserName(roleNames[role] || "Admin");
      setProfileImage("");
      // Load admin notifications
      setNotifications(getAdminNotifications());
    }
  }, [role, location.pathname]); // Update on route change too

  const handleLogout = () => {
    navigate("/select-profile");
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    if (role === "admin") navigate("/settings");
    else if (role === "teacher") navigate("/teacher-dashboard");
    else if (role === "student") navigate("/student-profile");
    else navigate("/settings");
    setIsProfileOpen(false);
  };

  const handleNotificationClick = (notif) => {
    // Mark this specific one as read immediately
    const updatedReadIds = [...new Set([...readIds, notif.id])];
    setReadIds(updatedReadIds);
    localStorage.setItem("readNotificationIds", JSON.stringify(updatedReadIds));

    if (notif.link) {
      navigate(notif.link);
    }
    setIsNotificationOpen(false);
  };

  const toggleNotifications = () => {
    const nextState = !isNotificationOpen;
    setIsNotificationOpen(nextState);

    if (nextState) {
      // When opening, we mark all current notifications as "read" in localStorage
      // so the badge disappears next time, but we DON'T update readIds state yet
      // so they stay gray while the user is looking at them.
      const allIds = notifications.map((n) => n.id);
      const updatedReadIds = [...new Set([...readIds, ...allIds])];
      localStorage.setItem(
        "readNotificationIds",
        JSON.stringify(updatedReadIds),
      );
    } else {
      // When closing, sync readIds state so they turn white next time
      const stored = localStorage.getItem("readNotificationIds");
      if (stored) setReadIds(JSON.parse(stored));
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white shadow-md z-40 transition-all duration-300 lg:left-64 flex items-center px-4 justify-between">
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
            className="text-xs md:text-xl lg:text-xl font-bold whitespace-nowrap"
            style={{ color: "var(--text-primary-color)" }}
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
            onClick={toggleNotifications}
            className={`relative p-2 rounded-lg cursor-pointer transition-all duration-200 ${
              isNotificationOpen
                ? "bg-blue-50"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            style={
              isNotificationOpen ? { color: "var(--text-primary-color)" } : {}
            }
            aria-label="Notifications"
          >
            <FaBell style={{ color: "var(--primary-color)" }} size={20} />
            {/* Notification Badge - Only show if there are unread notifications */}
            {notifications.some((n) => !readIds.includes(n.id)) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-3 w-52 sm:w-70 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden transform transition-all duration-200 origin-top-right">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-bold text-gray-800 text-sm">
                  Notifications
                </h3>
                <span
                  className="text-[10px] font-bold bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ color: "var(--text-primary-color)" }}
                >
                  {notifications.filter((n) => !readIds.includes(n.id)).length}{" "}
                  New
                </span>
              </div>

              {/* List */}
              <div className="max-h-[350px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`px-4 py-3 hover:bg-blue-50/50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 flex gap-3 items-start ${
                        readIds.includes(notif.id) ? "bg-white" : "bg-gray-100"
                      }`}
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
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-400 text-sm italic">
                    No new notifications
                  </div>
                )}
              </div>

              {/* Footer */}
              <button
                className="w-full py-2.5 text-xs font-bold transition-colors border-t border-gray-50 hover:bg-[var(--primary-color)]/10"
                style={{ color: "var(--text-primary-color)" }}
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile Button */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-2 p-1 sm:p-2 rounded-lg cursor-pointer transition-colors ${
              isProfileOpen ? "bg-blue-50" : "hover:bg-gray-100"
            }`}
            aria-label="Profile"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 bg-gray-50 flex-shrink-0">
              <img
                src={profileImage || schoolLogo}
                alt="Profile"
                className={`${!profileImage ? "p-1" : ""} w-full h-full object-contain`}
              />
            </div>
            <span
              className="text-xs md:text-sm lg:text-base font-bold"
              style={{ color: "var(--text-primary-color)" }}
            >
              {currentUserName}
            </span>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden transform transition-all duration-200 origin-top-right">
              <div className="py-1">
                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <IoPersonSharp className="text-gray-500" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <IoLogOutOutline className="text-red-500" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
