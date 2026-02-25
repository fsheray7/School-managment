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
  DEPARTMENT_OPTIONS,
  TEACHER_TYPE,
} from "../../constants/Store";
import StatusToggle from "../../components/ui/StatusToggle";
import ConfirmationModal from "../../components/ui/ConfirmationModal";

const Teachers = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState(
    teachersData.map((teacher) => ({
      ...teacher,
      profilePhoto: teacher.profileImage,
      password: teacher.password || "password123",
      status: teacher.status || "Active",
    })),
  );

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [teacherToUpdate, setTeacherToUpdate] = useState(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [typeFilter, setTypeFilter] = useState("");

  const handleToggleStatus = (teacher) => {
    setTeacherToUpdate(teacher);
    setIsConfirmOpen(true);
  };

  const confirmStatusUpdate = () => {
    if (!teacherToUpdate) return;

    const newStatus =
      teacherToUpdate.status === "Active" ? "Inactive" : "Active";
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherToUpdate.id ? { ...t, status: newStatus } : t,
      ),
    );
    showToast(
      `${teacherToUpdate.fullName}'s status changed to ${newStatus}`,
      "success",
    );
    setIsConfirmOpen(false);
    setTeacherToUpdate(null);
  };

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

  const nextStatus =
    teacherToUpdate?.status === "Active" ? "Inactive" : "Active";

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
    { header: "Contact", key: "contact", hiddenOnMobile: true },
    { header: "Email", key: "email", hiddenOnMobile: true },
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
    {
      header: "Status",
      key: "status",
      render: (teacher) => (
        <StatusToggle
          status={teacher.status}
          onToggle={() => handleToggleStatus(teacher)}
        />
      ),
    },
  ];

  const fields = [
    { label: "", name: "profilePhoto", type: "image", fullWidth: true },
    {
      label: "Teacher ID",
      name: "teacherId",
      type: "input",
      inputType: "text",
    },
    { label: "Full Name", name: "fullName", type: "input", inputType: "text" },
    { label: "Email", name: "email", type: "input", inputType: "email" },
    { label: "Contact", name: "contact", type: "input", inputType: "text" },
    {
      label: "Gender",
      name: "gender",
      type: "dropdown",
      options: GENDER_OPTIONS,
    },
    {
      label: "Department",
      name: "department",
      type: "dropdown",
      options: DEPARTMENT_OPTIONS,
    },
    {
      label: "Qualification",
      name: "qualification",
      type: "input",
      inputType: "text",
    },
    {
      label: "Experience",
      name: "experience",
      type: "input",
      inputType: "text",
    },
    { label: "Subject", name: "subject", type: "input", inputType: "text" },
    { label: "Role", name: "role", type: "dropdown", options: ROLE_OPTIONS },
    {
      label: "Type",
      name: "type",
      type: "dropdown",
      options: TEACHER_TYPE,
    },
    {
      label: "Password",
      name: "password",
      type: "input",
      inputType: "password",
    },
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
        {
          label: "Status",
          value: teacher.status,
          render: (val) => (
            <StatusToggle
              status={val}
              onToggle={() => handleToggleStatus(teacher)}
            />
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
    <section className="flex flex-col px-6 items-center mt-5 justify-start w-full bg-white gap-4">
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
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmStatusUpdate}
        title="Change Teacher Status"
        message={
          <span>
            Are you sure you want to change the status to{" "}
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${
                nextStatus === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {nextStatus}
            </span>{" "}
            for <strong>{teacherToUpdate?.fullName}</strong>?
          </span>
        }
      />
    </section>
  );
};

export default Teachers;
