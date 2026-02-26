import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import studentsData from "../../data/admindata/students/students";
import { getFeeStructureByClass } from "../../data/finance/FeeStructures";
import { CLASS_OPTIONS, getSectionsByClass } from "../../constants/Store";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";
import DataCard from "../../components/ui/DataCard";
import Pagination from "../../components/ui/Pagination";
import Filters from "../../components/ui/Filters";
import { IoAddCircle, IoWallet, IoAlertCircle, IoPrint } from "react-icons/io5";
import FeeReceipt from "./FeeReceipt";
import { useSettings } from "../../context/SettingsContext";
import Button from "../../components/ui/Button";

const FeeList = () => {
  const navigate = useNavigate();
  const { schoolLogo, schoolName } = useSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState(
    new Date().toLocaleString("en-US", { month: "long" }),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [printingStudent, setPrintingStudent] = useState(null);
  const itemsPerPage = 8;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Process students to include fee data
  const studentsWithFees = studentsData.map((student) => {
    const structure = getFeeStructureByClass(student.class);
    const tuition = structure?.components.tuitionFee || 0;
    const transport = student.isTransportUser
      ? structure?.components.transportFee || 1500
      : 0;
    const scholarship = tuition * (student.scholarshipPercentage / 100);
    const total = tuition + transport + student.previousDues - scholarship;

    // Check localStorage for generated invoices this month
    const feeInvoices = JSON.parse(localStorage.getItem("feeInvoices")) || [];
    const existingInvoice = feeInvoices.find(
      (inv) =>
        (inv.studentId === student.rollNumber ||
          inv.studentId === student.id.toString()) &&
        inv.month === monthFilter,
    );

    return {
      ...student,
      tuition,
      transport,
      scholarship,
      total,
      status: existingInvoice
        ? existingInvoice.paymentStatus
        : student.previousDues > 0
          ? "Pending"
          : "Paid",
      amountPaid: existingInvoice
        ? parseFloat(existingInvoice.amountPaid || 0)
        : student.previousDues > 0
          ? 0
          : total,
      date: existingInvoice
        ? new Date(existingInvoice.generatedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : `05 ${monthFilter.substring(0, 3)} ${new Date().getFullYear()}`,
    };
  });

  const filteredStudents = studentsWithFees.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter ? s.class === classFilter : true;
    const matchesSection = sectionFilter ? s.section === sectionFilter : true;
    return matchesSearch && matchesClass && matchesSection;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedData = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    { header: "Roll No", key: "rollNumber", fontBold: true },
    { header: "Name", key: "fullName", fontBold: true },
    { header: "Class", key: "class" },
    {
      header: "Tuition",
      key: "tuition",
      render: (s) => `Rs. ${s.tuition.toLocaleString()}`,
    },
    {
      header: "Scholarship",
      key: "scholarship",
      render: (s) =>
        s.scholarship > 0 ? (
          <span className="text-green-600 font-bold">
            -{s.scholarship.toLocaleString()}
          </span>
        ) : (
          "0"
        ),
    },
    {
      header: "Arrears",
      key: "previousDues",
      render: (s) =>
        s.previousDues > 0 ? (
          <span className="text-red-600 font-bold">
            {s.previousDues.toLocaleString()}
          </span>
        ) : (
          "0"
        ),
    },
    {
      header: "Total Payable",
      key: "total",
      fontBold: true,
      render: (s) => (
        <span className="text-primary font-black">
          Rs. {s.total.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (s) => (
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
            s.status === "Paid"
              ? "bg-green-100 text-green-700 border-green-200"
              : s.status === "Partial Paid"
                ? "bg-amber-100 text-amber-700 border-amber-200"
                : "bg-red-100 text-red-700 border-red-200"
          }`}
        >
          {s.status}
        </span>
      ),
    },
    {
      header: "Date",
      key: "date",
      render: (s) => (
        <span className="text-gray-500 font-medium">{s.date}</span>
      ),
    },
  ];

  const renderMobileCard = (s) => (
    <DataCard
      title={s.fullName}
      fields={[
        { label: "Roll No", value: s.rollNumber },
        { label: "Class", value: `${s.class}-${s.section}` },
        { label: "Date", value: s.date },
        { label: "Total", value: `Rs. ${s.total.toLocaleString()}` },
        { label: "Status", value: s.status },
      ]}
      actions={
        <button
          onClick={() => navigate("/admin/generate-fee")}
          className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all text-sm font-bold flex items-center gap-1"
        >
          <IoWallet /> BILL
        </button>
      }
    />
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="Search roll no or name..."
        onAdd={() => navigate("/generate-fee")}
        addLabel="+ Generate Fee"
        onReset={() => {
          setSearchQuery("");
          setClassFilter("");
          setSectionFilter("");
          setMonthFilter(new Date().toLocaleString("en-US", { month: "long" }));
        }}
        filters={[
          {
            value: monthFilter,
            onChange: setMonthFilter,
            options: months,
            placeholder: "Select Month",
          },
          {
            value: classFilter,
            onChange: (val) => {
              setClassFilter(val);
              setSectionFilter("");
            },
            options: CLASS_OPTIONS,
            placeholder: "Select Class",
          },
          {
            value: sectionFilter,
            onChange: setSectionFilter,
            options: getSectionsByClass(classFilter),
            placeholder: "Select Section",
          },
        ]}
      />

      <div className="flex justify-end  -mb-2 no-print">
        <Button
          onClick={() => {
            setPrintingStudent(null); // Print all
            setTimeout(() => window.print(), 100);
          }}
          variant="reset"
          className="px-4 py-2  hover:bg-black transition-all text-xs font-bold flex items-center gap-2 shadow-lg"
        >
          <IoPrint /> PRINT ALL RECEIPTS
        </Button>
      </div>

      <div className="bg-white w-full overflow-hidden">
        <DataTable
          columns={columns}
          data={paginatedData}
          renderActions={(s) => (
            <div className="flex items-center gap-2">
              <Button
                onClick={() =>
                  navigate("/generate-fee", {
                    state: { rollNumber: s.rollNumber },
                  })
                }
                variant="ghost"
                className="px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all text-[10px] font-black tracking-widest uppercase flex items-center gap-1"
                title="Generate Fee"
              >
                <IoWallet size={14} />
              </Button>
              <Button
                onClick={() => {
                  setPrintingStudent(s);
                  setTimeout(() => window.print(), 100);
                }}
                variant="ghost"
                className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all no-print"
                title="Print Receipt"
              >
                <IoPrint size={14} />
              </Button>
            </div>
          )}
          renderMobileCard={renderMobileCard}
          emptyMessage="No student fee records found."
        />
        <div className="p-4 border-t border-gray-50 uppercase">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredStudents.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>

      {/* Printing Infrastructure */}
      <style>
        {`
          @media print {
            /* General Reset */
            body * {
              visibility: hidden;
            }
            
            /* Show only the print root and its children */
            #print-root, #print-root * {
              visibility: visible;
            }

            #print-root {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              display: block !important;
              background: white;
            }

            .receipt-break {
              page-break-after: always;
              margin-bottom: 0;
              display: flex;
              flex-direction: column !important;
              gap: 0.5rem;
              width: 100%;
            }

            .print-divider {
              border-top: 1px dashed #ccc;
              width: 100%;
              margin: 0.75rem 0;
              position: relative;
            }
            .print-divider::after {
              content: '✂ CUT HERE';
              position: absolute;
              top: -10px;
              left: 50%;
              transform: translateX(-50%);
              background: white;
              padding: 0 10px;
              font-size: 10px;
              color: #999;
              font-weight: bold;
            }

            /* Hide Sidebar, Navbar, etc. explicitly to avoid whitespace issues */
            aside, nav, header, footer, .no-print, .filters-container, .pagination-container {
              display: none !important;
            }
          }
           #print-root {
              display: none;
            }
        `}
      </style>

      {/* Hidden print root */}
      <div
        id="print-root"
        className="hidden print:block fixed inset-0 bg-white z-[9999]"
      >
        {printingStudent ? (
          <div className="receipt-break mb-8">
            <FeeReceipt
              copyType="School Copy"
              feeData={{
                fullName: printingStudent.fullName,
                studentId: printingStudent.rollNumber,
                classGrade: printingStudent.class,
                section: printingStudent.section,
                month: monthFilter,
                year: new Date().getFullYear(),
                tuitionFee: printingStudent.tuition,
                transportFee: printingStudent.transport,
                examFee: 0,
                previousDues: printingStudent.previousDues,
                discount: printingStudent.scholarship,
                lateFine: 0,
              }}
              totalPayable={printingStudent.total}
              invoiceNo={`INV-${monthFilter.substring(0, 3).toUpperCase()}-${printingStudent.rollNumber}`}
            />
            {/* Divider */}
            <div className="print-divider no-print hidden print:block"></div>
            <FeeReceipt
              copyType="Student Copy"
              feeData={{
                fullName: printingStudent.fullName,
                studentId: printingStudent.rollNumber,
                classGrade: printingStudent.class,
                section: printingStudent.section,
                month: monthFilter,
                year: new Date().getFullYear(),
                tuitionFee: printingStudent.tuition,
                transportFee: printingStudent.transport,
                examFee: 0,
                previousDues: printingStudent.previousDues,
                discount: printingStudent.scholarship,
                lateFine: 0,
              }}
              totalPayable={printingStudent.total}
              invoiceNo={`INV-${monthFilter.substring(0, 3).toUpperCase()}-${printingStudent.rollNumber}`}
            />
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div key={student.rollNumber} className="receipt-break mb-8">
              <FeeReceipt
                copyType="School Copy"
                feeData={{
                  fullName: student.fullName,
                  studentId: student.rollNumber,
                  classGrade: student.class,
                  section: student.section,
                  month: monthFilter,
                  year: new Date().getFullYear(),
                  tuitionFee: student.tuition,
                  transportFee: student.transport,
                  examFee: 0,
                  previousDues: student.previousDues,
                  discount: student.scholarship,
                  lateFine: 0,
                }}
                totalPayable={student.total}
                invoiceNo={`INV-${monthFilter.substring(0, 3).toUpperCase()}-${student.rollNumber}`}
              />
              {/* Divider */}
              <div className="print-divider no-print hidden print:block"></div>
              <FeeReceipt
                copyType="Student Copy"
                feeData={{
                  fullName: student.fullName,
                  studentId: student.rollNumber,
                  classGrade: student.class,
                  section: student.section,
                  month: monthFilter,
                  year: new Date().getFullYear(),
                  tuitionFee: student.tuition,
                  transportFee: student.transport,
                  examFee: 0,
                  previousDues: student.previousDues,
                  discount: student.scholarship,
                  lateFine: 0,
                }}
                totalPayable={student.total}
                invoiceNo={`INV-${monthFilter.substring(0, 3).toUpperCase()}-${student.rollNumber}`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeeList;
