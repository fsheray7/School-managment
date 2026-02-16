// Doubts Management Utility for localStorage-based persistence
// Handles saving, listing, and answering questions

const DOUBTS_STORAGE_KEY = "doubtsData";

/**
 * Get all doubts from localStorage
 * @returns {Array} Array of doubt records
 */
export const getStoredDoubts = () => {
  try {
    const stored = localStorage.getItem(DOUBTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading doubts from localStorage:", error);
    return [];
  }
};

/**
 * Save doubts to localStorage
 * @param {Array} doubts - Array of doubt records to save
 */
const saveDoubtsToStorage = (doubts) => {
  try {
    localStorage.setItem(DOUBTS_STORAGE_KEY, JSON.stringify(doubts));
  } catch (error) {
    console.error("Error saving doubts to localStorage:", error);
    throw new Error("Failed to save doubts");
  }
};

/**
 * Save a new question
 * @param {Object} params
 * @param {number} params.studentId
 * @param {string} params.studentName
 * @param {string} params.class
 * @param {string} params.section
 * @param {string} params.subject
 * @param {string} params.question
 * @param {string} params.questionFile - Base64 string (optional)
 * @returns {Object} Result
 */
export const askQuestion = ({
  studentId,
  studentName,
  class: className,
  section,
  subject,
  question,
  questionFile = null,
}) => {
  try {
    const doubts = getStoredDoubts();
    const newDoubt = {
      id: Date.now(),
      studentId,
      studentName,
      class: className,
      section,
      subject,
      question,
      questionFile,
      answer: null,
      answerFile: null,
      status: "Pending",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      createdAt: new Date().toISOString(),
    };

    doubts.push(newDoubt);
    saveDoubtsToStorage(doubts);

    return { success: true, message: "Question submitted successfully!" };
  } catch (error) {
    console.error("Error asking question:", error);
    return { success: false, message: "Failed to submit question." };
  }
};

/**
 * Get questions for a specific student
 * @param {number} studentId
 * @returns {Array} Student's doubts
 */
export const getStudentDoubts = (studentId) => {
  const doubts = getStoredDoubts();
  return doubts
    .filter((d) => d.studentId === studentId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

/**
 * Get pending questions for a teacher (can filter by class/section)
 * @param {string} [className]
 * @param {string} [section]
 * @returns {Array} Pending doubts
 */
export const getPendingDoubts = (className = null, section = null) => {
  const doubts = getStoredDoubts();
  return doubts
    .filter((d) => {
      const classMatch = className ? d.class === className : true;
      const sectionMatch = section ? d.section === section : true;
      const isPending = d.status === "Pending";
      return classMatch && sectionMatch && isPending;
    })
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Oldest first for teachers
};

/**
 * Answer a question
 * @param {number} doubtId
 * @param {string} answer
 * @param {string} answerFile - Base64 string (optional)
 * @returns {Object} Result
 */
export const answerDoubt = (doubtId, answer, answerFile = null) => {
  try {
    const doubts = getStoredDoubts();
    const doubtIndex = doubts.findIndex((d) => d.id === doubtId);

    if (doubtIndex === -1) {
      return { success: false, message: "Question not found." };
    }

    doubts[doubtIndex].answer = answer;
    doubts[doubtIndex].answerFile = answerFile;
    doubts[doubtIndex].status = "Answered";
    doubts[doubtIndex].answeredAt = new Date().toISOString();

    saveDoubtsToStorage(doubts);
    return { success: true, message: "Answer sent successfully!" };
  } catch (error) {
    console.error("Error answering doubt:", error);
    return { success: false, message: "Failed to send answer." };
  }
};

/**
 * Get a specific doubt by ID
 * @param {number} doubtId
 * @returns {Object|null}
 */
export const getDoubtById = (doubtId) => {
  const doubts = getStoredDoubts();
  return doubts.find((d) => d.id === parseInt(doubtId, 10)) || null;
};
