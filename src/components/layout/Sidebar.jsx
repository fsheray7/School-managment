import React from "react";
import { FaTimes } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
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
          fixed top-0 left-0 h-full w-64
          transform transition-transform duration-300 z-50
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        {/* CLOSE BUTTON (mobile only) */}
        <button
          onClick={() => setIsOpen(false)}
          style={{ zIndex: "60" }}
          className="absolute top-4 right-4 text-white p-3 hover:bg-white/20 rounded-lg lg:hidden"
          aria-label="Close sidebar z-60"
        >
          <FaTimes size={20} />
        </button>

        {/* LOGO AREA */}
        <div className="relative h-24 flex flex-col items-center justify-center p-4">
          <div className="relative flex items-center justify-center mb-2">
            <img
              src="/profileselection/Vector.png"
              alt="Vector Logo"
              className="w-15 h-15  object-contain opacity-120"
            />
            <img
              src={schoolLogo}
              alt="School Logo"
              className="absolute w-12 h-12 object-contain"
            />
          </div>
          <span className="text-white text-sm font-bold text-center px-4 leading-tight drop-shadow-sm">
            {schoolName}
          </span>
        </div>

        <hr className="mb-2 border-gray-100/40" />

        {/* MENU */}
        <ul className="flex flex-col gap-0.5 p-3 text-white">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors text-[13px] font-medium
                ${
                  location.pathname === item.path
                    ? "bg-white/30"
                    : "hover:bg-white/20"
                }
              `}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="truncate">{item.label}</span>
            </li>
          ))}

          {/* LOGOUT */}
          <li
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/20 cursor-pointer mt-2 pt-2 text-[13px] font-medium"
          >
            <div className="flex-shrink-0 text-white">
              <IoLogOutSharp size={18} />
            </div>
            <span>Logout</span>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
