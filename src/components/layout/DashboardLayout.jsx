import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {
  FaSchool,
  FaCog,
  FaBook,
  FaUserTie,
  FaUserGraduate,
  FaHome,
  FaClipboardList,
  FaCheckDouble,
  FaRegClock,
  FaQuestionCircle,
  FaLightbulb,
  FaTrophy,
  FaUserCircle,
} from "react-icons/fa";
import { IoLogOutSharp, IoPeople, IoNotifications } from "react-icons/io5";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine role based on path
  const getRole = () => {
    if (
      location.pathname.includes("/admin") ||
      [
        "/teachers",
        "/students",
        "/courses",
        "/meetings",
        "/settings",
        "/add-teacher",
        "/add-student",
        "/add-course",
      ].includes(location.pathname)
    ) {
      return "admin";
    }
    if (
      location.pathname.includes("student") ||
      ["/quiz", "/questions", "/ask-question", "/answer"].includes(
        location.pathname,
      )
    ) {
      return "student";
    }
    return "teacher";
  };

  const role = getRole();

  // Menu configurations
  const menuConfigs = {
    admin: [
      {
        label: "Dashboard",
        path: "/admin-dashboard",
        icon: <FaSchool size={20} />,
      },
      { label: "Teachers", path: "/teachers", icon: <FaUserTie size={20} /> },
      {
        label: "Students",
        path: "/students",
        icon: <FaUserGraduate size={20} />,
      },
      { label: "Courses", path: "/courses", icon: <FaBook size={20} /> },
      { label: "Meetings", path: "/meetings", icon: <IoPeople size={20} /> },
      { label: "Settings", path: "/settings", icon: <FaCog size={20} /> },
    ],
    teacher: [
      {
        label: "Dashboard",
        path: "/teacher-dashboard",
        icon: <FaHome size={20} />,
      },
      {
        label: "Attendance",
        path: "/attendance",
        icon: <FaCheckDouble size={20} />,
      },
      {
        label: "Homework",
        path: "/homework",
        icon: <FaClipboardList size={20} />,
      },
      { label: "Results", path: "/results", icon: <FaTrophy size={20} /> },
      { label: "Marks", path: "/marks", icon: <FaCog size={20} /> },
      { label: "Notice", path: "/notice", icon: <IoNotifications size={20} /> },
      {
        label: "Solutions",
        path: "/solutions",
        icon: <FaLightbulb size={20} />,
      },
      {
        label: "Add Account",
        path: "/add-account",
        icon: <FaUserCircle size={20} />,
      },
      {
        label: "Add Classes",
        path: "/add-classes",
        icon: <IoPeople size={20} />,
      },
      {
        label: "Exam Routine",
        path: "/exam-routine",
        icon: <FaRegClock size={20} />,
      },
    ],
    student: [
      {
        label: "Dashboard",
        path: "/student-dashboard",
        icon: <FaHome size={20} />,
      },
      {
        label: "Attendance",
        path: "/attendance-student",
        icon: <FaCheckDouble size={20} />,
      },
      {
        label: "Homework",
        path: "/homework-student",
        icon: <FaClipboardList size={20} />,
      },
      {
        label: "Results",
        path: "/results-student",
        icon: <FaTrophy size={20} />,
      },
      {
        label: "Exam Routine",
        path: "/exam-routine-student",
        icon: <FaRegClock size={20} />,
      },
      {
        label: "Solutions",
        path: "/questions",
        icon: <FaLightbulb size={20} />,
      },
      { label: "Quiz", path: "/quiz", icon: <FaQuestionCircle size={20} /> },
      {
        label: "Profile",
        path: "/student-profile",
        icon: <FaUserCircle size={20} />,
      },
    ],
  };

  return (
    <div className="relative w-full  ">
      <Sidebar
        role={role}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        menuItems={menuConfigs[role]}
      />
      <Navbar
        role={role}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <main className="w-full flex    lg:pl-64  transition-all duration-300 ">
        <div className="py-4 w-full px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
