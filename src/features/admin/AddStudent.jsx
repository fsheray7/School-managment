import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GENDER_OPTIONS,
  CLASS_OPTIONS,
  getSectionsByClass,
} from "../../constants/Store";
import Button from "../../components/ui/Button";
import { IoArrowBack } from "react-icons/io5";
import DynamicForm from "../../components/ui/DynamicForm";
import ProgressBar from "../../components/ui/ProgressBar";
import { useToast } from "../../context/ToastContext";

const AddStudent = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [studentData, setStudentData] = useState({
    studentId: "",
    fullName: "",
    gender: "",
    dob: "",
    profilePhoto: null,
    classGrade: "",
    section: "",
    academicYear: "",
    rollNumber: "",
    studentPhone: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
  });

  const tabConfigs = {
    1: {
      title: "Student Info",
      fields: [
        {
          name: "studentId",
          type: "input",
          inputType: "text",
          label: "Student ID",
          placeholder: "Enter Student ID...",
          required: true,
        },
        {
          name: "fullName",
          type: "input",
          inputType: "text",
          label: "Full Name",
          placeholder: "Enter Full Name...",
          required: true,
        },
        {
          name: "userName",
          type: "input",
          inputType: "text",
          label: "User Name",
          placeholder: "Enter User Name...",
          required: true,
        },
        {
          name: "gender",
          type: "dropdown",
          label: "Gender",
          options: GENDER_OPTIONS,
          placeholder: "Select Gender",
          required: true,
        },
        {
          name: "dob",
          type: "input",
          inputType: "date",
          label: "Date of Birth",
          required: true,
        },
        {
          name: "profilePhoto",
          type: "input",
          inputType: "file",
          label: "Profile Photo",
          fullWidth: false,
          required: true,
        },
        {
          name: "password",
          type: "input",
          inputType: "password",
          label: "Password",
          placeholder: "Enter Password...",
          required: true,
        },
        {
          name: "confirmPassword",
          type: "input",
          inputType: "password",
          label: "Confirm Password",
          placeholder: "Enter Confirm Password...",
          required: true,
        },
      ],
    },
    2: {
      title: "Academic Info",
      fields: [
        {
          name: "classGrade",
          type: "dropdown",
          label: "Class/Grade",
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
          name: "academicYear",
          type: "input",
          inputType: "text",
          label: "Academic Year",
          placeholder: "Enter Academic Year...",
          required: true,
        },
        {
          name: "rollNumber",
          type: "input",
          inputType: "text",
          label: "Roll Number",
          placeholder: "Enter Roll Number...",
          required: true,
        },
      ],
    },
    3: {
      title: "Contact Info",
      fields: [
        {
          name: "studentPhone",
          type: "input",
          inputType: "text",
          label: "Student Phone",
          placeholder: "Enter Phone...",
        },
        {
          name: "parentName",
          type: "input",
          inputType: "text",
          label: "Parent Name",
          placeholder: "Enter Parent Name...",
          required: true,
        },
        {
          name: "parentPhone",
          type: "input",
          inputType: "text",
          label: "Parent Phone",
          placeholder: "Enter Parent Phone...",
          required: true,
        },
        {
          name: "parentEmail",
          type: "input",
          inputType: "email",
          label: "Parent Email",
          placeholder: "Enter Parent Email...",
          required: true,
        },
        {
          name: "address",
          type: "textarea",
          label: "Address",
          placeholder: "Enter Address...",
          fullWidth: true,
          required: true,
        },
      ],
    },
  };

  const handleNext = () => setActiveTab((prev) => prev + 1);
  const handleBack = () => {
    if (activeTab > 1) {
      setActiveTab((prev) => prev - 1);
    } else {
      navigate("/students");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab < 3) {
      handleNext();
    } else {
      console.log("Final submission data:", studentData);
      showToast("Student added successfully!");
      navigate("/students");
    }
  };

  const currentConfig = tabConfigs[activeTab];
  const steps = Object.values(tabConfigs);

  return (
    <div className="flex flex-col justify-start items-center w-full">
      <ProgressBar currentStep={activeTab} steps={steps} />
      <DynamicForm
        title={currentConfig.title}
        fields={currentConfig.fields}
        formData={studentData}
        setFormData={setStudentData}
        onSubmit={handleSubmit}
        onClick={handleBack}
      >
        {activeTab < 3 ? "Next" : "Save Student"}
      </DynamicForm>
    </div>
  );
};

export default AddStudent;
