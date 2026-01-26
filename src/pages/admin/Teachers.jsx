import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";
import teachersData from "../../data/teachers/teacher";
import Filters from "../../components/ui/Filters";
import DeleteModal from "../../components/ui/DeleteModal";
import DetailsModal from "../../components/ui/DetailsModal";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";
import DataCard from "../../components/ui/DataCard";

const Teachers = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState(teachersData);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
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
    alert("Teacher details updated successfully!");
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
    setTypeFilter("");
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
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter
      ? teacher.subject === subjectFilter
      : true;
    const matchesSection = sectionFilter
      ? teacher.section === sectionFilter
      : true;
    const matchesType = typeFilter ? teacher.type === typeFilter : true;

    return matchesSearch && matchesSubject && matchesSection && matchesType;
  });

  const columns = [
    { header: "Full Name", key: "fullName", fontBold: true },
    { header: "Email", key: "email", hidden: true },
    { header: "Subject", key: "subject", hiddenOnMobile: true },
    { header: "Section", key: "section", hiddenOnMobile: true },
    { header: "Contact", key: "contact", hiddenOnMobile: true },
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
    { label: "Full Name", key: "fullName", type: "text" },
    { label: "Email", key: "email", type: "email" },
    {
      type: "grid",
      gridFields: [
        { label: "Subject", key: "subject", type: "text" },
        { label: "Section", key: "section", type: "text" },
      ],
    },
    { label: "Contact", key: "contact", type: "text" },
    {
      label: "Type",
      key: "type",
      type: "select",
      options: ["Regular", "Contractual"],
      render: (teacher) => (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${teacher.type === "Regular" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
          >
            {teacher.type}
          </span>
        </div>
      ),
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
      <div className="w-full px-4 md:px-6">
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
            },
            {
              value: typeFilter,
              onChange: setTypeFilter,
              options: uniqueTypes,
              placeholder: "Type",
            },
            {
              value: sectionFilter,
              onChange: setSectionFilter,
              options: uniqueSections,
              placeholder: "Section",
            },
          ]}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredTeachers}
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
