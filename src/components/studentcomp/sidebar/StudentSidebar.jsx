import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaSchool,
  FaFileAlt,
  FaPhoneAlt,
  FaCog,
} from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const StudentSidebar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 px-4 text-white bg-gray-300 rounded-lg cursor-pointer fixed top-4 left-4 z-50"
      >
        <FaBars size={22} className="text" />
      </button>

      {/* OVERLAY */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity"></div>
      )}

      {/* SIDEBAR */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#0C46C4] z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* TOP IMAGE / PLACEHOLDER */}
        <div className="h-32 bg-gray-300"></div>

        {/* MENU ITEMS */}
        <ul className="flex flex-col gap-1 p-4 text-white text-sm">
          <Link to="/student-profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 cursor-pointer">
            <FaSchool size={20} />
            Profile of School
          </Link>

          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 cursor-pointer">
            <FaFileAlt size={20} />
            Profile of publication
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 cursor-pointer">
            <FaPhoneAlt size={20} />
            Emergency contacts
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 cursor-pointer">
            <FaCog size={20} />
            Settings
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 cursor-pointer">
            <IoLogOutSharp size={20} />
            Logout
          </li>
        </ul>
      </aside>
    </>
  );
};

export default StudentSidebar;
