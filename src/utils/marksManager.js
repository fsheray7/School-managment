// Marks Management Utility for localStorage-based persistence
// Handles saving, loading, and updating student marks

const MARKS_STORAGE_KEY = "studentMarks";

/**
 * Get all marks from localStorage
 * @returns {Array} Array of marks records
 */
export const getStoredMarks = () => {
  try {
    const stored = localStorage.getItem(MARKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading marks from localStorage:", error);
    return [];
  }
};

/**
 * Save marks to localStorage
 * @param {Array} marks - Array of marks records to save
 */
const saveMarksToStorage = (marks) => {
  try {
    localStorage.setItem(MARKS_STORAGE_KEY, JSON.stringify(marks));
  } catch (error) {
    console.error("Error saving marks to localStorage:", error);
    throw new Error("Failed to save marks");
  }
};

/**
 * Calculate percentage from obtained and total marks
 * @param {number} obtained - Obtained marks
 * @param {number} total - Total marks
 * @returns {number} Percentage (rounded to 2 decimals)
 */
const calculatePercentage = (obtained, total) => {
  return parseFloat(((obtained / total) * 100).toFixed(2));
};

/**
 * Determine pass/fail status based on percentage
 * @param {number} percentage - Percentage score
 * @returns {string} "Pass" or "Fail"
 */
const getStatus = (percentage) => {
  return percentage >= 40 ? "Pass" : "Fail";
};

/**
 * Save or update marks for students
 * @param {Object} params - Parameters for saving marks
 * @param {Array} params.students - Array of students with their marks
 * @param {string} params.class - Class name
 * @param {string} params.section - Section name
 * @param {string} params.subject - Subject name
 * @param {string} params.terminal - Terminal (First/Second)
 * @param {number} params.totalMarks - Total marks (default 100)
 * @param {string} params.academicYear - Academic year
 * @returns {Object} Result with success status and message
 */
export const saveStudentMarks = ({
  students,
  class: className,
  section,
  subject,
  terminal,
  totalMarks = 100,
  academicYear = "2024-25",
}) => {
  try {
    const existingMarks = getStoredMarks();
    const timestamp = new Date().toISOString();

    students.forEach((student) => {
      const { studentId, obtainedMarks, rollNumber, fullName } = student;

      // Skip if no marks entered
      if (
        obtainedMarks === "" ||
        obtainedMarks === null ||
        obtainedMarks === undefined
      ) {
        return;
      }

      const percentage = calculatePercentage(obtainedMarks, totalMarks);
      const status = getStatus(percentage);

      // Create marks record
      const marksRecord = {
        studentId,
        rollNumber,
        fullName,
        class: className,
        section,
        subject,
        terminal,
        totalMarks,
        obtainedMarks: parseInt(obtainedMarks),
        percentage,
        status,
        academicYear,
        savedAt: timestamp,
      };

      // Find existing record for this student/class/section/subject/terminal
      const existingIndex = existingMarks.findIndex(
        (m) =>
          m.studentId === studentId &&
          m.class === className &&
          m.section === section &&
          m.subject === subject &&
          m.terminal === terminal,
      );

      if (existingIndex !== -1) {
        // Update existing record
        existingMarks[existingIndex] = marksRecord;
      } else {
        // Add new record
        existingMarks.push(marksRecord);
      }
    });

    saveMarksToStorage(existingMarks);

    return {
      success: true,
      message: `Marks saved successfully for ${students.filter((s) => s.obtainedMarks !== "" && s.obtainedMarks !== null).length} students`,
    };
  } catch (error) {
    console.error("Error saving marks:", error);
    return {
      success: false,
      message: "Failed to save marks. Please try again.",
    };
  }
};

/**
 * Get marks for a specific student, class, section, subject, and terminal
 * @param {number} studentId - Student ID
 * @param {string} className - Class name
 * @param {string} section - Section name
 * @param {string} subject - Subject name
 * @param {string} terminal - Terminal (First/Second)
 * @returns {Object|null} Marks record or null if not found
 */
export const getStudentMarks = (
  studentId,
  className,
  section,
  subject,
  terminal,
) => {
  const storedMarks = getStoredMarks();
  return (
    storedMarks.find(
      (m) =>
        m.studentId === studentId &&
        m.class === className &&
        m.section === section &&
        m.subject === subject &&
        m.terminal === terminal,
    ) || null
  );
};

/**
 * Get all marks for a specific class and section
 * @param {string} className - Class name
 * @param {string} section - Section name
 * @returns {Array} Array of marks records
 */
export const getClassMarks = (className, section) => {
  const storedMarks = getStoredMarks();
  return storedMarks.filter(
    (m) => m.class === className && m.section === section,
  );
};

/**
 * Get aggregated marks for a student (all subjects, latest terminal)
 * @param {number} studentId - Student ID
 * @param {string} className - Class name
 * @param {string} section - Section name
 * @returns {Object} Aggregated marks with overall percentage and status
 */
export const getStudentAggregatedMarks = (studentId, className, section) => {
  const storedMarks = getStoredMarks();
  const studentMarks = storedMarks.filter(
    (m) =>
      m.studentId === studentId &&
      m.class === className &&
      m.section === section,
  );

  if (studentMarks.length === 0) {
    return null;
  }

  // Group by subject and get latest terminal
  const latestMarks = {};
  studentMarks.forEach((mark) => {
    const key = mark.subject;
    if (
      !latestMarks[key] ||
      new Date(mark.savedAt) > new Date(latestMarks[key].savedAt)
    ) {
      latestMarks[key] = mark;
    }
  });

  const subjects = Object.values(latestMarks);
  const totalObtained = subjects.reduce((sum, s) => sum + s.obtainedMarks, 0);
  const totalPossible = subjects.reduce((sum, s) => sum + s.totalMarks, 0);
  const overallPercentage = calculatePercentage(totalObtained, totalPossible);
  const overallStatus = subjects.every((s) => s.status === "Pass")
    ? "Pass"
    : "Fail";

  return {
    studentId,
    class: className,
    section,
    subjects,
    totalObtainedMarks: totalObtained,
    totalPossibleMarks: totalPossible,
    overallPercentage,
    overallStatus,
  };
};

/**
 * Delete all marks (for testing/reset purposes)
 */
export const clearAllMarks = () => {
  try {
    localStorage.removeItem(MARKS_STORAGE_KEY);
    return { success: true, message: "All marks cleared successfully" };
  } catch (error) {
    console.error("Error clearing marks:", error);
    return { success: false, message: "Failed to clear marks" };
  }
};

export default {
  getStoredMarks,
  saveStudentMarks,
  getStudentMarks,
  getClassMarks,
  getStudentAggregatedMarks,
  clearAllMarks,
};
