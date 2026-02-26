import React, { useState, useEffect } from "react";
import { useSettings } from "../../context/SettingsContext";
import Button from "../../components/ui/Button";
import FileUpload from "../../components/ui/FileUpload";
import {
  FaMoon,
  FaSun,
  FaCheck,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaLock,
} from "react-icons/fa";

import { useToast } from "../../context/ToastContext";
import { admins as defaultAdmins } from "../../data/admindata/superadmin/admins";

const SettingCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border  border-gray-100 flex flex-col gap-5">
    <h2 className="text-lg font-bold text-[var(--text-primary-color)] border-b border-gray-50 pb-3">
      {title}
    </h2>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
);

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error = false,
  suffix = null,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full p-3 bg-gray-50 border ${error ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-xl focus:outline-none focus:border-[#0C46C4] focus:ring-2 focus:ring-blue-50 transition-all text-sm text-gray-700 pr-10`}
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {suffix}
        </div>
      )}
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0C46C4] transition-all text-sm text-gray-700 appearance-none"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Settings = () => {
  const { showToast } = useToast();
  const {
    schoolName,
    schoolLogo,
    theme,
    primaryColor,
    schoolAddress,
    schoolPhone,
    schoolEmail,
    academicYear,
    classes,
    sections,
    timezone,
    language,
    currency,
    secondaryColor,
    textPrimaryColor,
    updateSettings,
  } = useSettings();

  const [localSettings, setLocalSettings] = useState({
    schoolName,
    schoolLogo,
    theme,
    primaryColor,
    schoolAddress,
    schoolPhone,
    schoolEmail,
    academicYear,
    classes,
    sections,
    timezone,
    language,
    currency,
    secondaryColor,
    textPrimaryColor,
    adminUsername: "",
    adminPassword: "",
  });

  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    // Load current admin from localStorage
    const storedAdmin = localStorage.getItem("currentAdmin");
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setCurrentAdmin(parsedAdmin);
      setLocalSettings((prev) => ({
        ...prev,
        adminUsername: parsedAdmin.username,
        adminPassword: parsedAdmin.password,
      }));
    }
  }, []);

  const [isLogoPreviewOpen, setIsLogoPreviewOpen] = useState(false);

  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showModalCurrentPass, setShowModalCurrentPass] = useState(false);

  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Real-time matching check
  const isMismatch =
    passwordFields.confirmPassword &&
    passwordFields.newPassword !== passwordFields.confirmPassword;

  const COLORS = [
    "#0C46C4",
    "#10B981",
    "#F59E0B",
    "#f82525ff",
    "#a220f3ff",
    "#48ece9",
    "#000000",
    "#FFFFFF",
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalSettings((prev) => ({ ...prev, schoolLogo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    const passwordChanged = !!passwordFields.newPassword;
    if (passwordChanged) {
      if (passwordFields.newPassword !== passwordFields.confirmPassword) {
        showToast("New passwords do not match!", "error");
        return;
      }
    }
    // Open confirmation modal
    setConfirmPassword("");
    setConfirmPasswordError("");
    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please enter your current password.");
      return;
    }
    if (confirmPassword !== currentAdmin?.password) {
      setConfirmPasswordError("Incorrect password. Please try again.");
      return;
    }

    const passwordChanged = !!passwordFields.newPassword;
    const settingsToUpdate = { ...localSettings };
    if (passwordChanged) {
      // Update admin password locally
      if (currentAdmin) {
        const updatedAdmin = {
          ...currentAdmin,
          username: localSettings.adminUsername,
          password: passwordFields.newPassword,
        };
        setCurrentAdmin(updatedAdmin);
        localStorage.setItem("currentAdmin", JSON.stringify(updatedAdmin));

        // Update in the main admins list
        const storedAdmins = JSON.parse(localStorage.getItem("admins") || "[]");
        const allAdmins =
          storedAdmins.length > 0 ? storedAdmins : defaultAdmins;
        const newAdminsList = allAdmins.map((a) =>
          a.id === currentAdmin.id ? updatedAdmin : a,
        );
        localStorage.setItem("admins", JSON.stringify(newAdminsList));
      }
    }

    updateSettings(settingsToUpdate);
    showToast("Settings saved successfully!", "success");

    // Clear password fields after save
    setPasswordFields({ newPassword: "", confirmPassword: "" });
    setConfirmPassword("");
    setConfirmPasswordError("");
    setShowConfirmModal(false);
  };

  return (
    <section className="flex flex-col items-center mt-3 w-full bg-gray-50/50 min-h-screen px-4 ">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-bold  tracking-tight text-[var(--text-primary-color)]">
              System Settings
            </h1>
            <p className="text-gray-500 text-xs ">
              Configure your school's global identity and preferences.
            </p>
          </div>
          <Button
            onClick={handleSaveClick}
            className="  text-xs shadow-lg shadow-blue-100 border border-[var(--primary-color)]"
            variant="ghost"
          >
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 flex  flex-col gap-8">
            {/* School Identity */}
            <SettingCard title="School Identity">
              <InputField
                label="School Name"
                placeholder="Admin Academy"
                value={localSettings.schoolName}
                onChange={(val) =>
                  setLocalSettings((p) => ({ ...p, schoolName: val }))
                }
              />

              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row items-center gap-6 border border-gray-100 p-6 rounded-2xl bg-gray-50/50 transition-colors">
                  <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm p-2">
                    <img
                      src={localSettings.schoolLogo}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <FileUpload
                      label="School Logo"
                      file={localSettings.schoolLogo}
                      onChange={handleLogoUpload}
                      onPreview={() => setIsLogoPreviewOpen(true)}
                      accept="image/*"
                      helperText="Recommended: Square PNG/JPG, min 500x500px"
                    />
                  </div>
                </div>
              </div>
            </SettingCard>

            {/* School Contact Information */}
            <SettingCard title="School Information">
              <InputField
                label="Full Address"
                placeholder="123 Education Lane, Education City"
                value={localSettings.schoolAddress}
                onChange={(val) =>
                  setLocalSettings((p) => ({ ...p, schoolAddress: val }))
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Contact Phone"
                  placeholder="+92 300 0000000"
                  value={localSettings.schoolPhone}
                  onChange={(val) =>
                    setLocalSettings((p) => ({ ...p, schoolPhone: val }))
                  }
                />
                <InputField
                  label="Official Email"
                  placeholder="contact@school.com"
                  type="email"
                  value={localSettings.schoolEmail}
                  onChange={(val) =>
                    setLocalSettings((p) => ({ ...p, schoolEmail: val }))
                  }
                />
              </div>
            </SettingCard>

            {/* Account Settings */}
            <SettingCard title="Account Settings">
              <InputField
                label="Admin Username"
                placeholder="admin"
                value={localSettings.adminUsername}
                onChange={(val) =>
                  setLocalSettings((p) => ({ ...p, adminUsername: val }))
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="New Password"
                  placeholder="Enter new password"
                  type={showNewPass ? "text" : "password"}
                  value={passwordFields.newPassword}
                  onChange={(val) =>
                    setPasswordFields((p) => ({ ...p, newPassword: val }))
                  }
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="text-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                    >
                      {showNewPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  }
                />
                <div className="flex flex-col">
                  <InputField
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    type={showConfirmPass ? "text" : "password"}
                    error={isMismatch}
                    value={passwordFields.confirmPassword}
                    onChange={(val) =>
                      setPasswordFields((p) => ({ ...p, confirmPassword: val }))
                    }
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="text-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                      >
                        {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    }
                  />
                  {isMismatch && (
                    <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 animate-pulse">
                      Passwords do not match!
                    </p>
                  )}
                </div>
              </div>
            </SettingCard>

            {/* Academic Configurations */}
            <SettingCard title="Academic Settings">
              <InputField
                label="Academic Year"
                placeholder="2025-2026"
                value={localSettings.academicYear}
                onChange={(val) =>
                  setLocalSettings((p) => ({ ...p, academicYear: val }))
                }
              />
              <InputField
                label="Active Classes"
                placeholder="Playgroup, Nursery, KG, Class 1-12..."
                value={localSettings.classes}
                onChange={(val) =>
                  setLocalSettings((p) => ({ ...p, classes: val }))
                }
              />
              <InputField
                label="Standard Sections"
                placeholder="A, B, C, D"
                value={localSettings.sections}
                onChange={(val) =>
                  setLocalSettings((p) => ({ ...p, sections: val }))
                }
              />
            </SettingCard>

            {/* System Preferences */}
            <SettingCard title="System Preferences">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectField
                  label="Timezone"
                  value={localSettings.timezone}
                  onChange={(val) =>
                    setLocalSettings((p) => ({ ...p, timezone: val }))
                  }
                  options={[
                    "Asia/Karachi",
                    "UTC",
                    "Asia/Dubai",
                    "Europe/London",
                  ]}
                />
                <SelectField
                  label="Language"
                  value={localSettings.language}
                  onChange={(val) =>
                    setLocalSettings((p) => ({ ...p, language: val }))
                  }
                  options={["English", "Urdu", "Arabic"]}
                />
                <SelectField
                  label="Currency"
                  value={localSettings.currency}
                  onChange={(val) =>
                    setLocalSettings((p) => ({ ...p, currency: val }))
                  }
                  options={["PKR", "USD", "GBP", "AED"]}
                />
              </div>
            </SettingCard>

            {/* Appearance Section */}
            <SettingCard title="Interface Branding">
              <div className="flex flex-col gap-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Global Theme
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      setLocalSettings((p) => ({ ...p, theme: "light" }))
                    }
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold ${
                      localSettings.theme === "light"
                        ? "border-[#0C46C4] bg-blue-50/50 text-[#0C46C4]"
                        : "border-gray-100 text-gray-400 grayscale"
                    }`}
                  >
                    <FaSun
                      className={
                        localSettings.theme === "light" ? "text-amber-400" : ""
                      }
                    />
                    Light Mode
                  </button>

                  <button
                    onClick={() =>
                      setLocalSettings((p) => ({ ...p, theme: "dark" }))
                    }
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold ${
                      localSettings.theme === "dark"
                        ? "border-[#0C46C4] bg-blue-50/50 text-[#0C46C4]"
                        : "border-gray-100 text-gray-400 grayscale"
                    }`}
                  >
                    <FaMoon
                      className={
                        localSettings.theme === "dark" ? "text-blue-600" : ""
                      }
                    />
                    Dark Mode
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Primary Accent Color
                </label>
                <div className="flex gap-4 flex-wrap bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setLocalSettings((p) => ({ ...p, primaryColor: color }))
                      }
                      className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm flex items-center justify-center transition-transform hover:scale-110 active:scale-90 cursor-pointer"
                      style={{ backgroundColor: color }}
                    >
                      {localSettings.primaryColor === color && (
                        <FaCheck
                          className={`text-xs drop-shadow-md ${color === "#FFFFFF" ? "text-gray-800" : "text-white"}`}
                        />
                      )}
                    </button>
                  ))}
                  {/* Custom Color Picker */}
                  <div className="relative group">
                    <input
                      type="color"
                      value={localSettings.primaryColor}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          primaryColor: e.target.value,
                        }))
                      }
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm cursor-pointer opacity-0 absolute inset-0 z-10"
                    />
                    <div
                      className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center transition-colors group-hover:border-blue-400 cursor-pointer"
                      style={{
                        backgroundColor: COLORS.includes(
                          localSettings.primaryColor,
                        )
                          ? "transparent"
                          : localSettings.primaryColor,
                      }}
                    >
                      {!COLORS.includes(localSettings.primaryColor) &&
                        localSettings.primaryColor && (
                          <FaCheck className="text-white text-xs drop-shadow-md" />
                        )}
                      {COLORS.includes(localSettings.primaryColor) && (
                        <span className="text-gray-400 text-lg">+</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Text Accent Color
                </label>
                <div className="flex gap-4 flex-wrap bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setLocalSettings((p) => ({
                          ...p,
                          textPrimaryColor: color,
                        }))
                      }
                      className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm flex items-center justify-center transition-transform hover:scale-110 active:scale-90 cursor-pointer"
                      style={{ backgroundColor: color }}
                    >
                      {localSettings.textPrimaryColor === color && (
                        <FaCheck
                          className={`text-xs drop-shadow-md ${color === "#FFFFFF" ? "text-gray-800" : "text-white"}`}
                        />
                      )}
                    </button>
                  ))}
                  {/* Custom Color Picker */}
                  <div className="relative group">
                    <input
                      type="color"
                      value={localSettings.textPrimaryColor}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          textPrimaryColor: e.target.value,
                        }))
                      }
                      className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer opacity-0 absolute inset-0 z-10"
                    />
                    <div
                      className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center transition-colors group-hover:border-blue-400 cursor-pointer"
                      style={{
                        backgroundColor: COLORS.includes(
                          localSettings.textPrimaryColor,
                        )
                          ? "transparent"
                          : localSettings.textPrimaryColor,
                      }}
                    >
                      {!COLORS.includes(localSettings.textPrimaryColor) &&
                        localSettings.textPrimaryColor && (
                          <FaCheck className="text-white text-xs drop-shadow-md" />
                        )}
                      {COLORS.includes(localSettings.textPrimaryColor) && (
                        <span className="text-gray-400 text-lg">+</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SettingCard>
          </div>

          {/* Sidebar: Live Preview */}
          <div className="flex flex-col gap-8">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col gap-6 overflow-hidden relative group">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700"></div>

                <h2 className="text-xl font-extrabold text-[var(--text-primary-color)] text-center relative">
                  Live Preview
                </h2>

                <div
                  className="w-full flex flex-col items-center gap-4 py-8 px-4 rounded-2xl text-white text-center shadow-lg transition-all duration-500 relative"
                  style={{ backgroundColor: localSettings.primaryColor }}
                >
                  <div className="w-16 h-16 bg-white backdrop-blur-md rounded-xl p-2.5 shadow-inner">
                    <img
                      src={localSettings.schoolLogo}
                      alt="preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-tight">
                      {localSettings.schoolName || "Unnamed School"}
                    </h3>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mt-1"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Dashboard Preview
                    </p>
                  </div>

                  {/* Simulated Nav items */}
                  <div className="w-full flex flex-col gap-2 mt-4 px-6 opacity-40">
                    <div className="h-2 w-full rounded-full bg-white/30"></div>
                    <div className="h-2 w-2/3 bg-white/30 rounded-full"></div>
                  </div>
                </div>

                {/* Dynamic Text Preview */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Text Color Preview
                  </label>
                  <h4
                    className="text-lg font-bold transition-colors duration-300"
                    style={{ color: localSettings.textPrimaryColor }}
                  >
                    Heading Preview
                  </h4>
                  <p
                    className="text-sm font-medium transition-colors duration-300"
                    style={{ color: localSettings.textPrimaryColor }}
                  >
                    This is how your primary text will look across the system.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Button Accent
                    </label>
                    <button
                      className="w-full py-3 rounded-xl text-white font-extrabold text-sm transition-all shadow-md active:scale-95 translate-y-0 hover:-translate-y-0.5"
                      onClick={handleSaveClick}
                      style={{ backgroundColor: localSettings.primaryColor }}
                    >
                      Save Settings
                    </button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 italic text-center leading-relaxed">
                      "Real-world looks: Changes will propagate to sidebars and
                      primary buttons."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 flex flex-col gap-6 relative animate-fade-in">
            {/* Close */}
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <FaTimes size={18} />
            </button>

            {/* Icon + Title */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: localSettings.primaryColor }}
              >
                <FaLock size={22} />
              </div>
              <h2 className="text-xl font-extrabold text-gray-800">
                Confirm Changes
              </h2>
              <p className="text-sm text-gray-500">
                Enter your current password to save all changes.
              </p>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showModalCurrentPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleConfirmSave()}
                  placeholder="Enter your current password"
                  className={`w-full px-4 py-3 pr-12 text-sm border rounded-xl focus:outline-none transition-all ${
                    confirmPasswordError
                      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 bg-gray-50 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-blue-50"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowModalCurrentPass((p) => !p)}
                  className="absolute hover:bg-transparent right-4 top-1/2 -translate-y-1/2 text-[var(--primary-color)] hover:text-[var(--primary-color)]/80 transition-colors"
                >
                  {showModalCurrentPass ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              {confirmPasswordError && (
                <p className="text-xs text-red-500 font-semibold mt-1 animate-pulse">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => setShowConfirmModal(false)}
                variant="reset"
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmSave}
                variant="primary"
                className="flex-1 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <FaSave size={14} />
                Confirm & Save
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Logo Preview Modal */}
      {isLogoPreviewOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white p-2 rounded-3xl shadow-2xl max-w-2xl w-full animate-zoom-in">
            <button
              onClick={() => setIsLogoPreviewOpen(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-red-500 transition-all cursor-pointer z-10"
            >
              <FaTimes size={20} />
            </button>
            <div className="w-full h-full max-h-[70vh] overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center object-cover p-8">
              <img
                src={localSettings.schoolLogo}
                alt="Logo Preview"
                className="max-w-full h-[50vh] object-cover drop-shadow-2xl"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-[var(--text-primary-color)]">
                Logo Preview
              </h3>
              <p className="text-sm text-gray-500">
                This is how your logo appears in the system.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Settings;
