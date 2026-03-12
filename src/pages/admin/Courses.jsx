import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  updateCourse,
  deleteCourse,
  toggleCourseStatus,
} from "../../store/slices/coursesSlice";
import { addToast } from "../../store/slices/toastSlice";
import Filters from "../../components/ui/Filters";
import DeleteModal from "../../components/ui/DeleteModal";
import DetailsModal from "../../components/ui/DetailsModal";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";
import DataCard from "../../components/ui/DataCard";
import Pagination from "../../components/ui/Pagination";

import { CLASS_OPTIONS, getSectionsByClass } from "../../constants/Store";
import StatusToggle from "../../components/ui/StatusToggle";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.courses.courses);
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [courseToUpdate, setCourseToUpdate] = useState(null);
  const nextStatus =
    courseToUpdate?.status === "Active" ? "Inactive" : "Active";

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

  const handleToggleStatus = (course) => {
    setCourseToUpdate(course);
    setIsConfirmOpen(true);
  };

  const confirmStatusUpdate = () => {
    if (!courseToUpdate) return;

    dispatch(toggleCourseStatus(courseToUpdate.id));
    dispatch(
      addToast({
        message: `${courseToUpdate.courseName}'s status changed to ${nextStatus}`,
        type: "success",
      }),
    );
    setIsConfirmOpen(false);
    setCourseToUpdate(null);
  };

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
      dispatch(deleteCourse(itemToDelete.id));
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSaveEdit = () => {
    dispatch(updateCourse(selectedCourse));
    dispatch(addToast({ message: "Course details updated successfully!" }));
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
        <StatusToggle
          status={course.status}
          onToggle={() => handleToggleStatus(course)}
        />
      ),
    },
  ];

  const fields = [
    {
      label: "Course Name",
      name: "courseName",
      type: "input",
      inputType: "text",
    },
    {
      label: "Course Code",
      name: "courseCode",
      type: "input",
      inputType: "text",
    },
    {
      label: "Instructor",
      name: "instructor",
      type: "input",
      inputType: "text",
    },
    {
      label: "Class",
      name: "class",
      type: "dropdown",
      options: CLASS_OPTIONS,
    },
    {
      label: "Section",
      name: "section",
      type: "dropdown",
      options: getSectionsByClass(selectedCourse?.class || ""),
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
            <StatusToggle
              status={val}
              onToggle={() => handleToggleStatus(course)}
            />
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
    <section className="flex flex-col px-1 md:px-6 items-center mt-5 justify-start w-full bg-white gap-4">
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

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmStatusUpdate}
        title="Change Course Status"
        message={
          <span>
            Are you sure you want to set the status{" "}
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${
                nextStatus === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {nextStatus}
            </span>{" "}
            for <strong>{courseToUpdate?.courseName}</strong>?
          </span>
        }
      />
    </section>
  );
};

export default Courses;
