import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { CLASS_OPTIONS, getSectionsByClass } from "../../constants/Store";
import Button from "../../components/ui/Button";
import { IoArrowBack, IoSearch, IoDownload, IoPrint } from "react-icons/io5";
import DynamicForm from "../../components/ui/DynamicForm";
import studentsData from "../../data/admindata/students/students";
import { getFeeStructureByClass } from "../../data/finance/FeeStructures";
import FeeReceipt from "./FeeReceipt";
import { recordActivity, ACTIVITY_TYPES } from "../../utils/activityManager";

const DISCOUNT_OPTIONS = ["0%", "10%", "25%", "50%", "75%", "100%"];

const GenerateFee = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const receiptRef = useRef();

  const [feeData, setFeeData] = useState({
    studentId: "",
    fullName: "",
    classGrade: "",
    section: "",
    month: "March", // Default to current month
    year: new Date().getFullYear().toString(),
    tuitionFee: "",
    transportFee: "0",
    examFee: "0",
    miscFee: "0",
    discountPercentage: "0%",
    discountAmount: "0",
    previousDues: "0",
    lateFine: "0",
    dueDate: new Date().toISOString().split("T")[0], // Default to today
    paymentStatus: "Unpaid",
    amountPaid: "0",
  });

  const [totalPayable, setTotalPayable] = useState(0);

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

  // Effect to handle incoming student data from state (FeeList navigation)
  useEffect(() => {
    if (location.state?.rollNumber) {
      setFeeData((prev) => ({ ...prev, studentId: location.state.rollNumber }));
    }
  }, [location.state]);

  // Auto-fill logic when studentId changes
  useEffect(() => {
    if (feeData.studentId) {
      const student = studentsData.find(
        (s) =>
          s.rollNumber === feeData.studentId ||
          s.id.toString() === feeData.studentId,
      );
      if (student) {
        const structure = getFeeStructureByClass(student.class);
        const tuition = structure?.components.tuitionFee || 0;
        const discountP = student.scholarshipPercentage;

        setFeeData((prev) => ({
          ...prev,
          fullName: student.fullName,
          classGrade: student.class,
          section: student.section,
          tuitionFee: tuition.toString(),
          transportFee: student.isTransportUser
            ? (structure?.components.transportFee || 1500).toString()
            : "0",
          previousDues: student.previousDues.toString(),
          // Default discount from student's scholarship if available
          discountPercentage:
            discountP > 0 ? `${discountP}%` : prev.discountPercentage,
        }));
      }
    }
  }, [feeData.studentId]);

  // Handle Percentage Discount calculation
  useEffect(() => {
    const tuition = parseFloat(feeData.tuitionFee) || 0;
    const percentage = parseInt(feeData.discountPercentage) || 0;
    const amount = (tuition * percentage) / 100;
    setFeeData((prev) => ({ ...prev, discountAmount: amount.toString() }));
  }, [feeData.discountPercentage, feeData.tuitionFee]);

  // Late fine calculation logic
  useEffect(() => {
    if (feeData.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(feeData.dueDate);
      due.setHours(0, 0, 0, 0);

      if (today > due) {
        const diffTime = Math.abs(today - due);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let fine = 0;
        if (diffDays > 30) fine = 300;
        else if (diffDays > 10) fine = 100;
        else if (diffDays > 0) fine = 50;
        setFeeData((prev) => ({ ...prev, lateFine: fine.toString() }));
      } else {
        setFeeData((prev) => ({ ...prev, lateFine: "0" }));
      }
    }
  }, [feeData.dueDate]);

  // Calculate Total Payable
  useEffect(() => {
    const tuition = parseFloat(feeData.tuitionFee) || 0;
    const transport = parseFloat(feeData.transportFee) || 0;
    const exam = parseFloat(feeData.examFee) || 0;
    const misc = parseFloat(feeData.miscFee) || 0;
    const dues = parseFloat(feeData.previousDues) || 0;
    const fine = parseFloat(feeData.lateFine) || 0;
    const discount = parseFloat(feeData.discountAmount) || 0;

    const total = tuition + transport + exam + misc + dues + fine - discount;
    setTotalPayable(total);

    // Auto-sync amountPaid if status is Paid
    if (feeData.paymentStatus === "Paid") {
      setFeeData((prev) => ({ ...prev, amountPaid: total.toString() }));
    }
  }, [
    feeData.tuitionFee,
    feeData.transportFee,
    feeData.examFee,
    feeData.miscFee,
    feeData.previousDues,
    feeData.lateFine,
    feeData.discountAmount,
    feeData.paymentStatus,
  ]);

  const studentOptions = studentsData.map(
    (s) => `${s.rollNumber} - ${s.fullName}`,
  );

  const feeFields = [
    {
      name: "studentId",
      type: "dropdown",
      label: "Select Student (Roll No - Name)",
      options: studentOptions,
      placeholder: "Search Student...",
      required: true,
      searchable: true,
      fullWidth: true,
      onChange: (val) => {
        const rollNo = val.split(" - ")[0];
        setFeeData((prev) => ({ ...prev, studentId: rollNo }));
      },
    },
    {
      name: "fullName",
      type: "input",
      inputType: "text",
      label: "Student Name",
      required: true,
      readOnly: true,
    },
    {
      name: "classGrade",
      type: "dropdown",
      label: "Class",
      options: CLASS_OPTIONS,
      placeholder: "Select Class",
      required: true,
      readOnly: true, // Auto-filled from student
    },
    {
      name: "section",
      type: "dropdown",
      label: "Section",
      options: (data) => getSectionsByClass(data.classGrade),
      placeholder: "Select Section",
      required: true,
      readOnly: true, // Auto-filled from student
    },
    {
      name: "month",
      type: "dropdown",
      label: "Fee Month",
      options: months,
      placeholder: "Select Month",
      required: true,
    },
    {
      name: "tuitionFee",
      type: "input",
      inputType: "number",
      label: "Tuition Fee",
      placeholder: "0",
      required: true,
    },
    {
      name: "transportFee",
      type: "input",
      inputType: "number",
      label: "Transport Fee",
      placeholder: "0",
    },
    {
      name: "previousDues",
      type: "input",
      inputType: "number",
      label: "Previous Dues (Arrears)",
      placeholder: "0",
    },
    {
      name: "discountPercentage",
      type: "dropdown",
      label: "Discount %",
      options: DISCOUNT_OPTIONS,
      placeholder: "Select %",
    },
    {
      name: "discountAmount",
      type: "input",
      inputType: "number",
      label: "Discount Amount",
      readOnly: true,
    },
    {
      name: "lateFine",
      type: "input",
      inputType: "number",
      label: "Late Fine",
      placeholder: "0",
    },
    {
      name: "dueDate",
      type: "input",
      inputType: "date",
      label: "Due Date",
      required: true,
    },
    {
      name: "paymentStatus",
      type: "dropdown",
      label: "Payment Status",
      options: ["Paid", "Partial Paid", "Unpaid"],
      required: true,
    },
    {
      name: "amountPaid",
      type: "input",
      inputType: "number",
      label: "Amount Received",
      placeholder: "0",
      isVisible: (data) => data.paymentStatus === "Partial Paid",
      required: (data) => data.paymentStatus === "Partial Paid",
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceRecord = {
      ...feeData,
      amountPaid:
        feeData.paymentStatus === "Paid"
          ? totalPayable.toString()
          : feeData.paymentStatus === "Unpaid"
            ? "0"
            : feeData.amountPaid,
      totalPayable,
      invoiceNo: `INV-${feeData.year}-${Math.floor(1000 + Math.random() * 9000)}`,
      generatedAt: new Date().toISOString(),
    };

    // Persist for notifications
    const existingInvoices =
      JSON.parse(localStorage.getItem("feeInvoices")) || [];
    localStorage.setItem(
      "feeInvoices",
      JSON.stringify([invoiceRecord, ...existingInvoices]),
    );

    console.log("Generating Fee Invoice:", invoiceRecord);
    showToast(
      `Fee Invoice of Rs. ${totalPayable} generated for ${feeData.fullName}!`,
    );

    // Record Activity
    recordActivity(
      invoiceRecord.paymentStatus === "Paid"
        ? ACTIVITY_TYPES.FEE_PAID
        : ACTIVITY_TYPES.FEE_GENERATED,
      invoiceRecord.paymentStatus === "Paid"
        ? "Fee Payment Received"
        : "Fee Invoice Generated",
      `${feeData.fullName} (${feeData.classGrade}) - Rs. ${totalPayable.toLocaleString()} for ${feeData.month}`,
    );

    navigate("/fees");
  };

  return (
    <div className="flex px-4 flex-col justify-start items-center pb-20 overflow-x-hidden">
      {/* Print Styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
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
              z-index: 9999;
            }
            aside, nav, header, footer, .no-print {
              display: none !important;
            }
            #print-root {
              display: flex !important;
              flex-direction: column !important;
              justify-content: flex-start !important;
              width: 100% !important;
              gap: 0.5rem !important;
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
          }
           #print-root {
              display: none;
            }
        `}
      </style>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl items-start no-print">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-8">
          <div className="w-full mb-8 p-4 bg-primary/10 rounded-xl border border-primary/20 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Total Payable
              </p>
              <h2 className="text-4xl font-black text-primary">
                Rs. {totalPayable.toLocaleString()}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 capitalize">
                {feeData.month} {feeData.year}
              </p>
              <span
                className={`text-[10px] px-2 py-1 rounded-full font-bold ${parseFloat(feeData.lateFine) > 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
              >
                {parseFloat(feeData.lateFine) > 0
                  ? "Late Fine Applied"
                  : "No Late Fine"}
              </span>
            </div>
          </div>

          <DynamicForm
            title=""
            fields={feeFields}
            formData={feeData}
            setFormData={setFeeData}
            onSubmit={handleSubmit}
            showDefaultHeader={false}
            buttonAreaClassName="col-span-2 flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
            onClick={() => navigate("/fees")}
          >
            <div className="flex items-center gap-2">
              <IoDownload />
              Generate & Record Payment
            </div>
          </DynamicForm>
        </div>

        {/* Live Preview Section */}
        <div className="sticky top-24 hidden lg:block">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-bold text-gray-700 flex items-center gap-2 uppercase text-xs tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Invoice Preview
            </h3>
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all"
            >
              <IoPrint /> PRINT TEST
            </button>
          </div>
          <div className="scale-90 origin-top transform-gpu">
            <FeeReceipt
              feeData={{ ...feeData, discount: feeData.discountAmount }}
              totalPayable={totalPayable}
              invoiceNo="DRAFT-2024"
            />
          </div>
        </div>
      </div>

      {/* Hidden Print Wrapper (This is what actually prints) */}
      <div id="print-root" className="hidden print:block">
        <FeeReceipt
          copyType="School Copy"
          feeData={{ ...feeData, discount: feeData.discountAmount }}
          totalPayable={totalPayable}
          invoiceNo={`INV-${feeData.year}-${Math.floor(1000 + Math.random() * 9000)}`}
        />
        <div className="print-divider no-print hidden print:block"></div>
        <FeeReceipt
          copyType="Student Copy"
          feeData={{ ...feeData, discount: feeData.discountAmount }}
          totalPayable={totalPayable}
          invoiceNo={`INV-${feeData.year}-${Math.floor(1000 + Math.random() * 9000)}`}
        />
      </div>
    </div>
  );
};

export default GenerateFee;
