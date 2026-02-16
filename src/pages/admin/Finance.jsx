import React, { useState } from "react";
import FinanceCards from "../../components/cards/admincards/FinanceCards";
import FinanceTrendChart from "../../charts/finance/FinanceTrendChart";
import { FaFileInvoiceDollar, FaDownload, FaSearch } from "react-icons/fa";
import { transactionData } from "../../data/finance/TransactionData";
import InvoiceModal from "../../components/finance/InvoiceModal";
import Pagination from "../../components/ui/Pagination";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";
import DataCard from "../../components/ui/DataCard";
import Button from "../../components/ui/Button";

const Finance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter transactions
  const filteredTransactions = transactionData.filter(
    (txn) =>
      txn.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination Logic
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // View Invoice Handler
  const handleViewInvoice = (txn) => {
    setSelectedTransaction(txn);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  // Get recent activity (e.g., last 3 paid transactions)
  const recentActivity = transactionData
    .slice(0, 10)
    .filter((txn) => txn.status === "Paid")
    .slice(0, 3);

  // DataTable Configuration
  const columns = [
    {
      header: "Txn ID",
      key: "id",
      fontBold: true,
      render: (txn) => (
        <span style={{ color: "var(--primary-color)" }}>{txn.id}</span>
      ),
    },
    { header: "Student", key: "studentName", fontBold: true },
    { header: "Class", key: "class" },
    { header: "Amount", key: "amount", fontBold: true },
    { header: "Date", key: "date", hiddenOnMobile: true },
    { header: "Method", key: "method", hiddenOnMobile: true },
    {
      header: "Status",
      key: "status",
      render: (txn) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            txn.status === "Paid"
              ? "bg-green-100 text-green-700"
              : txn.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {txn.status}
        </span>
      ),
    },
  ];

  const renderMobileCard = (txn) => (
    <DataCard
      title={txn.studentName}
      fields={[
        { label: "ID", value: txn.id },
        { label: "Class", value: txn.class },
        { label: "Amount", value: txn.amount },
        { label: "Date", value: txn.date },
        {
          label: "Status",
          value: txn.status,
          render: (val) => (
            <span
              className={`font-semibold ${
                val === "Paid"
                  ? "text-green-600"
                  : val === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {val}
            </span>
          ),
        },
      ]}
      actions={
        <ActionButtons
          onView={() => handleViewInvoice(txn)}
          itemName={txn.studentName}
        />
      }
    />
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary-color)]">
            Finance & Accounts
          </h1>
          <p className="text-sm text-gray-500">
            Overview of school financial status and fee collections.
          </p>
        </div>
        <Button
        variant="primary"
        >
          <FaDownload /> Export Report
        </Button>
      </div>

      {/* Finance Cards */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-1 rounded-full bg-blue-700"></div>
          <h2 className="text-lg font-bold text-[var(--text-primary-color)]">
            Financial Summary
          </h2>
        </div>
        <FinanceCards />
      </section>

      {/* Charts & Detailed Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-1 rounded-full bg-blue-700"></div>
            <h2 className="text-lg w-full font-bold text-[var(--text-primary-color)]">
              Collection Trends
            </h2>
          </div>
          <FinanceTrendChart />
        </section>

        <section
          className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm mt-11 border-t-8"
          style={{ borderTopColor: "var(--primary-color)" }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaFileInvoiceDollar style={{ color: "var(--primary-color)" }} />{" "}
            Recent Activity
          </h3>
          <div className="flex flex-col gap-4">
            {recentActivity.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Fee Collected
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.studentName} ({activity.class})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold bg-green-200 text-green-700 px-2 py-1 rounded">
                    {activity.amount}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-sm text-gray-500 text-center">
                No recent activity.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Detailed Transaction Table */}
      <section
        className="bg-white p-6 rounded-xl shadow-sm border-t-8"
        style={{ borderTopColor: "var(--primary-color)" }}
      >
        <div className="flex flex-col sm:flex-row items-center  justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <div
              className="h-6 w-1 rounded-full"
              style={{ backgroundColor: "var(--primary-color)" }}
            ></div>
            <h2 className="text-lg font-bold text-[var(--text-primary-color)]">
              Recent Fee Transactions
            </h2>
          </div>
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or Name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--primary-color)] w-full"
              style={{ focusBorderColor: "var(--primary-color)" }}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={currentTransactions}
          renderActions={(txn) => (
            <ActionButtons
              onView={() => handleViewInvoice(txn)}
              itemName={txn.studentName}
            />
          )}
          renderMobileCard={renderMobileCard}
          emptyMessage="No transactions found."
        />

        {/* Pagination */}
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </section>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Finance;
