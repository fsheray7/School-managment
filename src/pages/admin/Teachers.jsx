import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import teachersData from "../../data/teachers/teacher";
import Filters from "../../components/ui/Filters";
import DeleteModal from "../../components/ui/DeleteModal";
import DetailsModal from "../../components/ui/DetailsModal";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";
import DataCard from "../../components/ui/DataCard";
import Pagination from "../../components/ui/Pagination";
import { useToast } from "../../context/ToastContext";
import {
  CLASS_OPTIONS,
  getSectionsByClass,
  ROLE_OPTIONS,
  GENDER_OPTIONS,
  STATUS_OPTIONS,
  DEPARTMENT_OPTIONS,
  TEACHER_TYPE,
} from "../../constants/Store";

const Teachers = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState(
    teachersData.map((teacher) => ({
      ...teacher,
      profilePhoto: teacher.profileImage,
      password: teacher.password || "password123", // Keep default if not in data
    })),
  );

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [typeFilter, setTypeFilter] = useState("");

  const handleViewDetails = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher({ ...teacher });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (teacher) => {
    setItemToDelete(teacher);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setTeachers(teachers.filter((t) => t.id !== itemToDelete.id));
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSaveEdit = () => {
    setTeachers(
      teachers.map((t) => (t.id === selectedTeacher.id ? selectedTeacher : t)),
    );
    showToast("Teacher details updated successfully!");
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
    setIsEditMode(false);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSubjectFilter("");
    setSectionFilter("");

    setCurrentPage(1);
  };

  // Derive unique options
  const uniqueSubjects = [
    ...new Set(teachers.map((item) => item.subject)),
  ].sort();
  const uniqueSections = [
    ...new Set(teachers.map((item) => item.section)),
  ].sort();
  const uniqueTypes = [...new Set(teachers.map((item) => item.type))].sort();

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter
      ? teacher.subject === subjectFilter
      : true;
    const matchesSection = sectionFilter
      ? teacher.section === sectionFilter
      : true;
    const matchesType = typeFilter ? teacher.type === typeFilter : true;

    return matchesSearch && matchesSubject && matchesSection && matchesType;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (filterSetter, value) => {
    filterSetter(value);
    setCurrentPage(1);
  };

  const columns = [
    { header: "ID", key: "teacherId", fontBold: true },
    { header: "Full Name", key: "fullName", fontBold: true },
    { header: "Subject", key: "subject", hiddenOnMobile: true },
    { header: "Department", key: "department", hiddenOnMobile: true },
    {
      header: "Status",
      key: "status",
      render: (teacher) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            teacher.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {teacher.status}
        </span>
      ),
    },
    {
      header: "Type",
      key: "type",
      hiddenOnMobile: true,
      render: (teacher) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${teacher.type === "Regular" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
        >
          {teacher.type}
        </span>
      ),
    },
  ];

  const fields = [
    { label: "", key: "profilePhoto", type: "image", isFullWidth: true },
    {
      type: "grid",
      gridFields: [
        { label: "Teacher ID", key: "teacherId", type: "text" },
        { label: "Full Name", key: "fullName", type: "text" },
      ],
    },
    {
      type: "grid",
      gridFields: [
        { label: "Email", key: "email", type: "email" },
        { label: "Contact", key: "contact", type: "text" },
      ],
    },
    {
      type: "grid",
      gridFields: [
        {
          label: "Gender",
          key: "gender",
          type: "select",
          options: GENDER_OPTIONS,
        },
        {
          label: "Department",
          key: "department",
          type: "select",
          options: DEPARTMENT_OPTIONS,
        },
      ],
    },
    {
      type: "grid",
      gridFields: [
        { label: "Qualification", key: "qualification", type: "text" },
        { label: "Experience", key: "experience", type: "text" },
      ],
    },
    {
      type: "grid",
      gridFields: [
        { label: "Subject", key: "subject", type: "text" },
        { label: "Role", key: "role", type: "select", options: ROLE_OPTIONS },
      ],
    },
    {
      type: "grid",
      gridFields: [
        {
          label: "Status",
          key: "status",
          type: "select",
          options: STATUS_OPTIONS,
          render: (t) => (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${t.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {t.status}
            </span>
          ),
        },
        {
          label: "Type",
          key: "type",
          type: "select",
          options: TEACHER_TYPE,
          render: (t) => (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${t.type === "Regular" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
            >
              {t.type}
            </span>
          ),
        },
      ],
    },
    { label: "Password", key: "password", type: "password" },
  ];

  const renderMobileCard = (teacher) => (
    <DataCard
      title={teacher.fullName}
      fields={[
        { label: "Email", value: teacher.email },
        { label: "Subject", value: teacher.subject },
        { label: "Section", value: teacher.section },
        { label: "Contact", value: teacher.contact },
        {
          label: "Type",
          value: teacher.type,
          render: (val) => (
            <span
              className={`font-semibold ${val === "Regular" ? "text-green-600" : "text-blue-600"}`}
            >
              {val}
            </span>
          ),
        },
      ]}
      actions={
        <ActionButtons
          onView={() => handleViewDetails(teacher)}
          onEdit={() => handleEdit(teacher)}
          onDelete={() => handleDelete(teacher)}
          itemName={teacher.fullName}
        />
      }
    />
  );

  return (
    <section className="flex flex-col items-center justify-start w-full bg-white gap-4  pt-20">
      <div className="w-full ">
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder="Search Teacher..."
          onReset={resetFilters}
          onAdd={() => navigate("/add-teacher")}
          addLabel="+  Teacher"
          filters={[
            {
              value: subjectFilter,
              onChange: setSubjectFilter,
              options: uniqueSubjects,
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
        data={paginatedTeachers}
        renderActions={(teacher) => (
          <ActionButtons
            onView={() => handleViewDetails(teacher)}
            onEdit={() => handleEdit(teacher)}
            onDelete={() => handleDelete(teacher)}
            itemName={teacher.fullName}
          />
        )}
        renderMobileCard={renderMobileCard}
        emptyMessage="No teachers found."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredTeachers.length}
        itemsPerPage={itemsPerPage}
      />

      {/* ================= MODAL ================= */}
      <DetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? "Edit Teacher" : "Teacher Details"}
        isEditMode={isEditMode}
        data={selectedTeacher}
        onDataChange={setSelectedTeacher}
        onSave={handleSaveEdit}
        fields={fields}
      />

      {/* ================= DELETE MODAL ================= */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.fullName}
      />
    </section>
  );
};

export default Teachers;
