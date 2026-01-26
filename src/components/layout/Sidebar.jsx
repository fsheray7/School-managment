import React from "react";
import { FaTimes } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, menuItems = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
          fixed top-0 left-0 h-full w-64 bg-[#0C46C4]
          transform transition-transform duration-300 z-50
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
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
        <div className="relative h-32 flex items-center justify-center">
          <img
            src="/profileselection/Vector.png"
            alt="Vector Logo"
            className="w-20 h-20 object-contain"
          />
          <img
            src="/welcomepage/logo.png"
            alt="School Logo"
            className="absolute w-15 h-15 object-contain"
          />
        </div>

        <hr className="mb-2 border-gray-100/40" />

        {/* MENU */}
        <ul className="flex flex-col gap-1 p-4 text-white text-sm">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                ${
                  location.pathname === item.path
                    ? "bg-white/30"
                    : "hover:bg-white/20"
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}

          {/* LOGOUT */}
          <li
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 cursor-pointer mt-4 border-t border-white/20 pt-4"
          >
            <IoLogOutSharp size={20} />
            <span>Logout</span>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
