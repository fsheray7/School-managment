import React, { useState, useEffect } from "react";
import coursesData from "../../data/admindata/courses";
import CustomDropdown from "../ui/CustomDropdown";

const TeacherSelector = ({ onSelectionChange }) => {
  const [teacher, setTeacher] = useState(null);
  const [assignedCourses, setAssignedCourses] = useState([]);

  const [selection, setSelection] = useState({
    class: "",
    section: "",
    subject: "",
    terminal: "",
  });

  useEffect(() => {
    const storedTeacher = localStorage.getItem("currentTeacher");
    if (storedTeacher) {
      const teacherData = JSON.parse(storedTeacher);
      setTeacher(teacherData);

      // Filter courses where this teacher is the instructor
      const filtered = coursesData.filter(
        (course) => course.instructor === teacherData.fullName,
      );
      setAssignedCourses(filtered);

      // Set initial defaults if courses exist
      if (filtered.length > 0) {
        setSelection({
          class: filtered[0].class,
          section: filtered[0].section,
          subject: filtered[0].courseName,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (
      onSelectionChange &&
      selection.class &&
      selection.section &&
      selection.subject
    ) {
      onSelectionChange(selection);
    }
  }, [selection, onSelectionChange]);

  const handleTerminalChange = (newTerminal) => {
    setSelection((prev) => ({ ...prev, terminal: newTerminal }));
  };

  const handleClassChange = (newClass) => {
    const firstCourseForClass = assignedCourses.find(
      (c) => c.class === newClass,
    );
    setSelection((prev) => ({
      ...prev,
      class: newClass,
      section: firstCourseForClass ? firstCourseForClass.section : "",
      subject: firstCourseForClass ? firstCourseForClass.courseName : "",
    }));
  };

  const handleSectionChange = (newSection) => {
    const firstCourseForSection = assignedCourses.find(
      (c) => c.class === selection.class && c.section === newSection,
    );
    setSelection((prev) => ({
      ...prev,
      section: newSection,
      subject: firstCourseForSection ? firstCourseForSection.courseName : "",
    }));
  };

  const handleSubjectChange = (newSubject) => {
    setSelection((prev) => ({ ...prev, subject: newSubject }));
  };

  if (!teacher || assignedCourses.length === 0) return null;

  // Derive unique options
  const classes = [...new Set(assignedCourses.map((c) => c.class))];
  const sections = [
    ...new Set(
      assignedCourses
        .filter((c) => c.class === selection.class)
        .map((c) => c.section),
    ),
  ];
  const subjects = assignedCourses
    .filter(
      (c) => c.class === selection.class && c.section === selection.section,
    )
    .map((c) => c.courseName);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-4 bg-white ">
      {/* Terminal Dropdown */}
      <div className="flex-1 flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          Terminal
        </label>
        <CustomDropdown
          options={["First Terminal", "Second Terminal"]}
          value={selection.terminal}
          onChange={handleTerminalChange}
          placeholder="Select Terminal"
          triggerClassName="border-gray-200 focus:border-[var(--primary-color)]"
        />
      </div>

      {/* Class Dropdown */}
      <div className="flex-1 flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          Class
        </label>
        <CustomDropdown
          options={classes}
          value={selection.class}
          onChange={handleClassChange}
          placeholder="Select Class"
          triggerClassName="border-gray-200  focus:border-[var(--primary-color)]"
        />
      </div>

      {/* Section Dropdown */}
      <div className="flex-1 flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          Section
        </label>
        <CustomDropdown
          options={sections}
          value={selection.section}
          onChange={handleSectionChange}
          placeholder="Select Section"
          triggerClassName="border-gray-200 focus:border-[var(--primary-color)]"
        />
      </div>

      {/* Subject Dropdown */}
      <div className="flex-1 flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          Subject
        </label>
        <CustomDropdown
          options={subjects}
          value={selection.subject}
          onChange={handleSubjectChange}
          placeholder="Select Subject"
          triggerClassName="border-gray-200 focus:border-[var(--primary-color)]"
        />
      </div>
    </div>
  );
};

export default TeacherSelector;
