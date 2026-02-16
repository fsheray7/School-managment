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
    const defaultSettings = {
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
      textPrimaryColor: "#000000",

      // Account
      adminUsername: "admin",
      adminPassword: "admin12",
    };

    const saved = localStorage.getItem("school_settings");
    if (!saved) return defaultSettings;

    const parsed = JSON.parse(saved);

    // Migration logic for admin credentials
    if (parsed.adminPassword === "password123") {
      parsed.adminPassword = "admin12";
    }

    // Merge saved with defaults to handle new keys
    return { ...defaultSettings, ...parsed };
  });

  // Save settings to localStorage and apply CSS variables
  useEffect(() => {
    localStorage.setItem("school_settings", JSON.stringify(settings));

    document.documentElement.style.setProperty(
      "--primary-color",
      settings.primaryColor,
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      settings.secondaryColor,
    );
    document.documentElement.style.setProperty(
      "--text-primary-color",
      settings.textPrimaryColor,
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
