import { IoCheckmarkDoneSharp, IoAlertCircleSharp } from "react-icons/io5";
import {
  FaBook,
  FaClipboardList,
  FaQuestionCircle,
  FaUserPlus,
  FaMoneyBillWave,
  FaBullhorn,
} from "react-icons/fa";
import { getNoticesForUser } from "./noticeManager";

/**
 * Get dynamic notifications for a student
 * @param {Object} student - Current student object from session
 * @returns {Array} List of notifications
 */
export const getStudentNotifications = (student) => {
  const notifications = [];
  if (!student) return [];

  // 1. Check Homework
  const homework = JSON.parse(localStorage.getItem("homeworkData")) || [];
  const myHomework = homework.filter(
    (hw) => hw.class === student.class && hw.section === student.section,
  );

  if (myHomework.length > 0) {
    const latestHw = myHomework[0];
    notifications.push({
      id: `hw-${latestHw.id}`,
      title: `New Homework: ${latestHw.subject}`,
      time: latestHw.date,
      type: "info",
      icon: <FaBook className="text-blue-500" />,
      link: "/homework-student",
    });
  }

  // 2. Check Attendance (Today)
  const attendance = JSON.parse(localStorage.getItem("attendanceData")) || {};
  const today = new Date().toISOString().split("T")[0];
  if (attendance[today] && attendance[today][student.id]) {
    notifications.push({
      id: `att-${today}`,
      title: `Attendance Marked: ${attendance[today][student.id]}`,
      time: "Today",
      type: "success",
      icon: <IoCheckmarkDoneSharp className="text-green-500" />,
      link: "/attendance-student",
    });
  }

  // 3. Check Doubt Answers
  const doubts = JSON.parse(localStorage.getItem("doubtsData")) || [];
  const myAnsweredDoubts = doubts.filter(
    (d) => d.studentId === student.id && d.status === "Answered",
  );
  if (myAnsweredDoubts.length > 0) {
    const latestAnswer = myAnsweredDoubts[myAnsweredDoubts.length - 1];
    notifications.push({
      id: `ans-${latestAnswer.id}`,
      title: `Teacher replied to: ${latestAnswer.subject}`,
      time: latestAnswer.date,
      type: "success",
      icon: <FaQuestionCircle className="text-indigo-500" />,
      link: "/questions",
    });
  }

  // 4. Check Marks
  const marks = JSON.parse(localStorage.getItem("studentMarks")) || [];
  const myMarks = marks.filter((m) => m.studentId === student.id);
  if (myMarks.length > 0) {
    const latestMark = myMarks[myMarks.length - 1];
    notifications.push({
      id: `mark-${latestMark.savedAt}`,
      title: `New Result: ${latestMark.subject} (${latestMark.terminal})`,
      time: new Date(latestMark.savedAt).toLocaleDateString(),
      type: "warning",
      icon: <FaClipboardList className="text-amber-500" />,
      link: "/results-student",
    });
  }

  // 5. Check Notices
  const myNotices = getNoticesForUser(
    "student",
    student.class,
    student.section,
  );
  myNotices.forEach((notice) => {
    notifications.push({
      id: `notice-${notice.id}`,
      title: `Notice: ${notice.title}`,
      time: new Date(notice.createdAt).toLocaleDateString(),
      type: notice.isImportant ? "warning" : "info",
      icon: (
        <FaBullhorn
          className={notice.isImportant ? "text-red-500" : "text-blue-500"}
        />
      ),
      link: "/student-dashboard", // Logic for preview will be on dashboard
    });
  });

  return notifications.sort((a, b) => {
    if (a.id.startsWith("notice") && !b.id.startsWith("notice")) return -1;
    return b.id.localeCompare(a.id);
  });
};

/**
 * Get dynamic notifications for a teacher
 * @param {Object} teacher - Current teacher object from session
 * @returns {Array} List of notifications
 */
export const getTeacherNotifications = (teacher) => {
  const notifications = [];
  if (!teacher) return [];

  // 1. Check New Doubts
  const doubts = JSON.parse(localStorage.getItem("doubtsData")) || [];
  const pendingDoubts = doubts.filter((d) => d.status === "Pending");

  if (pendingDoubts.length > 0) {
    const latestDoubt = pendingDoubts[pendingDoubts.length - 1];
    notifications.push({
      id: `doubt-${latestDoubt.id}`,
      title: `New Doubt from ${latestDoubt.studentName}`,
      time: latestDoubt.date,
      type: "warning",
      icon: <IoAlertCircleSharp className="text-amber-500" />,
      link: "/solutions",
    });
  }

  // 2. Check Notices
  const myNotices = getNoticesForUser("teacher");
  myNotices.forEach((notice) => {
    notifications.push({
      id: `notice-${notice.id}`,
      title: `Notice: ${notice.title}`,
      time: new Date(notice.createdAt).toLocaleDateString(),
      type: notice.isImportant ? "warning" : "info",
      icon: (
        <FaBullhorn
          className={notice.isImportant ? "text-red-500" : "text-blue-500"}
        />
      ),
      link: "/teacher-dashboard",
    });
  });

  return notifications;
};

/**
 * Get dynamic notifications for an admin
 * @returns {Array} List of notifications
 */
export const getAdminNotifications = () => {
  // Admin notifications can be more global
  const notifications = [
    {
      id: "admin-1",
      title: "New Teacher Registration",
      time: "1 hour ago",
      type: "success",
      icon: <FaUserPlus className="text-green-500" />,
      link: "/add-teacher",
    },
    {
      id: "admin-2",
      title: "Monthly Fee Generation Due",
      time: "2 days left",
      type: "warning",
      icon: <FaMoneyBillWave className="text-amber-500" />,
      link: "/generate-fee",
    },
  ];

  // Also show latest notices in admin for reference
  const latestNotices = getNoticesForUser("admin").slice(0, 3);
  latestNotices.forEach((notice) => {
    notifications.push({
      id: `notice-${notice.id}`,
      title: `Notice Sent: ${notice.title}`,
      time: new Date(notice.createdAt).toLocaleDateString(),
      type: "info",
      icon: <FaBullhorn className="text-gray-500" />,
      link: "/notice-admin",
    });
  });

  return notifications;
};
