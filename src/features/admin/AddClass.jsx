import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/ui/DynamicForm";
import {
  CLASS_OPTIONS,
  getSectionsByClass,
  DEPARTMENT_OPTIONS,
  STATUS_OPTIONS,
  TEACHERS,
  SESSION_OPTIONS,
} from "../../constants/Store";

const AddClass = () => {
  const navigate = useNavigate();

  const [classData, setClassData] = useState({
    className: "",
    section: "",
    department: "",
    academicSession: "2025-26",
    maxCapacity: "",
    classTeacher: "",
    status: "Active",
  });

  const classFields = [
    {
      type: "dropdown",
      label: "Class",
      name: "className",
      options: CLASS_OPTIONS,
      placeholder: "Select or type class...",
      searchable: true,
      creatable: true,
      required: true,
    },
    {
      type: "dropdown",
      label: "Section",
      name: "section",
      options: (data) => getSectionsByClass(data.className),
      placeholder: "Select or type section...",
      searchable: true,
      creatable: true,
      required: true,
    },

    {
      type: "dropdown",
      label: "Department",
      name: "department",
      options: ["Primary", "Middle", "Secondary", "Higher Secondary"],
      placeholder: "Select Department",
      required: true,
    },
    {
      type: "input",
      label: "Max Capacity",
      name: "maxCapacity",
      placeholder: "Enter Max Capacity...",
      inputType: "number",
    },
  ];

  const handleBack = () => {
    navigate("/classes");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(classData);
    navigate("/classes");
  };

  return (
    <div className="flex justify-center mt-15 items-center">
      <DynamicForm
        title="Class Information"
        fields={classFields}
        formData={classData}
        setFormData={setClassData}
        onSubmit={handleSubmit}
        onClick={handleBack}
      >
        Add Class
      </DynamicForm>
    </div>
  );
};

export default AddClass;
