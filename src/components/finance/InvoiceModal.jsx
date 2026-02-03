import React from "react";
import { FaTimes, FaPrint, FaSchool } from "react-icons/fa";

const InvoiceModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] relative animate-in zoom-in-20 duration-200 print:shadow-none print:w-full print:max-w-none print:h-auto print:max-h-none">
        {/* Modal Header (No Print) */}
        <div className="flex  justify-between items-center p-4 border-b border-gray-100 bg-gray-50 print:hidden flex-shrink-0">
          <h2
            className="text-lg font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            Fee Invoice
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Invoice Content (Printable & Scrollable) */}
        <div
          className="px-6 py-4 overflow-y-auto custom-scrollbar flex-grow print:p-0 print:overflow-visible"
          id="invoice-content"
        >
          {/* Header */}
          <div
            className="flex justify-between items-start mb-2 pb-2 border-b-2"
            style={{ borderColor: "var(--primary-color)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="text-white p-3 rounded-lg"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                <FaSchool size={32} />
              </div>
              <div>
                <h1
                  className="text-xl font-bold uppercase tracking-wide"
                  style={{ color: "var(--primary-color)" }}
                >
                  School Management
                </h1>
                <p className="text-sm text-gray-500">
                  123 Education Street, Knowledge City
                </p>
                <p className="text-sm text-gray-500">+92 300 1234567</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-black text-gray-200 uppercase">
                Invoice
              </h2>
              <p className="font-bold text-gray-700 mt-1">#{transaction.id}</p>
              <p className="text-sm text-gray-500">Date: {transaction.date}</p>
              <span
                className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  transaction.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : transaction.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
              Bill To:
            </h3>
            <div className="flex justify-between items-end">
              <div>
                <h4 className="text-xl font-bold text-gray-800">
                  {transaction.studentName}
                </h4>
                <p className="text-gray-600">
                  Class:{" "}
                  <span className="font-semibold">{transaction.class}</span> |
                  Section:{" "}
                  <span className="font-semibold">{transaction.section}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Student ID: {transaction.studentId}
                </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full mb-4">
            <thead>
              <tr
                className="text-white text-sm uppercase"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                <th className="py-2 px-4 text-left rounded-l-lg">
                  Description
                </th>
                <th className="py-2 px-4 text-right">Month</th>
                <th className="py-2 px-4 text-right rounded-r-lg">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 font-medium text-gray-700">
                  Monthly Tuition Fee
                </td>
                <td className="py-4 px-4 text-right text-gray-600">
                  February 2024
                </td>
                <td className="py-4 px-4 text-right font-bold text-gray-800">
                  {transaction.amount}
                </td>
              </tr>
              {/* Optional: Add more rows if needed */}
            </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-end">
            <div className="w-1/2 sm:w-1/3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold text-gray-800">
                  {transaction.amount}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Tax (0%)</span>
                <span className="font-semibold text-gray-800">PKR 0</span>
              </div>
              <div className="flex justify-between py-3">
                <span
                  className="text-lg font-bold"
                  style={{ color: "var(--primary-color)" }}
                >
                  Total
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: "var(--primary-color)" }}
                >
                  {transaction.amount}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Thank you for your timely payment.</p>
            <p>
              This is a computer-generated invoice and requires no signature.
            </p>
          </div>
        </div>

        {/* Modal Footer (No Print) */}
        <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t border-gray-100 print:hidden flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg hover:brightness-90 transition-colors shadow-sm"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <FaPrint /> Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
