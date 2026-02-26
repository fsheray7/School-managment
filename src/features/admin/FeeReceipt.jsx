import React, { forwardRef } from "react";
import { IoPrint, IoDownload, IoCheckmarkCircle } from "react-icons/io5";
import { useSettings } from "../../context/SettingsContext";

const FeeReceipt = forwardRef(
  ({ feeData, totalPayable, invoiceNo, copyType }, ref) => {
    const { schoolLogo, schoolName } = useSettings();
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return (
      <div
        ref={ref}
        className="bg-white p-8 max-w-2xl mx-auto border mt-4 shadow-sm print:shadow-none print:border-none print:p-2 relative"
      >
        {/* Copy Type Badge */}
        {copyType && (
          <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase text-gray-400 rounded-bl-lg no-print">
            {copyType}
          </div>
        )}
        {/* Print-only Copy Type */}
        {copyType && (
          <div className="hidden print:block absolute top-0 right-0 border border-gray-300 px-2 py-0.5 text-[8px] font-bold uppercase text-gray-400">
            {copyType}
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-start border-b  pt-4 pb-4 mb-4 print:pb-2 print:mb-2">
          <div className="flex items-center gap-4 print:gap-2">
            {schoolLogo && (
              <img
                src={schoolLogo}
                alt="School Logo"
                className="w-16 h-16 object-contain print:w-10 print:h-10"
              />
            )}
            <div>
              <h1 className="text-2xl font-black text-primary tracking-tight uppercase print:text-base">
                {schoolName}
              </h1>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest print:text-[8px] print:mt-0">
                Official Fee Receipt
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-bold text-gray-800 print:text-sm">
              RECEIPT
            </h2>
            <p className="text-xs text-gray-500 font-mono mt-1 print:text-[8px] print:mt-0">
              # {invoiceNo || "INV-2024-001"}
            </p>
            <div className="mt-2 text-right">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest print:text-[8px] print:px-2 print:py-0.5 ${
                  feeData.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : feeData.paymentStatus === "Partial Paid"
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {feeData.paymentStatus || "Unpaid"}
              </span>
            </div>
          </div>
        </div>

        {/* Student Details Grid */}
        <div className="grid grid-cols-2 gap-y-4 mb-8 text-sm print:gap-y-2 print:mb-4 print:text-[10px]">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase print:text-[7px]">
              Student Name
            </p>
            <p className="font-semibold text-gray-800">{feeData.fullName}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase print:text-[7px]">
              Student ID / Roll
            </p>
            <p className="font-semibold text-gray-800">{feeData.studentId}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase print:text-[7px]">
              Class & Section
            </p>
            <p className="font-semibold text-gray-800">
              {feeData.classGrade} - {feeData.section}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase print:text-[7px]">
              Billing Period
            </p>
            <p className="font-semibold text-gray-800">
              {feeData.month} {feeData.year}
            </p>
          </div>
        </div>

        {/* Fee Breakdown Table */}
        <div className="mb-8 print:mb-4">
          <table className="w-full text-sm print:text-[10px]">
            <thead>
              <tr className="border-b-2 border-primary/10">
                <th className="text-left py-2 font-black text-gray-600 print:py-1">
                  Component
                </th>
                <th className="text-right py-2 font-black text-gray-600 print:py-1">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr>
                <td className="py-3 text-gray-600 italic print:py-1.5">
                  Tuition Fee
                </td>
                <td className="text-right py-3 font-medium print:py-1.5">
                  Rs. {parseFloat(feeData.tuitionFee).toLocaleString()}
                </td>
              </tr>
              {parseFloat(feeData.transportFee) > 0 && (
                <tr>
                  <td className="py-3 text-gray-600 italic print:py-1.5">
                    Transport Fee
                  </td>
                  <td className="text-right py-3 font-medium print:py-1.5">
                    Rs. {parseFloat(feeData.transportFee).toLocaleString()}
                  </td>
                </tr>
              )}
              {parseFloat(feeData.examFee) > 0 && (
                <tr>
                  <td className="py-3 text-gray-600 italic print:py-1.5">
                    Examination Fee
                  </td>
                  <td className="text-right py-3 font-medium print:py-1.5">
                    Rs. {parseFloat(feeData.examFee).toLocaleString()}
                  </td>
                </tr>
              )}
              {parseFloat(feeData.previousDues) > 0 && (
                <tr>
                  <td className="py-3 text-red-600 font-semibold italic print:py-1.5">
                    Previous Dues (Arrears)
                  </td>
                  <td className="text-right py-3 font-bold text-red-600 print:py-1.5">
                    Rs. {parseFloat(feeData.previousDues).toLocaleString()}
                  </td>
                </tr>
              )}
              {parseFloat(feeData.lateFine) > 0 && (
                <tr>
                  <td className="py-3 text-red-500 italic print:py-1.5">
                    Late Fine Charges
                  </td>
                  <td className="text-right py-3 font-medium print:py-1.5">
                    +Rs. {parseFloat(feeData.lateFine).toLocaleString()}
                  </td>
                </tr>
              )}
              {parseFloat(feeData.discount) > 0 && (
                <tr>
                  <td className="py-3 text-green-600 italic font-semibold print:py-1.5">
                    Scholarship / Discount
                  </td>
                  <td className="text-right py-3 font-bold text-green-600 print:py-1.5">
                    -Rs. {parseFloat(feeData.discount).toLocaleString()}
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-primary pt-2">
                <td className="py-2 font-black text-lg text-primary uppercase tracking-tighter print:py-1 print:text-xs">
                  Total Payable
                </td>
                <td className="text-right py-2 font-black text-xl text-primary print:py-1 print:text-sm">
                  Rs. {totalPayable.toLocaleString()}
                </td>
              </tr>
              {feeData.paymentStatus === "Partial Paid" &&
                totalPayable - parseFloat(feeData.amountPaid || 0) > 0 && (
                  <>
                    <tr className="border-t border-gray-100">
                      <td className="py-2 font-bold text-gray-600 uppercase text-xs print:py-1 print:text-[9px]">
                        Amount Received
                      </td>
                      <td className="text-right py-2 font-bold text-gray-800 text-sm print:py-1 print:text-[10px]">
                        Rs.{" "}
                        {parseFloat(feeData.amountPaid || 0).toLocaleString()}
                      </td>
                    </tr>
                    <tr className="bg-amber-50">
                      <td className="py-2 font-black text-amber-700 uppercase text-xs print:py-1 print:text-[9px] px-2">
                        Remaining Balance
                      </td>
                      <td className="text-right py-2 font-black text-amber-700 text-sm print:py-1 print:text-[10px] px-2">
                        Rs.{" "}
                        {(
                          totalPayable - parseFloat(feeData.amountPaid || 0)
                        ).toLocaleString()}
                      </td>
                    </tr>
                  </>
                )}
            </tfoot>
          </table>
        </div>

        {/* Footer Details */}
        <div className="grid grid-cols-2 gap-8 mt-4 pt-4 border-t border-dashed border-gray-200 print:mt-2 print:pt-2 print:gap-4">
          <div className="text-xs text-gray-400 italic print:text-[7px]">
            <p>Generated on: {today}</p>
            <p className="mt-1 print:mt-0">
              This is a computer-generated document and does not require a
              physical signature.
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-primary/40 font-black text-xl rotate-[-12deg] border-4 border-primary/20 px-4 py-1 rounded-xl opacity-50 print:text-[10px] print:border-2 print:px-2 print:py-0.5">
              <IoCheckmarkCircle />
              <span>AUTHENTIC</span>
            </div>
            <p className="text-[10px] text-gray-300 mt-2 uppercase print:text-[6px] print:mt-1">
              Official School Seal
            </p>
          </div>
        </div>
      </div>
    );
  },
);

FeeReceipt.displayName = "FeeReceipt";
export default FeeReceipt;
