import React, { useState, useRef, useEffect } from "react";

import {
  FaSchool,
  FaCog,
  FaTimes,
  FaBook,
  FaUserTie,
  FaUserAlt,
} from "react-icons/fa";
import { IoLogOutSharp, IoPeople } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();

  const navigate = useNavigate();

  // Close sidebar when clicking outside (only on mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only close on mobile when clicking outside
      if (window.innerWidth < 1024 && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        // The hamburger button is now expected to be outside this component,
        // so we need to ensure clicking it doesn't close the sidebar immediately.
        // This assumes the hamburger button has an ID 'hamburger-button' in the parent.
        const hamburgerButton = document.getElementById("hamburger-button");
        if (hamburgerButton && !hamburgerButton.contains(e.target)) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* HAMBURGER BUTTON - Managed by parent */}
      
      {/* OVERLAY - Only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 transition-opacity lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#0C46C4] 
          transform transition-transform duration-300 z-50
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button - Only visible on mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-lg lg:hidden"
        >
          <FaTimes size={20} />
        </button>

        {/* TOP IMAGE / PLACEHOLDER */}
        <div className="relative h-32 flex items-center justify-center bg-gray-300">
           {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img
                            src="/profileselection/Vector.png"
                            alt="Vector Logo"
                            className="w-20 h-20 object-contain"
                        />
                       
                    </div>
                    <div className="absolute  flex items-center gap-2">
                        <img
                            src="/welcomepage/logo.png"
                            alt="School Logo"
                            className="w-15 h-15 object-contain"
                        />
                       
                    </div>
        </div>

        {/* MENU ITEMS */}
        <ul className="flex flex-col gap-1 p-4 text-white text-sm">
          <div
            onClick={() => handleNavigation("/admin-dashboard")}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/admin-dashboard'
              ? 'bg-white/30'
              : 'hover:bg-white/20'
              }`}
          >
            <FaSchool size={20} />
            Dashboard
          </div>

          <button onClick={() => handleNavigation("/teachers")} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/teachers'
            ? 'bg-white/30'
            : 'hover:bg-white/20'
            }`}>
            <FaUserTie size={20} />
            Teachers
          </button>

          <button onClick={() => handleNavigation("/students")} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/students'
            ? 'bg-white/30'
            : 'hover:bg-white/20'
            }`}>
            <FaUserAlt size={20} />
            Students
          </button>

          <button onClick={() => handleNavigation("/courses")} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/courses'
            ? 'bg-white/30'
            : 'hover:bg-white/20'
            }`}>
            <FaBook size={20} />
            Courses
          </button>
          <button onClick={() => handleNavigation("/meetings")} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/meetings'
            ? 'bg-white/30'
            : 'hover:bg-white/20'
            }`}>
            <IoPeople size={20} />
            Meetings
          </button>
          <button onClick={() => handleNavigation('/settings')} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/settings'
            ? 'bg-white/30'
            : 'hover:bg-white/20'
            }`}>
            <FaCog size={20} />
            Settings
          </button>

          <li 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 cursor-pointer"
          >
            <IoLogOutSharp size={20} />
            Logout
          </li>
        </ul>
      </aside>
    </>
  );
};

export default AdminSidebar;
