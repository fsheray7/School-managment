import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TEACHER_TYPE,
  CLASS_OPTIONS,
  GENDER_OPTIONS,
  SECTION_OPTIONS,
} from "../../constants/Store";
import Button from "../../components/ui/Button";
import { IoArrowBack } from "react-icons/io5";
import DynamicForm from "../../components/ui/DynamicForm";
import ProgressBar from "../../components/ui/ProgressBar";
import { useToast } from "../../context/ToastContext";
import { recordActivity, ACTIVITY_TYPES } from "../../utils/activityManager";

const AddTeacher = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [teacherData, setTeacherData] = useState({
    // Basic Info
    fullname: "",
    email: "",
    contact: "",
    gender: "",
    profilePhoto: null,

    // Professional Info
    teacherId: "",
    qualification: "",
    experience: "",
    department: "",
    subject: "",

    // Teaching Assignment
    classes: [],
    sections: [],
    role: "",
    type: "",

    // Account Setup
    loginEmail: "",
    password: "",
    confirmPassword: "",
    status: "Active",

    // Documents
    cv: null,
    certificates: null,
  });

  // Local Options
  const DEPARTMENT_OPTIONS = [
    "Science",
    "Mathematics",
    "Humanities",
    "Commerce",
    "Arts",
    "Computer Science",
    "Languages",
  ];
  const ROLE_OPTIONS = [
    "Class Teacher",
    "Subject Teacher",
    "Head of Department",
    "Coordinator",
  ];
  const STATUS_OPTIONS = ["Active", "Inactive", "On Leave"];

  // Flattening SECTION_OPTIONS for multi-select if needed,
  // or we can use the unique list of all possible sections.
  // Converting the SECTION_OPTIONS array of arrays to a unique flat list for simplicity in multi-select
  const ALL_SECTIONS = [...new Set(SECTION_OPTIONS.flat())];

  const tabConfigs = {
    1: {
      title: "Basic Info",
      fields: [
        {
          name: "teacherId",
          type: "input",
          inputType: "text",
          label: "Teacher ID",
          placeholder: "Enter Teacehr ID...",
          required: true,
        },
        {
          name: "fullname",
          type: "input",
          inputType: "text",
          label: "Full Name",
          placeholder: "Enter Full Name...",
          required: true,
        },
        {
          name: "email",
          type: "input",
          inputType: "email",
          label: "Email",
          placeholder: "Enter Email...",
          required: true,
        },
        {
          name: "contact",
          type: "input",
          inputType: "text",
          label: "Contact",
          placeholder: "Enter Contact...",
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
          name: "profilePhoto",
          type: "input",
          inputType: "file",
          label: "Profile Picture",
          fullWidth: false,
          required: true,
        },
      ],
    },
    2: {
      title: "Professional Info",
      fields: [
        {
          name: "teacherId",
          type: "input",
          inputType: "text",
          label: "Teacher ID",
          placeholder: "Enter Teacher ID...",
          required: true,
        },
        {
          name: "qualification",
          type: "input",
          inputType: "text",
          label: "Qualification",
          placeholder: "e.g. Masters in Physics",
          required: true,
        },
        {
          name: "experience",
          type: "input",
          inputType: "text",
          label: "Experience",
          placeholder: "e.g. 5 Years",
          required: true,
        },
        {
          name: "department",
          type: "dropdown",
          label: "Department",
          options: DEPARTMENT_OPTIONS,
          placeholder: "Select Department",
          required: true,
        },
        {
          name: "subject",
          type: "input",
          inputType: "text",
          label: "Subject(s)",
          placeholder: "e.g. Math, Physics",
          required: true,
        },
      ],
    },
    3: {
      title: "Teaching Assignment",
      fields: [
        {
          name: "classes",
          type: "dropdown",
          label: "Class(es)",
          options: CLASS_OPTIONS,
          placeholder: "Select Classes...",
          required: true,
          multiSelect: true,
          searchable: true,
        },
        {
          name: "sections",
          type: "dropdown",
          label: "Section(s)",
          options: ALL_SECTIONS,
          placeholder: "Select Sections...",
          required: true,
          multiSelect: true,
        },
        {
          name: "role",
          type: "dropdown",
          label: "Teacher Role",
          options: ROLE_OPTIONS,
          placeholder: "Select Role",
          required: true,
        },
        {
          name: "type",
          type: "dropdown",
          label: "Teacher Type",
          options: TEACHER_TYPE,
          placeholder: "Select Type",
          required: true,
        },
      ],
    },
    4: {
      title: "Account Setup",
      fields: [
        {
          name: "loginEmail",
          type: "input",
          inputType: "email",
          label: "Login Email",
          placeholder: "Enter Login Email...",
          required: true,
        },
        {
          name: "status",
          type: "dropdown",
          label: "Account Status",
          options: STATUS_OPTIONS,
          placeholder: "Select Status",
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
          placeholder: "Confirm Password...",
          required: true,
        },
      ],
    },
    5: {
      title: "Documents",
      fields: [
        {
          name: "cv",
          type: "input",
          inputType: "file",
          label: "Upload CV",
          fullWidth: false,
        },
        {
          name: "certificates",
          type: "input",
          inputType: "file",
          label: "Upload Certificates",
          fullWidth: false,
        },
      ],
    },
  };

  const handleNext = () => setActiveTab((prev) => prev + 1);

  const handleBack = () => {
    if (activeTab > 1) {
      setActiveTab((prev) => prev - 1);
    } else {
      navigate("/teachers");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab < 5) {
      handleNext();
    } else {
      console.log("Teacher Data:", teacherData);
      showToast("Teacher added successfully!");

      // Record Activity
      recordActivity(
        ACTIVITY_TYPES.TEACHER_ADDED,
        "New teacher registration",
        `${teacherData.fullname} joined as ${teacherData.role} in ${teacherData.department} department`,
      );

      navigate("/teachers");
    }
  };

  const currentConfig = tabConfigs[activeTab];
  const steps = Object.values(tabConfigs);

  return (
    <div className="flex flex-col justify-center items-center px-6 w-full">
      <ProgressBar currentStep={activeTab} steps={steps} />
      <DynamicForm
        title={`Step ${activeTab}: ${currentConfig.title}`}
        fields={currentConfig.fields}
        formData={teacherData}
        setFormData={setTeacherData}
        onSubmit={handleSubmit}
        onClick={handleBack}
        submitButtonClassName=""
        buttonAreaClassName="col-span-2 flex items-center gap-4 justify-center"
      >
        {activeTab < 5 ? "Next" : "Add Teacher"}
      </DynamicForm>
    </div>
  );
};

export default AddTeacher;
