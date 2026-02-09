import React from "react";
import {
  FaUserPlus,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      title: "New student registration",
      description: "Amir Khan enrolled in Class 10 (Section A)",
      time: "15 mins ago",
      icon: <FaUserPlus />,
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Fee Payment Received",
      description: "Sarah Ahmed paid monthly fee for June",
      time: "45 mins ago",
      icon: <FaFileInvoiceDollar />,
      iconBg: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Teacher Attendance Marked",
      description: "Mr. Usman marked attendance for morning shift",
      time: "1 hour ago",
      icon: <FaCheckCircle />,
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Leave Request Submitted",
      description: "Ms. Aisha (Teacher) requested leave for Friday",
      time: "2 hours ago",
      icon: <FaExclamationCircle />,
      iconBg: "bg-amber-100 text-amber-600",
    },
  ];

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
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 group">
            <div
              className={`p-3 rounded-full text-lg ${activity.iconBg} transition-transform group-hover:scale-110`}
            >
              {activity.icon}
            </div>
            <div className="flex-1 border-b border-gray-50 pb-4 last:border-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-gray-800 text-sm md:text-base">
                  {activity.title}
                </h4>
                <span className="text-[11px] font-semibold text-gray-400 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
