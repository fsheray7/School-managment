import React from "react";

import { financeCardData } from "../../../data/finance/FinanceCardData";

const FinanceCards = () => {
  const financeData = financeCardData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {financeData.map((item) => {
        const Icon = item.icon;
        return (
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
              <Icon />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FinanceCards;
