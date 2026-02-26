/**
 * Activity Manager Utility
 * Handles recording and retrieval of system activities for the Admin Dashboard.
 */

const ACTIVITY_KEY = "admin_activities";
const MAX_ACTIVITIES = 20;

export const ACTIVITY_TYPES = {
  STUDENT_ADDED: "STUDENT_ADDED",
  TEACHER_ADDED: "TEACHER_ADDED",
  FEE_GENERATED: "FEE_GENERATED",
  FEE_PAID: "FEE_PAID",
  CLASS_ADDED: "CLASS_ADDED",
  SUBJECT_ADDED: "SUBJECT_ADDED",
  COURSE_ADDED: "COURSE_ADDED", // Adding this based on user request
};

/**
 * Record a new activity
 * @param {string} type - Use ACTIVITY_TYPES
 * @param {string} title - short title of activity
 * @param {string} description - detailed description
 */
export const recordActivity = (type, title, description) => {
  try {
    const existingActivities =
      JSON.parse(localStorage.getItem(ACTIVITY_KEY)) || [];
    const newActivity = {
      id: Date.now(),
      type,
      title,
      description,
      timestamp: new Date().toISOString(),
    };

    const updatedActivities = [newActivity, ...existingActivities].slice(
      0,
      MAX_ACTIVITIES,
    );
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updatedActivities));

    // Dispatch custom event to notify listeners (like RecentActivity component)
    window.dispatchEvent(new Event("activityUpdated"));
  } catch (error) {
    console.error("Error recording activity:", error);
  }
};

/**
 * Get recent activities
 * @returns {Array} List of activity objects
 */
export const getRecentActivities = () => {
  try {
    return JSON.parse(localStorage.getItem(ACTIVITY_KEY)) || [];
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
};

/**
 * Format timestamp to relative time (e.g., "5 mins ago")
 * @param {string} timestamp
 * @returns {string}
 */
export const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const diff = now - new Date(timestamp);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  return new Date(timestamp).toLocaleDateString();
};
