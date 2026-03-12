import React from "react";

import { financeCardData } from "../../../data/finance/FinanceCardData";
import {
  FaMoneyBillWaveAlt,
  FaExclamationCircle,
  FaHandHoldingUsd,
  FaPercent,
} from "react-icons/fa";

const FinanceCards = () => {
  const feeInvoices = JSON.parse(localStorage.getItem("feeInvoices")) || [];
  const today = new Date().toISOString().split("T")[0];

  const totals = feeInvoices.reduce(
    (acc, inv) => {
      const payable = parseFloat(inv.totalPayable || 0);
      const paid = parseFloat(inv.amountPaid || 0);
      const discount = parseFloat(inv.discountAmount || 0);
      const isToday = inv.generatedAt && inv.generatedAt.startsWith(today);

      acc.totalCollected += paid;
      acc.pending += payable - paid;
      if (isToday) acc.todayCollected += paid;
      acc.totalDiscounts += discount;
      return acc;
    },
    { totalCollected: 0, pending: 0, todayCollected: 0, totalDiscounts: 0 },
  );

  const dynamicFinanceData = [
    {
      id: 1,
      title: "Total Monthly Collection",
      amount: `PKR ${totals.totalCollected.toLocaleString()}`,
      icon: FaMoneyBillWaveAlt,
      color: "border-green-500",
      iconBg: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      title: "Pending Fees",
      amount: `PKR ${totals.pending.toLocaleString()}`,
      icon: FaExclamationCircle,
      color: "border-red-500",
      iconBg: "bg-red-100 text-red-600",
    },
    {
      id: 3,
      title: "Today's Collection",
      amount: `PKR ${totals.todayCollected.toLocaleString()}`,
      icon: FaHandHoldingUsd,
      color: "border-blue-500",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      id: 4,
      title: "Scholarships / Discounts",
      amount: `PKR ${totals.totalDiscounts.toLocaleString()}`,
      icon: FaPercent,
      color: "border-purple-500",
      iconBg: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {dynamicFinanceData.map((item) => {
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
