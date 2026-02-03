import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  // Load settings from localStorage or use defaults
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("school_settings");
    return saved
      ? JSON.parse(saved)
      : {
          schoolName: "Antigravity School",
          schoolLogo: "/welcomepage/logo.png",
          theme: "light",
          primaryColor: "#0C46C4",
          // New School Info
          schoolAddress: "123 Education Lane, Learning City",
          schoolPhone: "+92 300 1234567",
          schoolEmail: "info@antigravityschool.edu",
          // Academic
          academicYear: "2025-2026",
          classes: "Playgroup, Nursery, KG, Class 1-12",
          sections: "A, B, C, D",
          // System
          timezone: "Asia/Karachi",
          language: "English",
          currency: "PKR",
        };
  });

  // Save settings to localStorage and apply CSS variables
  useEffect(() => {
    localStorage.setItem("school_settings", JSON.stringify(settings));

    // Apply primary color variable
    document.documentElement.style.setProperty(
      "--primary-color",
      settings.primaryColor,
    );

    // Apply theme (simple implementation for now)
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ ...settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
