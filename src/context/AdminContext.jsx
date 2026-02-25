import React, { createContext, useContext, useState } from "react";
import { admins as adminsData } from "../data/admindata/superadmin/admins";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [admins, setAdmins] = useState(
    (adminsData || []).map((admin) => ({
      ...admin,
      profilePhoto: admin.profileImage || "/assets/profiles/admins/default.jpg",
      status: admin.status || "Active",
    })),
  );
  const [currentAdmin, setCurrentAdmin] = useState(() => {
    const stored = localStorage.getItem("currentAdmin");
    return stored ? JSON.parse(stored) : null;
  });

  const loginAdmin = (adminData) => {
    setCurrentAdmin(adminData);
    localStorage.setItem("currentAdmin", JSON.stringify(adminData));
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
    localStorage.removeItem("currentAdmin");
  };

  // ============ CRUD ACTIONS ============

  const addAdmin = (newAdmin) => {
    setAdmins((prev) => [...prev, newAdmin]);
  };

  const updateAdmin = (updatedAdmin) => {
    setAdmins((prev) =>
      prev.map((a) => (a.id === updatedAdmin.id ? updatedAdmin : a)),
    );
  };

  const deleteAdmin = (id) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleAdminStatus = (id) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: a.status === "Active" ? "Inactive" : "Active",
            }
          : a,
      ),
    );
  };

  return (
    <AdminContext.Provider
      value={{
        admins,
        currentAdmin,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        toggleAdminStatus,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// custom hook with error handling
export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }

  return context;
};
