import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumbs = ({ role }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Route to label mapping
  const breadcrumbNameMap = {
    // Admin
    "admin-dashboard": "Dashboard",
    teachers: "Teachers",
    students: "Students",
    courses: "Courses",
    classes: "Classes",
    meetings: "Meetings",
    fees: "Fees",
    "generate-fee": "Generate Fee",
    finance: "Finance",
    "notice-admin": "Notice & Announcements",
    "add-notice-admin": "Add Notice",
    "add-teacher": "Add Teacher",
    "add-student": "Add Student",
    "add-course": "Add Course",
    "add-class": "Add Class",
    "student-promotion": "Student Promotion",
    settings: "Settings",

    // Teacher
    "teacher-dashboard": "Dashboard",
    attendance: "Attendance",
    "add-attendance": "Take Attendance",
    homework: "Homework",
    results: "Results",
    marks: "Marks",
    "add-marks": "Add Marks",
    solutions: "Solutions",
    "notice-teacher": "Notice & Announcements",
    "add-notice-teacher": "Add Notice",
    "exam-routine": "Exam Routine",

    // Student
    "student-dashboard": "Dashboard",
    "attendance-student": "Attendance",
    "homework-student": "Homework",
    "results-student": "Results",
    "marks-student": "Marks",
    questions: "Solutions",
    "ask-question": "Ask Question",
    "exam-routine-student": "Exam Routine",
    quiz: "Quiz",
    "student-profile": "Profile",

    // Super Admin
    "super-admin-dashboard": "Dashboard",
    "super-admin-admins": "Admins",
    "super-admin-revenue": "Revenue",
    "super-admin-settings": "Settings",
    "super-admin-add-admin": "Add Admin",
  };

  // Define parent-child relationships for flat routes
  const parentsMap = {
    "add-attendance": "attendance",
    "add-notice-admin": "notice-admin",
    "add-notice-teacher": "notice-teacher",
    "add-marks": "marks",
    "add-course": "courses",
    "add-teacher": "teachers",
    "add-student": "students",
    "add-class": "classes",
    finance: "fees",
    "generate-fee": "fees",
  };

  // Helper to determine the root path based on role
  const getRootPath = () => {
    switch (role) {
      case "admin":
        return "/admin-dashboard";
      case "teacher":
        return "/teacher-dashboard";
      case "student":
        return "/student-dashboard";
      case "super-admin":
        return "/super-admin-dashboard";
      default:
        return "/";
    }
  };

  // Build crumbs array with hierarchical logic
  const buildCrumbs = () => {
    let crumbs = [];
    pathnames.forEach((value, index) => {
      // Skip dashboard root paths
      if (
        [
          "admin-dashboard",
          "teacher-dashboard",
          "student-dashboard",
          "super-admin-dashboard",
        ].includes(value)
      ) {
        return;
      }

      // Check for parent in flat routing
      const parentSlug = parentsMap[value];
      if (parentSlug && !pathnames.includes(parentSlug)) {
        crumbs.push({
          slug: parentSlug,
          to: `/${parentSlug}`,
          label: breadcrumbNameMap[parentSlug] || parentSlug,
        });
      }

      crumbs.push({
        slug: value,
        to: `/${pathnames.slice(0, index + 1).join("/")}`,
        label:
          breadcrumbNameMap[value] ||
          value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " "),
      });
    });
    return crumbs;
  };

  const crumbs = buildCrumbs();

  return (
    <nav
      className="flex mb-6 bg-transparent animate-fade-in"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to={getRootPath()}
            className="inline-flex items-center text-xs md:text-xs font-semibold text-gray-500 hover:text-[var(--primary-color)] transition-colors"
          >
            <FaHome className="mr-2" size={14} />
            Dashboard
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;

          return (
            <li key={crumb.to + index}>
              <div className="flex items-center">
                <FaChevronRight
                  className="text-gray-400 mx-1 md:mx-2"
                  size={10}
                />
                {last ? (
                  <span className="text-xs md:text-xs font-bold text-[var(--primary-color)]">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="text-xs md:text-xs text-gray-500 hover:text-[var(--primary-color)] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
