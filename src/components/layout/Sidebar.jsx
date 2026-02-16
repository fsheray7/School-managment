import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

const Sidebar = ({ isOpen, setIsOpen, menuItems = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { schoolLogo, schoolName } = useSettings();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // close sidebar after navigation (mobile)
  };

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* OVERLAY (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0  overflow-hidden h-full
          z-50 transition-all duration-300
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 lg:translate-x-0"}
        `}
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        {/* CLOSE BUTTON (mobile only) */}
        <button
          onClick={() => setIsOpen(false)}
          style={{ zIndex: "60" }}
          className="absolute top-4 right-4 text-white p-3 hover:bg-white/20 rounded-lg lg:hidden transition-all duration-300"
          aria-label="Close sidebar"
        >
          <FaTimes size={20} />
        </button>

        {/* LOGO AREA - Always visible */}
        <div className="relative h-24 flex flex-col items-center justify-center p-4">
          <div className="relative flex items-center justify-center mb-2">
            <img
              src="/profileselection/Vector.png"
              alt="Vector Logo"
              className="w-15 h-15 object-contain"
            />
            <img
              src={schoolLogo}
              alt="School Logo"
              className="absolute w-12 h-12 object-contain"
            />
          </div>
          <span className="text-[var(--text-primary-color)] text-base font-bold text-center px-4 leading-tight drop-shadow-sm">
            {schoolName}
          </span>
        </div>

        <hr className=" border-gray-100/40 mx-3" />

        {/* MENU */}
        <ul className="flex flex-col p-1 px-3 text-white">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`
                relative flex items-center p-1 rounded-xl cursor-pointer text-[var(--text-primary-color)] text-[13px] font-medium transition-all duration-300
                ${isActive(item.path) ? "bg-white/25" : "hover:bg-white/10"}
              `}
              title={item.label}
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
                {item.icon}
              </div>

              {/* Label - always visible */}
              <span className="whitespace-nowrap overflow-hidden ml-3">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
