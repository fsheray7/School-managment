import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

const Sidebar = ({ isOpen, setIsOpen, menuItems = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { schoolLogo, schoolName } = useSettings();
  const [isHovered, setIsHovered] = useState(false);

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

      {/* SIDEBAR - always w-64 */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed top-0 left-0 h-full w-64 overflow-hidden
          z-50 transition-all duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
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
        <ul
          className={`
            flex flex-col gap-1 py-1 text-white
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isHovered ? "px-3 items-start" : "lg:px-0 lg:items-center px-3 items-start"}
          `}
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`
                relative flex items-center text-[var(--text-primary-color)] cursor-pointer text-[13px] font-medium group
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${
                  isHovered
                    ? "w-full justify-start"
                    : "lg:w-auto lg:justify-center w-full justify-start"
                }
              `}
              title={!isHovered ? item.label : ""}
            >
              {/* Icon with active background */}
              <div
                className={`
                  flex-shrink-0 flex items-center justify-center
                  w-10 h-10 rounded-xl
                  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${
                    isActive(item.path)
                      ? "bg-white/25"
                      : "group-hover:bg-white/15"
                  }
                `}
              >
                {item.icon}
              </div>

              {/* Label with smooth fade - only this part hides/shows */}
              <span
                className={`
                  whitespace-nowrap overflow-hidden
                  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${
                    isHovered
                      ? "opacity-100 max-w-[180px] ml-3"
                      : "lg:opacity-0 lg:max-w-0 lg:ml-0 opacity-100 max-w-[180px] ml-3"
                  }
                `}
              >
                {item.label}
              </span>

              {/* Extended active background when hovered - covers icon + text */}
              {isActive(item.path) && isHovered && (
                <div
                  className="absolute inset-0 bg-white/25 rounded-xl -z-10 
                    transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                />
              )}
            </li>
          ))}

          {/* LOGOUT */}
          {/* <li
            onClick={() => setIsOpen(false)}
            className={`
              relative flex items-center cursor-pointer  text-[13px] font-medium group
              transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${
                isHovered
                  ? "w-full justify-start"
                  : "lg:w-auto lg:justify-center w-full justify-start"
              }
            `}
            title={!isHovered ? "Logout" : ""}
          >
            <div
              className={`
                flex-shrink-0 flex items-center justify-center text-white
                w-10 h-10 rounded-xl
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                group-hover:bg-white/15
              `}
            >
              <IoLogOutSharp size={18} />
            </div>
            <span
              className={`
                whitespace-nowrap overflow-hidden
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${
                  isHovered
                    ? "opacity-100 max-w-[180px] ml-3"
                    : "lg:opacity-0 lg:max-w-0 lg:ml-0 opacity-100 max-w-[180px] ml-3"
                }
              `}
            >
              Logout
            </span>
          </li> */}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
