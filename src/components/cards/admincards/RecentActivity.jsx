import React, { useState, useEffect } from "react";
import {
  FaUserPlus,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaExclamationCircle,
  FaChalkboardTeacher,
  FaBook,
  FaGraduationCap,
} from "react-icons/fa";
import {
  getRecentActivities,
  formatRelativeTime,
} from "../../../utils/activityManager";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  const loadActivities = () => {
    const data = getRecentActivities();
    setActivities(data);
  };

  useEffect(() => {
    loadActivities();

    // Listen for custom activity updates
    window.addEventListener("activityUpdated", loadActivities);
    return () => window.removeEventListener("activityUpdated", loadActivities);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "STUDENT_ADDED":
        return { icon: <FaUserPlus />, bg: "bg-blue-100 text-blue-600" };
      case "TEACHER_ADDED":
        return {
          icon: <FaChalkboardTeacher />,
          bg: "bg-purple-100 text-purple-600",
        };
      case "FEE_GENERATED":
        return {
          icon: <FaFileInvoiceDollar />,
          bg: "bg-amber-100 text-amber-600",
        };
      case "FEE_PAID":
        return { icon: <FaCheckCircle />, bg: "bg-green-100 text-green-600" };
      case "CLASS_ADDED":
      case "COURSE_ADDED":
        return {
          icon: <FaGraduationCap />,
          bg: "bg-indigo-100 text-indigo-600",
        };
      case "SUBJECT_ADDED":
        return { icon: <FaBook />, bg: "bg-pink-100 text-pink-600" };
      default:
        return {
          icon: <FaExclamationCircle />,
          bg: "bg-gray-100 text-gray-600",
        };
    }
  };

  return (
    <div
      className="w-full bg-white p-6 rounded-xl shadow-sm border-t-5"
      style={{ borderTopColor: "var(--primary-color)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[var(--text-primary-color)]">
          Recent Activity
        </h3>
        <button
          className="text-sm font-semibold hover:underline"
          style={{ color: "var(--primary-color)" }}
        >
          View All
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {activities.length > 0 ? (
          activities.map((activity) => {
            const { icon, bg } = getIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 group transition-all duration-300"
              >
                <div
                  className={`p-3 rounded-full text-lg ${bg} transition-transform group-hover:scale-110 shadow-sm`}
                >
                  {icon}
                </div>
                <div className="flex-1 border-b border-gray-50 pb-4 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">
                      {activity.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-gray-400 whitespace-nowrap">
                      {formatRelativeTime(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400 italic text-sm">
            <FaExclamationCircle className="text-3xl mb-2 opacity-20" />
            No recent activities found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
