import { useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const Navbar = ({ onToggleSidebar, isSidebarOpen, role = "admin" }) => {
  const location = useLocation();

  const pageTitles = {
    "/admin-dashboard": "Admin Dashboard",
    "/teachers": "Teachers",
    "/students": "StudentsAdmin",
    "/courses": "Courses",
    "/meetings": "Meetings",
    "/settings": "Settings",
    "/add-teacher": "Add Teacher",
    "/add-student": "Add Student",
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
    <nav className="w-full fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-40 transition-all duration-300 lg:left-64 flex items-center px-4 lg:px-6 justify-between">
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
              className={`block h-0.5 w-full bg-[#0C46C4] rounded-full transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            {/* Middle bar */}
            <span
              className={`block h-0.5 w-full bg-[#0C46C4] rounded-full transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            {/* Bottom bar */}
            <span
              className={`block h-0.5 w-full bg-[#0C46C4] rounded-full transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Logo & Title */}
        <div className="flex items-center gap-2">
         
          <h1 className="text-xs md:text-2xl lg:text-2xl font-bold text-[#0C46C4] whitespace-nowrap">
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Right Side: Notification and Profile */}
      <div className="flex  items-center gap-4 sm:gap-4">
        {/* Notification Button */}
        <button
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
          aria-label="Notifications"
        >
          <FaBell size={20} />
          {/* Notification Badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Button */}
        <button
          className="flex items-center gap-2 p-1 sm:p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors   "
          aria-label="Profile"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 bg-gray-50 flex-shrink-0">
            <img
              src="/welcomepage/logo.png"
              alt="Profile"
              className="p-1 w-full h-full object-contain"
            />
          </div>
          <span className="text-xs md:text-sm lg:text-base font-medium text-blue-700">
            {currentUserName}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
