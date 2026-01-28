import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEACHER_TYPE, CLASS_OPTIONS } from "../../constants/DropDownOptions";
import Button from "../../components/ui/Button";
import { IoArrowBack } from "react-icons/io5";
import DynamicForm from "../../components/ui/DynamicForm";

const AddTeacher = () => {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState({
    fullname: "",
    email: "",
    subject: "",
    classes: [],
    contact: "",
    type: "",
  });

  const teacherFields = [
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
      name: "subject",
      type: "input",
      inputType: "text",
      label: "Subject",
      placeholder: "Enter Subject...",
      required: true,
    },
    {
      name: "classes",
      type: "dropdown",
      label: "Classes",
      options: CLASS_OPTIONS,
      placeholder: "Select Classes...",
      required: true,
      multiSelect: true,
      searchable: true,
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
      name: "type",
      type: "dropdown",
      label: "Type",
      options: TEACHER_TYPE,
      placeholder: "Select Type...",
      required: true,
    },
  ];

  const handleBack = () => {
    navigate("/teachers");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Teacher Data:", teacherData);
    alert("Teacher added successfully!");
    navigate("/teachers");
  };

  return (
    <div className="flex justify-start items-center">
      <DynamicForm
        title="Teacher Info"
        fields={teacherFields}
        formData={teacherData}
        setFormData={setTeacherData}
        onSubmit={handleSubmit}
        headerActions={
          <Button
            onClick={handleBack}
            variant="ghost"
            icon={<IoArrowBack size={20} />}
          />
        }
      >
        Add Teacher
      </DynamicForm>
    </div>
  );
};

export default AddTeacher;
