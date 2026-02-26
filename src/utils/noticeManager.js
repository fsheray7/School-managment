const NOTICES_STORAGE_KEY = "schoolNotices";
const MAX_NOTICES = 30; // Limit total notices to save space

/**
 * Get all active (non-expired) notices
 * @returns {Array} List of active notices
 */
export const getActiveNotices = () => {
  try {
    const stored = localStorage.getItem(NOTICES_STORAGE_KEY);
    const notices = stored ? JSON.parse(stored) : [];
    const now = new Date().getTime();

    // Filter out expired notices
    const activeNotices = notices.filter((notice) => {
      if (!notice.expiryDate) return true;
      const expiry = new Date(notice.expiryDate).getTime();
      return expiry > now;
    });

    // Update storage if any expired notices were removed
    if (activeNotices.length !== notices.length) {
      saveNotices(activeNotices);
    }

    return activeNotices.sort((a, b) => {
      // Sort important notices first
      if (a.isImportant && !b.isImportant) return -1;
      if (!a.isImportant && b.isImportant) return 1;
      // Then sort by date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } catch (error) {
    console.error("Error loading notices:", error);
    return [];
  }
};

/**
 * Save notices to localStorage with quota error handling
 * @param {Array} notices
 */
const saveNotices = (notices) => {
  let listToSave = [...notices];

  // Enforce Max Limit
  if (listToSave.length > MAX_NOTICES) {
    listToSave = listToSave.slice(0, MAX_NOTICES);
  }

  try {
    localStorage.setItem(NOTICES_STORAGE_KEY, JSON.stringify(listToSave));
    return true;
  } catch (error) {
    if (
      error.name === "QuotaExceededError" ||
      error.name === "NS_ERROR_DOM_QUOTA_REACHED"
    ) {
      console.warn("LocalStorage Quota Exceeded! Attempting cleanup...");

      // Strategy: Remove the oldest non-important notice
      if (listToSave.length > 1) {
        // Find oldest one (last in list)
        listToSave.pop();
        return saveNotices(listToSave); // Recursive retry
      }
    }
    console.error("Critical error saving notices:", error);
    return false;
  }
};

/**
 * Add a new notice
 * @param {Object} noticeData
 * @returns {Object} Result
 */
export const addNotice = (noticeData) => {
  try {
    const notices = getActiveNotices();
    const newNotice = {
      ...noticeData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    notices.unshift(newNotice);
    const success = saveNotices(notices);

    if (success) {
      return {
        success: true,
        message: "Notice posted successfully!",
        notice: newNotice,
      };
    } else {
      return {
        success: false,
        message:
          "Storage is full. Please delete some old data or try a smaller attachment.",
      };
    }
  } catch (error) {
    console.error("Error adding notice:", error);
    return { success: false, message: "Failed to post notice due to error." };
  }
};

/**
 * Delete a notice
 * @param {number} id
 */
export const deleteNotice = (id) => {
  try {
    const notices = getActiveNotices();
    const filtered = notices.filter((n) => n.id !== id);
    saveNotices(filtered);
    return { success: true };
  } catch (error) {
    console.error("Error deleting notice:", error);
    return { success: false };
  }
};

/**
 * Filter notices for a specific role and optionally class/section
 */
export const getNoticesForUser = (role, className = null, section = null) => {
  const notices = getActiveNotices();

  return notices.filter((notice) => {
    // 1. Check audience
    if (notice.audience === "All") return true;

    if (role === "admin") return true; // Admin sees everything

    if (role === "teacher" && notice.audience === "Teachers") return true;

    if (role === "student" && notice.audience === "Students") {
      // Targeted Class/Section
      if (!notice.class || notice.class === "All") return true; // All students
      if (notice.class !== className) return false;
      if (!notice.section || notice.section === "All") return true; // All sections of this class
      return notice.section === section;
    }

    // Role specific management: Include notices sent BY this user
    if (className && notice.author === className) return true;

    return false;
  });
};
