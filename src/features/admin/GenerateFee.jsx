import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import {
  CLASS_OPTIONS,
  getSectionsByClass,
} from "../../constants/DropDownOptions";
import Button from "../../components/ui/Button";
import { IoArrowBack } from "react-icons/io5";
import DynamicForm from "../../components/ui/DynamicForm";

const GenerateFee = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [feeData, setFeeData] = useState({
    studentId: "",
    fullName: "",
    classGrade: "",
    section: "",
    month: "",
    year: new Date().getFullYear().toString(),
    tuitionFee: "",
    transportFee: "0",
    examFee: "0",
    miscFee: "0",
    discount: "0",
    dueDate: "",
    paymentStatus: "Pending",
  });

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

  const feeFields = [
    {
      name: "studentId",
      type: "input",
      inputType: "text",
      label: "Student ID",
      placeholder: "e.g. STU123",
      required: true,
    },
    {
      name: "fullName",
      type: "input",
      inputType: "text",
      label: "Student Name",
      placeholder: "Enter Full Name...",
      required: true,
    },
    {
      name: "classGrade",
      type: "dropdown",
      label: "Class",
      options: CLASS_OPTIONS,
      placeholder: "Select Class",
      required: true,
    },
    {
      name: "section",
      type: "dropdown",
      label: "Section",
      options: (data) => getSectionsByClass(data.classGrade),
      placeholder: "Select Section",
      required: true,
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
      name: "year",
      type: "input",
      inputType: "number",
      label: "Year",
      placeholder: "2024",
      required: true,
    },
    {
      name: "tuitionFee",
      type: "input",
      inputType: "number",
      label: "Tuition Fee",
      placeholder: "Enter amount...",
      required: true,
    },
    {
      name: "transportFee",
      type: "input",
      inputType: "number",
      label: "Transport Fee",
      placeholder: "Enter amount...",
    },
    {
      name: "examFee",
      type: "input",
      inputType: "number",
      label: "Exam Fee",
      placeholder: "Enter amount...",
    },
    {
      name: "discount",
      type: "input",
      inputType: "number",
      label: "Discount / Scholarship",
      placeholder: "Enter discount...",
    },
    {
      name: "dueDate",
      type: "input",
      inputType: "date",
      label: "Due Date",
      required: true,
      fullWidth: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Generating Fee Invoice:", feeData);
    showToast(`Fee Invoice generated for ${feeData.fullName}!`);
    navigate("/admin-dashboard");
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <DynamicForm
        title="Generate Fee Invoice"
        fields={feeFields}
        formData={feeData}
        setFormData={setFeeData}
        onSubmit={handleSubmit}
        onClick={() => navigate("/admin-dashboard")}
      >
        Generate Invoice
      </DynamicForm>
    </div>
  );
};

export default GenerateFee;
