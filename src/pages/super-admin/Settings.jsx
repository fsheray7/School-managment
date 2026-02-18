import React, { useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import Button from "../../components/ui/Button";
import DynamicForm from "../../components/ui/DynamicForm";
import {
  FaShieldAlt,
  FaSave,
  FaLaptopCode,
  FaEye,
  FaEyeSlash,
  FaTimes,
  FaLock,
} from "react-icons/fa";
import { useToast } from "../../context/ToastContext";

const Settings = () => {
  const { showToast } = useToast();
  const {
    systemName,
    systemLogo,
    superAdminUsername,
    superAdminPassword,
    updateSettings,
    primaryColor,
  } = useSettings();

  const [localSettings, setLocalSettings] = useState({
    systemName,
    systemLogo,
    superAdminUsername,
  });

  const [passwordFields, setPasswordFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const identityFields = [
    {
      label: "Platform Logo",
      name: "systemLogo",
      type: "image",
      fullWidth: true,
    },
    {
      label: "System Name",
      name: "systemName",
      type: "input",
      inputType: "text",
      fullWidth: true,
      placeholder: "e.g., Antigravity SaaS",
    },
  ];

  const credentialFields = [
    {
      label: "New Password",
      name: "newPassword",
      type: "input",
      inputType: "password",
      placeholder: "Leave blank to keep current",
    },
    {
      label: "Confirm New Password",
      name: "confirmPassword",
      type: "input",
      inputType: "password",
      placeholder: "Repeat new password",
    },
  ];

  // Called when user clicks Save — opens confirmation modal
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

  // Called when user confirms password in modal
  const handleConfirmSave = async () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please enter your current password.");
      return;
    }
    if (confirmPassword !== superAdminPassword) {
      setConfirmPasswordError("Incorrect password. Please try again.");
      return;
    }

    // If systemLogo is a File, convert to base64 data URL so it persists in localStorage
    let resolvedLogo = localSettings.systemLogo;
    if (localSettings.systemLogo instanceof File) {
      resolvedLogo = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(localSettings.systemLogo);
      });
      // Also update localSettings so the preview stays correct
      setLocalSettings((prev) => ({ ...prev, systemLogo: resolvedLogo }));
    }

    const updates = {
      systemName: localSettings.systemName,
      systemLogo: resolvedLogo,
      superAdminUsername: localSettings.superAdminUsername,
    };
    if (passwordFields.newPassword) {
      updates.superAdminPassword = passwordFields.newPassword;
    }

    updateSettings(updates);
    showToast("Settings updated successfully!", "success");

    setPasswordFields({ newPassword: "", confirmPassword: "" });
    setConfirmPassword("");
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="w-full flex px-4 mt-5 mb-5 flex-col lg:flex-row gap-8 items-start">
        {/* Settings Forms */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          {/* System Identity Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <FaLaptopCode size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">
                System Identity
              </h2>
            </div>
            <div className="p-6">
              <DynamicForm
                fields={identityFields}
                formData={localSettings}
                setFormData={setLocalSettings}
                showDefaultHeader={false}
                buttonAreaClassName="hidden"
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              />
            </div>
          </div>

          {/* Credentials Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <FaShieldAlt size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">
                Account Credentials
              </h2>
            </div>
            <div className="p-6 flex flex-col gap-6">
              {/* Username field — shows current and allows update */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                  Username
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-500 font-semibold border border-gray-200 min-w-[160px]">
                    <span className="text-gray-400 text-xs uppercase tracking-wider">
                      Current:
                    </span>
                    <span className="text-gray-700">{superAdminUsername}</span>
                  </div>
                  <input
                    type="text"
                    value={localSettings.superAdminUsername}
                    onChange={(e) =>
                      setLocalSettings((p) => ({
                        ...p,
                        superAdminUsername: e.target.value,
                      }))
                    }
                    placeholder="New username"
                    className="flex-1 w-full px-3 py-2.5 text-xs md:text-sm border border-gray-300 rounded-xl bg-gray-50/30 focus:bg-white focus:border-[var(--primary-color)] shadow-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password fields */}
              <DynamicForm
                fields={credentialFields}
                formData={passwordFields}
                setFormData={setPasswordFields}
                showDefaultHeader={false}
                buttonAreaClassName="hidden"
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveClick}
              variant="primary"
              className="px-10 rounded-2xl shadow-xl shadow-[var(--primary-color)]/20 transition-all font-black flex justify-center items-center gap-2"
            >
              <FaSave />
              Save All Changes
            </Button>
          </div>
        </div>

        {/* Live Preview Sidebar */}
        <div className="w-full lg:w-80 sticky top-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col gap-6 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700"></div>

            <h2 className="text-xl font-extrabold text-[var(--text-primary-color)] text-center relative">
              System Preview
            </h2>

            <div
              className="w-full flex flex-col items-center gap-4 py-8 px-4 rounded-2xl text-white text-center shadow-lg transition-all duration-500 relative"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="w-16 h-16 bg-white backdrop-blur-md rounded-xl p-2.5 shadow-inner flex items-center justify-center overflow-hidden">
                <img
                  src={
                    localSettings.systemLogo instanceof File
                      ? URL.createObjectURL(localSettings.systemLogo)
                      : typeof localSettings.systemLogo === "string" &&
                          localSettings.systemLogo
                        ? localSettings.systemLogo
                        : "/logo/superlogo.png"
                  }
                  alt="preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold leading-tight">
                  {localSettings.systemName || "System Name"}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-70">
                  Super Admin Panel
                </p>
              </div>

              {/* Simulated Navigation */}
              <div className="w-full flex flex-col gap-2 mt-4 px-6 opacity-30">
                <div className="h-2 w-full rounded-full bg-white"></div>
                <div className="h-2 w-2/3 bg-white rounded-full"></div>
                <div className="h-2 w-full rounded-full bg-white opacity-50"></div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-center text-gray-500 italic font-medium">
                  "This preview shows how the logo and system name appear
                  globally on the platform."
                </p>
              </div>
              <Button
                onClick={handleSaveClick}
                variant="primary"
                className="w-full   shadow-xl shadow-[var(--primary-color)]/20 transition-all font-black flex justify-center items-center gap-2"
              >
                <FaSave />
                Save Changes
              </Button>
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
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-[var(--primary-color)]"
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
                  type={showConfirmPass ? "text" : "password"}
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
                  onClick={() => setShowConfirmPass((p) => !p)}
                  className="absolute hover:bg-none right-4 top-1/2 -translate-y-1/2 text-[var(--primary-color)] hover:text-[var(--primary-color)]/80 transition-colors"
                >
                  {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
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
    </>
  );
};

export default Settings;
