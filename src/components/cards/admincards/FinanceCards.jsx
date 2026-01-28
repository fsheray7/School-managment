import React from "react";
import {
  FaMoneyBillWave,
  FaExclamationCircle,
  FaHandHoldingUsd,
  FaPercent,
} from "react-icons/fa";

const FinanceCards = () => {
  const financeData = [
    {
      id: 1,
      title: "Total Monthly Collection",
      amount: "PKR 5,450,000",
      icon: <FaMoneyBillWave />,
      color: "border-green-500",
      iconBg: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      title: "Pending Fees",
      amount: "PKR 820,000",
      icon: <FaExclamationCircle />,
      color: "border-red-500",
      iconBg: "bg-red-100 text-red-600",
    },
    {
      id: 3,
      title: "Today's Collection",
      amount: "PKR 142,500",
      icon: <FaHandHoldingUsd />,
      color: "border-blue-500",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      id: 4,
      title: "Scholarships / Discounts",
      amount: "PKR 320,000",
      icon: <FaPercent />,
      color: "border-purple-500",
      iconBg: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {financeData.map((item) => (
        <div
          key={item.id}
          className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${item.color} flex items-center justify-between hover:scale-105 transition-transform duration-300`}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {item.title}
            </span>
            <span className="text-lg font-bold text-gray-800">
              {item.amount}
            </span>
          </div>
          <div className={`p-3 rounded-lg text-xl ${item.iconBg}`}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinanceCards;
