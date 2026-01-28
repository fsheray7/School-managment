import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/ui/DynamicForm";
import Button from "../../components/ui/Button";
import {
  CLASS_OPTIONS,
  getSectionsByClass,
  COURSE_STATUS,
  TEACHERS,
} from "../../constants/DropDownOptions";
import { IoArrowBack } from "react-icons/io5";

const AddCourse = () => {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    courseName: "",
    courseCode: "",
    instructor: "",
    class: "",
    section: [],
    status: "Active",
  });

  const courseFields = [
    {
      type: "input",
      label: "Course Name",
      name: "courseName",
      placeholder: "Enter Course Name...",
      inputType: "text",
      required: true,
    },
    {
      type: "input",
      label: "Course Code",
      name: "courseCode",
      placeholder: "Enter Course Code...",
      inputType: "text",
      required: true,
    },
    {
      type: "dropdown",
      label: "Instructor",
      name: "instructor",
      placeholder: "Select Instructor...",
      options: TEACHERS,
      required: true,
      searchable: true,
    },
    {
      type: "dropdown",
      label: "Status",
      name: "status",
      options: COURSE_STATUS,
      placeholder: "Select Status",
    },
    {
      type: "dropdown",
      label: "Class",
      name: "class",
      options: CLASS_OPTIONS,
      placeholder: "Select Class",
    },
    {
      type: "dropdown",
      label: "Section",
      name: "section",
      options: (data) => getSectionsByClass(data.class),
      placeholder: "Select Section",
      required: true,
      multiSelect: true,
    },
  ];

  const handleBack = () => {
    navigate("/courses");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(courseData);
    navigate("/courses");
  };

  return (
    <div className="flex justify-start items-center">
      <DynamicForm
        title="Course Information"
        fields={courseFields}
        formData={courseData}
        setFormData={setCourseData}
        onSubmit={handleSubmit}
        headerActions={
          <Button
            onClick={handleBack}
            variant="ghost"
            icon={<IoArrowBack size={22} />}
          />
        }
      >
        Add Course
      </DynamicForm>
    </div>
  );
};

export default AddCourse;
