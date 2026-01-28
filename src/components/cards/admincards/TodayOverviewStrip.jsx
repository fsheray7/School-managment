import React from "react";
import {
  FaUserCheck,
  FaUserMinus,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClipboardCheck,
} from "react-icons/fa";

const TodayOverviewStrip = () => {
  const overviewData = [
    {
      id: 1,
      label: "Today Attendance",
      value: "820 / 1000",
      subLabel: "Present",
      icon: <FaUserCheck />,
      color: "text-green-600",
    },
    {
      id: 2,
      label: "Teachers on Leave",
      value: "3",
      icon: <FaUserMinus />,
      color: "text-red-500",
    },
    {
      id: 3,
      label: "Classes Running Now",
      value: "12",
      icon: <FaChalkboardTeacher />,
      color: "text-blue-600",
    },
    {
      id: 4,
      label: "Today Meetings / Events",
      value: "3", // Sample value
      icon: <FaCalendarAlt />,
      color: "text-purple-600",
    },
    {
      id: 5,
      label: "Pending Approvals",
      value: "5",
      icon: <FaClipboardCheck />,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border-t-5 border-blue-600 p-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-between min-w-[900px] lg:min-w-0 lg:flex-nowrap gap-2 px-2">
        {overviewData.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-4 py-2 border-r last:border-r-0 border-gray-100 flex-1 justify-center whitespace-nowrap"
          >
            <div className={`text-xl ${item.color} bg-gray-50 p-2 rounded-lg`}>
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                {item.label}
              </span>
              <span className="text-sm font-bold text-gray-800">
                {item.value}{" "}
                {item.subLabel && (
                  <span className="text-[11px] font-normal text-gray-500">
                    ({item.subLabel})
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayOverviewStrip;
