import { useLocation } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";

const AdminNavbar = ({ onToggleSidebar, isSidebarOpen }) => {
    const location = useLocation();

    const pageTitles = {
        "/admin-dashboard": "Admin Dashboard",
        "/teachers": "Teachers",
        "/students": "Students",
        "/courses": "Courses",
        "/meetings": "Meetings",
        "/settings": "Settings",
        "/add-teacher": "Add Teacher",
        "/attendance-admin": "Attendance Management",
    };

    const currentTitle = pageTitles[location.pathname] || "Admin Dashboard";

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-40 transition-all duration-300 lg:left-64">
            <div className="h-full flex items-center justify-between px-4 lg:px-6">
                {/* Left Side - Logo and Name */}
                <div className="flex items-center gap-3">
                    {/* Animated Hamburger Toggle Button - Only visible on small screens */}
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 hover:bg-gray-100 rounded-lg lg:hidden transition-colors relative w-10 h-10 flex items-center justify-center"
                        aria-label="Toggle Sidebar"
                    >
                        <div className="w-5 h-4 relative flex flex-col justify-between">
                            {/* Top bar */}
                            <span
                                className={`block h-0.5 w-full bg-[#0C46C4] rounded-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'rotate-45 translate-y-1.5' : ''
                                    }`}
                            ></span>
                            {/* Middle bar */}
                            <span
                                className={`block h-0.5 w-full bg-[#0C46C4] rounded-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                            ></span>
                            {/* Bottom bar */}
                            <span
                                className={`block h-0.5 w-full bg-[#0C46C4] rounded-full transition-all duration-300 ease-in-out ${isSidebarOpen ? '-rotate-45 -translate-y-1.5' : ''
                                    }`}
                            ></span>
                        </div>
                    </button>

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img
                            src="/welcomepage/logo.png"
                            alt="School Logo"
                            className="w-8 h-8 md:hidden sm:w-10 sm:h-10 object-contain"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-sm sm:text-lg font-bold text-[#0C46C4]">
                                {currentTitle}
                            </h1>

                        </div>
                    </div>
                </div>

                {/* Right Side - Notification and Profile */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Notification Button */}
                    <button
                        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Notifications"
                    >
                        <FaBell size={20} />
                        {/* Notification Badge */}
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile Button */}
                    <button
                        className="flex items-center gap-2 p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Profile"
                    >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {/* Replace with actual profile image if available */}
                            <FaUserCircle size={32} className="text-gray-400" />
                        </div>
                        <span className="hidden sm:block text-sm font-medium text-gray-700">
                            Admin
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
