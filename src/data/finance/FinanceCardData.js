import {
  FaMoneyBillWave,
  FaExclamationCircle,
  FaHandHoldingUsd,
  FaPercent,
  FaMoneyBillWaveAlt,
} from "react-icons/fa";

export const financeCardData = [
  {
    id: 1,
    title: "Total Monthly Collection",
    amount: "PKR 5,450,000",
    icon: FaMoneyBillWaveAlt,
    color: "border-green-500",
    iconBg: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Pending Fees",
    amount: "PKR 820,000",
    icon: FaExclamationCircle,
    color: "border-red-500",
    iconBg: "bg-red-100 text-red-600",
  },
  {
    id: 3,
    title: "Today's Collection",
    amount: "PKR 142,500",
    icon: FaHandHoldingUsd,
    color: "border-blue-500",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    title: "Scholarships / Discounts",
    amount: "PKR 320,000",
    icon: FaPercent,
    color: "border-purple-500",
    iconBg: "bg-purple-100 text-purple-600",
  },
];
