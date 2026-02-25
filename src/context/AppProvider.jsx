import React from "react";
import { SettingsProvider } from "./SettingsContext";
import { ToastProvider } from "./ToastContext";
import { TeacherProvider } from "./TeacherContext";
import { StudentProvider } from "./StudentContext";
import { AdminProvider } from "./AdminContext";

const AppProviders = ({ children }) => {
  return (
    <SettingsProvider>
      <ToastProvider>
        <AdminProvider>
          <TeacherProvider>
            <StudentProvider>{children}</StudentProvider>
          </TeacherProvider>
        </AdminProvider>
      </ToastProvider>
    </SettingsProvider>
  );
};

export default AppProviders;
