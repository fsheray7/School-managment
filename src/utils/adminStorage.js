import { admins as defaultAdmins } from "../data/admindata/admins";

const ADMINS_STORAGE_KEY = "admins";

/**
 * Retrieves admins from localStorage, falling back to default seed data.
 * @returns {Array} The array of admin objects.
 */
export const getAdmins = () => {
  try {
    const storedAdmins = localStorage.getItem(ADMINS_STORAGE_KEY);
    // If nothing is in storage, seed it with default data and return that.
    if (!storedAdmins) {
      localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(defaultAdmins));
      return defaultAdmins;
    }
    return JSON.parse(storedAdmins);
  } catch (error) {
    console.error("Failed to retrieve admins from storage:", error);
    // Fallback to default data in case of parsing errors
    return defaultAdmins;
  }
};

/**
 * Saves an array of admin objects to localStorage.
 * @param {Array} admins The array of admin objects to save.
 */
export const saveAdmins = (admins) => {
  try {
    localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(admins));
  } catch (error) {
    console.error("Failed to save admins to storage:", error);
  }
};
