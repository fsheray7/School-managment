import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admincomponents/navbar/AdminNavbar";
import AdminSidebar from "../../components/admincomponents/sidebar/sidebar/AdminSidebar";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <section className="relative w-full min-h-screen bg-none">

            {/* Admin Sidebar */}
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Admin Navbar */}
            <AdminNavbar
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isSidebarOpen={isSidebarOpen}
            />

            {/* Dynamic Content Area */}
            <div className="w-full h-full lg:pl-64 transition-all duration-300">
                <Outlet />
            </div>

        </section>
    );
};

export default AdminLayout;
