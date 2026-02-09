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
    <div
      className="w-full bg-white rounded-xl shadow-sm border-t-5 p-4 lg:p-2"
      style={{ borderTopColor: "var(--primary-color)" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-0 w-full">
        {overviewData.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 p-3 rounded-lg lg:p-2 lg:rounded-none lg:border-none lg:shadow-none border border-gray-100 shadow-sm bg-gray-50 lg:bg-transparent lg:border-r lg:last:border-r-0 lg:border-gray-200 lg:flex-1 lg:justify-center whitespace-nowrap transition-all duration-200 hover:shadow-md lg:hover:shadow-none"
          >
            <div
              className={`text-xl ${item.color} bg-white lg:bg-gray-50 p-2 rounded-lg shadow-sm lg:shadow-none`}
            >
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-500 lg:text-gray-400 tracking-wider">
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
