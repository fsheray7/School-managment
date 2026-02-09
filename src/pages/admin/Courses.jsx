import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import coursesData from "../../data/admindata/courses";
import Filters from "../../components/ui/Filters";
import DeleteModal from "../../components/ui/DeleteModal";
import DetailsModal from "../../components/ui/DetailsModal";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";
import DataCard from "../../components/ui/DataCard";
import Pagination from "../../components/ui/Pagination";
import { useToast } from "../../context/ToastContext";
import { CLASS_OPTIONS, getSectionsByClass } from "../../constants/Store";

const Courses = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [courses, setCourses] = useState(coursesData);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset section filter when class filter changes
  useEffect(() => {
    setSectionFilter("");
  }, [classFilter]);

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse({ ...course });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (course) => {
    setItemToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setCourses(courses.filter((c) => c.id !== itemToDelete.id));
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSaveEdit = () => {
    setCourses(
      courses.map((c) => (c.id === selectedCourse.id ? selectedCourse : c)),
    );
    showToast("Course details updated successfully!");
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setIsEditMode(false);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setCourseFilter("");
    setClassFilter("");
    setSectionFilter("");
    setCurrentPage(1);
  };

  // Derive unique options
  const uniqueCourseNames = [
    ...new Set(courses.map((item) => item.courseName)),
  ].sort();
  const uniqueClasses = [...new Set(courses.map((item) => item.class))].sort();
  const uniqueSections = [
    ...new Set(courses.map((item) => item.section)),
  ].sort();

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter
      ? course.courseName === courseFilter
      : true;
    const matchesClass = classFilter ? course.class === classFilter : true;
    const matchesSection = sectionFilter
      ? course.section === sectionFilter
      : true;

    return matchesSearch && matchesCourse && matchesClass && matchesSection;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    { header: "Course Name", key: "courseName", fontBold: true },
    { header: "Code", key: "courseCode" },
    { header: "Instructor", key: "instructor" },
    { header: "Class", key: "class" },
    { header: "Section", key: "section" },
    {
      header: "Status",
      key: "status",
      render: (course) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${course.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {course.status}
        </span>
      ),
    },
  ];

  const fields = [
    {
      type: "grid",
      gridFields: [
        { label: "Course Name", key: "courseName", type: "text" },
        { label: "Course Code", key: "courseCode", type: "text" },
      ],
    },
    { label: "Instructor", key: "instructor", type: "text" },
    {
      type: "grid",
      gridFields: [
        {
          label: "Class",
          key: "class",
          type: "select",
          options: CLASS_OPTIONS,
        },
        {
          label: "Section",
          key: "section",
          type: "select",
          options: getSectionsByClass(selectedCourse?.class || ""),
        },
      ],
    },
    {
      label: "Status",
      key: "status",
      type: "select",
      options: ["Active", "Inactive"],
      render: (course) => (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${course.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {course.status}
          </span>
        </div>
      ),
    },
  ];

  const renderMobileCard = (course) => (
    <DataCard
      title={course.courseName}
      fields={[
        { label: "Code", value: course.courseCode },
        { label: "Instructor", value: course.instructor },
        { label: "Class", value: course.class },
        { label: "Section", value: course.section },
        {
          label: "Status",
          value: course.status,
          render: (val) => (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${val === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {val}
            </span>
          ),
        },
      ]}
      actions={
        <ActionButtons
          onView={() => handleViewDetails(course)}
          onEdit={() => handleEdit(course)}
          onDelete={() => handleDelete(course)}
          itemName={course.courseName}
        />
      }
    />
  );

  return (
    <section className="flex flex-col items-center justify-start w-full bg-white gap-4  pt-20">
      <div className="w-full">
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder="Search Course..."
          onReset={resetFilters}
          onAdd={() => navigate("/add-course")}
          addLabel="+ Course"
          filters={[
            {
              value: courseFilter,
              onChange: setCourseFilter,
              options: uniqueCourseNames,
              placeholder: "Subject",
              searchable: true,
            },
            {
              value: classFilter,
              onChange: setClassFilter,
              options: CLASS_OPTIONS,
              placeholder: "Class",
            },
            {
              value: sectionFilter,
              onChange: setSectionFilter,
              options: getSectionsByClass(classFilter),
              placeholder: "Section",
            },
          ]}
        />
      </div>

      <DataTable
        columns={columns}
        data={paginatedCourses}
        renderActions={(course) => (
          <ActionButtons
            onView={() => handleViewDetails(course)}
            onEdit={() => handleEdit(course)}
            onDelete={() => handleDelete(course)}
            itemName={course.courseName}
          />
        )}
        renderMobileCard={renderMobileCard}
        emptyMessage="No courses found."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredCourses.length}
        itemsPerPage={itemsPerPage}
      />

      {/* ================= MODAL ================= */}
      <DetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? "Edit Course" : "Course Details"}
        isEditMode={isEditMode}
        data={selectedCourse}
        onDataChange={setSelectedCourse}
        onSave={handleSaveEdit}
        fields={fields}
      />

      {/* ================= DELETE MODAL ================= */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.courseName}
      />
    </section>
  );
};

export default Courses;
