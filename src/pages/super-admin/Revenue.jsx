import React, { useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import {
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaDownload,
} from "react-icons/fa";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import DataCard from "../../components/ui/DataCard";
import ActionButtons from "../../components/ui/ActionButtons";
import Button from "../../components/ui/Button";
import CustomDropdown from "../../components/ui/CustomDropdown";

const Revenue = () => {
  const { primaryColor } = useSettings();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  const metrics = [
    {
      title: "Net Revenue",
      value: "PKR 12,450,000",
      change: "+12.5%",
      isPositive: true,
    },
    {
      title: "Active Subscriptions",
      value: "148 Schools",
      change: "+4.2%",
      isPositive: true,
    },
    {
      title: "Pending Invoices",
      value: "PKR 450,000",
      change: "-2.1%",
      isPositive: false,
    },
    {
      title: "Avg. School Revenue",
      value: "PKR 84,121",
      change: "+5.1%",
      isPositive: true,
    },
  ];

  const transactions = [
    {
      id: "TRX-9921",
      school: "Beaconhouse",
      date: "Feb 12, 2026",
      amount: "PKR 45,000",
      status: "Paid",
    },
    {
      id: "TRX-9854",
      school: "City School",
      date: "Feb 10, 2026",
      amount: "PKR 65,000",
      status: "Paid",
    },
    {
      id: "TRX-9712",
      school: "Roots International",
      date: "Feb 08, 2026",
      amount: "PKR 35,000",
      status: "Pending",
    },
    {
      id: "TRX-9642",
      school: "LGS School",
      date: "Feb 05, 2026",
      amount: "PKR 55,000",
      status: "Paid",
    },
    {
      id: "TRX-9645",
      school: "CSC School",
      date: "Feb 25, 2026",
      amount: "PKR 155,000",
      status: "Paid",
    },
  ];

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    {
      header: "Transaction ID",
      key: "id",
      render: (tx) => (
        <span className="font-mono text-xs font-bold text-gray-500">
          {tx.id}
        </span>
      ),
    },
    {
      header: "School Name",
      key: "school",
      render: (tx) => (
        <span className="text-sm font-bold text-gray-700">{tx.school}</span>
      ),
    },
    {
      header: "Date",
      key: "date",
      render: (tx) => <span className="text-xs text-gray-500">{tx.date}</span>,
    },
    {
      header: "Amount",
      key: "amount",
      render: (tx) => (
        <span className="font-black text-xs text-gray-800">{tx.amount}</span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (tx) => (
        <span
          className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
            tx.status === "Paid"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-amber-100 text-amber-600"
          }`}
        >
          {tx.status}
        </span>
      ),
    },
  ];

  const renderMobileCard = (tx) => (
    <DataCard
      title={tx.school}
      fields={[
        { label: "ID", value: tx.id },
        { label: "Date", value: tx.date },
        { label: "Amount", value: tx.amount },
        {
          label: "Status",
          value: tx.status,
          render: (val) => (
            <span
              className={`font-black  text-[9px] uppercase ${
                val === "Paid" ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {val}
            </span>
          ),
        },
      ]}
      actions={<ActionButtons onView={() => {}} itemName={tx.school} />}
    />
  );

  return (
    <div className="p-4 md:p-6 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
        
        </div>
        <div className="flex items-center gap-3">
          <CustomDropdown
            options={[
              "Last 7 Days",
              "Last 30 Days",
              "Last 90 Days",
              "This Year",
            ]}
            value={timeRange}
            onChange={setTimeRange}
            triggerClassName="bg-white border-gray-100 rounded-2xl py-2.5 text-xs font-bold text-gray-600"
          />

          <Button
            onClick={() => {}}
            variant="ghost"
            className="flex items-center w-full gap-2 px-4 py-1  rounded-lg border  transition-all text-xs font-bold"
          >
            <FaDownload />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white px-6 py-3 border-t-8 border-[var(--primary-color)] rounded-2xl shadow-sm  group hover:shadow-md transition-all duration-300"
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {metric.title}
            </p>
            <div className="mt-4 flex items-end justify-between">
              <h3 className="text-md font-black text-gray-800 tracking-tight text-[var(--text-primary-color)]">
                {metric.value}
              </h3>
              <div
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[10px] font-bold ${
                  metric.isPositive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {metric.isPositive ? (
                  <FaArrowUp size={8} />
                ) : (
                  <FaArrowDown size={8} />
                )}
                {metric.change}
              </div>
            </div>
            {/* Simple sparkline placeholder */}
            <div className="h-1 w-full bg-gray-50 rounded-full mt-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${metric.isPositive ? "bg-emerald-400" : "bg-rose-400"}`}
                style={{ width: `${Math.random() * 40 + 60}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-3xl border-t-8 border-[var(--primary-color)] shadow-sm overflow-hidden p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 text-[var(--text-primary-color)]">
            Recent Billing Transactions
          </h2>
          <Button
            variant="ghost"
            className="text-xs font-bold text-blue-600 bg-transparent border-none p-0"
          >
            View All History
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={paginatedTransactions}
          renderMobileCard={renderMobileCard}
          emptyMessage="No transactions found."
        />

        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={transactions.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
