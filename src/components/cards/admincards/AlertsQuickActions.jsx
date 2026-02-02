import React from "react";
import {
  FaUserPlus,
  FaFileInvoice,
  FaEnvelope,
  FaShieldAlt,
  FaExclamationTriangle,
  FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AlertsQuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: "Add Teacher",
      icon: <FaUserPlus />,
      path: "/add-teacher",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      label: "Add Student",
      icon: <FaUserPlus />,
      path: "/add-student",
      color: "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white",
    },
    {
      label: "Generate Fee",
      icon: <FaFileInvoice />,
      path: "/generate-fee",
      color:
        "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white",
    },
    {
      label: "Send Notice",
      icon: <FaEnvelope />,
      path: "/notice",
      color: "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white",
    },
  ];

  const alerts = [
    {
      id: 1,
      message: "Server maintenance scheduled for 10:00 PM tonight.",
      type: "info",
    },
    {
      id: 2,
      message: "3 student leave requests pending approval.",
      type: "warning",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border-t-5 border-[#0C46C4]">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaShieldAlt className="text-blue-600" /> Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => navigate(action.path)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 gap-2 text-sm font-semibold shadow-sm border border-transparent ${action.color}`}
            >
              <span className="text-xl">{action.icon}</span>
              <span className="text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white p-6 rounded-xl shadow-sm border-t-5  border-red-500">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaBell className="text-red-500" /> Critical Alerts
        </h3>
        <div className="flex flex-col gap-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${alert.type === "warning" ? "bg-amber-50 border-amber-100 text-amber-800" : "bg-blue-50 border-blue-100 text-blue-800"}`}
            >
              <FaExclamationTriangle className="mt-1 flex-shrink-0" />
              <p className="text-sm font-medium">{alert.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsQuickActions;
