import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveLogo, loadLogo } from "../../utils/logoStorage";

const DEFAULT_SYSTEM_LOGO = "/logo/superlogo.png";
const DEFAULT_SCHOOL_LOGO = "/welcomepage/logo.png";

const initialState = {
  schoolName: "Antigravity School",
  schoolLogo: DEFAULT_SCHOOL_LOGO,
  systemName: "Antigravity SaaS",
  systemLogo: DEFAULT_SYSTEM_LOGO,
  theme: "light",
  primaryColor: "#0C46C4",
  secondaryColor: "#F3F4F6",
  textPrimaryColor: "#000000",
  schoolAddress: "123 Education Lane, Learning City",
  schoolPhone: "+92 300 1234567",
  schoolEmail: "info@antigravityschool.edu",
  academicYear: "2025-2026",
  classes: "Playgroup, Nursery, KG, Class 1-12",
  sections: "A, B, C, D",
  timezone: "Asia/Karachi",
  language: "English",
  currency: "PKR",
  superAdminUsername: "super-admin",
  superAdminPassword: "super-admin123",
  isSuperAdmin: localStorage.getItem("isSuperAdmin") === "true",
  loading: false,
};

// Async thunk to load logos from IndexedDB
export const loadStoredSettings = createAsyncThunk(
  "settings/loadStoredSettings",
  async (_, { dispatch }) => {
    const saved = localStorage.getItem("school_settings");
    let settings = {};
    if (saved) {
      settings = JSON.parse(saved);
      // Migration: fix old passwords
      if (
        settings.superAdminPassword === "password123" ||
        settings.superAdminPassword === "super-admin12"
      ) {
        settings.superAdminPassword = "super-admin123";
      }
    }

    const [sysLogo, schLogo] = await Promise.all([
      loadLogo("systemLogo"),
      loadLogo("schoolLogo"),
    ]);

    return {
      ...settings,
      ...(sysLogo ? { systemLogo: sysLogo } : {}),
      ...(schLogo ? { schoolLogo: schLogo } : {}),
    };
  },
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      const newSettings = action.payload;

      // Handle logos persistence
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

      Object.assign(state, newSettings);

      // Persist to localStorage (excluding base64 logos)
      const { systemLogo, schoolLogo, ...settingsToSave } = state;
      localStorage.setItem(
        "school_settings",
        JSON.stringify({
          ...settingsToSave,
          systemLogo:
            typeof systemLogo === "string" && systemLogo.startsWith("data:")
              ? DEFAULT_SYSTEM_LOGO
              : systemLogo,
          schoolLogo:
            typeof schoolLogo === "string" && schoolLogo.startsWith("data:")
              ? DEFAULT_SCHOOL_LOGO
              : schoolLogo,
        }),
      );

      // Apply CSS variables
      if (newSettings.primaryColor)
        document.documentElement.style.setProperty(
          "--primary-color",
          newSettings.primaryColor,
        );
      if (newSettings.secondaryColor)
        document.documentElement.style.setProperty(
          "--secondary-color",
          newSettings.secondaryColor,
        );
      if (newSettings.textPrimaryColor)
        document.documentElement.style.setProperty(
          "--text-primary-color",
          newSettings.textPrimaryColor,
        );

      if (newSettings.theme) {
        if (newSettings.theme === "dark")
          document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      }
    },
    setSuperAdmin: (state, action) => {
      state.isSuperAdmin = action.payload;
      localStorage.setItem("isSuperAdmin", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadStoredSettings.fulfilled, (state, action) => {
      Object.assign(state, action.payload);

      // Apply CSS variables after loading
      document.documentElement.style.setProperty(
        "--primary-color",
        state.primaryColor,
      );
      if (state.theme === "dark")
        document.documentElement.classList.add("dark");
    });
  },
});

export const { updateSettings, setSuperAdmin } = settingsSlice.actions;
export default settingsSlice.reducer;
