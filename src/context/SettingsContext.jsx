import React, { createContext, useContext, useState, useEffect } from "react";
import { saveLogo, loadLogo } from "../utils/logoStorage";

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

const DEFAULT_SYSTEM_LOGO = "/logo/superlogo.png";
const DEFAULT_SCHOOL_LOGO = "/welcomepage/logo.png";

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const defaultSettings = {
      schoolName: "Antigravity School",
      schoolLogo: DEFAULT_SCHOOL_LOGO,

      // Global System Identity (Super Admin)
      systemName: "Antigravity SaaS",
      systemLogo: DEFAULT_SYSTEM_LOGO,

      theme: "light",
      primaryColor: "#0C46C4",

      schoolAddress: "123 Education Lane, Learning City",
      schoolPhone: "+92 300 1234567",
      schoolEmail: "info@antigravityschool.edu",
      academicYear: "2025-2026",
      classes: "Playgroup, Nursery, KG, Class 1-12",
      sections: "A, B, C, D",
      timezone: "Asia/Karachi",
      language: "English",
      currency: "PKR",
      textPrimaryColor: "#000000",

      // Super Admin
      superAdminUsername: "super-admin",
      superAdminPassword: "super-admin12",

      // Account
      adminUsername: "admin",
      adminPassword: "admin12",
    };

    const saved = localStorage.getItem("school_settings");
    if (!saved) return defaultSettings;

    const parsed = JSON.parse(saved);

    // Migration: fix old passwords
    if (parsed.adminPassword === "password123")
      parsed.adminPassword = "admin12";
    if (parsed.superAdminPassword === "password123")
      parsed.superAdminPassword = "super-admin12";

    // Logos are stored in IndexedDB — strip any accidentally saved base64 from localStorage
    // (they'll be loaded async below via useEffect)
    if (
      typeof parsed.systemLogo === "string" &&
      parsed.systemLogo.startsWith("data:")
    ) {
      parsed.systemLogo = DEFAULT_SYSTEM_LOGO;
    } else if (parsed.systemLogo && typeof parsed.systemLogo !== "string") {
      parsed.systemLogo = DEFAULT_SYSTEM_LOGO;
    }
    if (
      typeof parsed.schoolLogo === "string" &&
      parsed.schoolLogo.startsWith("data:")
    ) {
      parsed.schoolLogo = DEFAULT_SCHOOL_LOGO;
    } else if (parsed.schoolLogo && typeof parsed.schoolLogo !== "string") {
      parsed.schoolLogo = DEFAULT_SCHOOL_LOGO;
    }

    return { ...defaultSettings, ...parsed };
  });

  const [isSuperAdmin, setIsSuperAdmin] = useState(() => {
    return localStorage.getItem("isSuperAdmin") === "true";
  });

  // On mount: load logos from IndexedDB and hydrate state
  useEffect(() => {
    (async () => {
      const [sysLogo, schLogo] = await Promise.all([
        loadLogo("systemLogo"),
        loadLogo("schoolLogo"),
      ]);
      setSettings((prev) => ({
        ...prev,
        ...(sysLogo ? { systemLogo: sysLogo } : {}),
        ...(schLogo ? { schoolLogo: schLogo } : {}),
      }));
    })();
  }, []);

  // Save settings to localStorage (logos excluded) and apply CSS variables
  useEffect(() => {
    localStorage.setItem("isSuperAdmin", isSuperAdmin);

    // Strip logo data URLs before saving to localStorage to avoid quota errors
    const { systemLogo, schoolLogo, ...settingsWithoutLogos } = settings;
    const toSave = {
      ...settingsWithoutLogos,
      // Only save path strings (not base64) to localStorage
      systemLogo:
        typeof systemLogo === "string" && systemLogo.startsWith("data:")
          ? DEFAULT_SYSTEM_LOGO
          : typeof systemLogo === "string"
            ? systemLogo
            : DEFAULT_SYSTEM_LOGO,
      schoolLogo:
        typeof schoolLogo === "string" && schoolLogo.startsWith("data:")
          ? DEFAULT_SCHOOL_LOGO
          : typeof schoolLogo === "string"
            ? schoolLogo
            : DEFAULT_SCHOOL_LOGO,
    };
    localStorage.setItem("school_settings", JSON.stringify(toSave));

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

    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings, isSuperAdmin]);

  const updateSettings = (newSettings) => {
    // If logos are being updated with base64 data, persist them to IndexedDB
    if (
      typeof newSettings.systemLogo === "string" &&
      newSettings.systemLogo.startsWith("data:")
    ) {
      saveLogo("systemLogo", newSettings.systemLogo);
    }
    if (
      typeof newSettings.schoolLogo === "string" &&
      newSettings.schoolLogo.startsWith("data:")
    ) {
      saveLogo("schoolLogo", newSettings.schoolLogo);
    }
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider
      value={{ ...settings, updateSettings, isSuperAdmin, setIsSuperAdmin }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
