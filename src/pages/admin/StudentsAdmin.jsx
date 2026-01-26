import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import studentsData from "../../data/admindata/students/students";
import StudentFilters from "../../components/ui/Filters";
import DeleteModal from "../../components/ui/DeleteModal";
import DetailsModal from "../../components/ui/DetailsModal";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";
import DataCard from "../../components/ui/DataCard";

const StudentsAdmin = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState(studentsData);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [genderFilter, setGenderFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent({ ...student });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (student) => {
    setItemToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setStudents(students.filter((s) => s.id !== itemToDelete.id));
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSaveEdit = () => {
    setStudents(
      students.map((s) => (s.id === selectedStudent.id ? selectedStudent : s)),
    );
    alert("Student details updated successfully!");
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setIsEditMode(false);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setGenderFilter("");
    setClassFilter("");
    setSectionFilter("");
  };

  const uniqueClasses = [...new Set(students.map((item) => item.class))].sort();
  const uniqueSections = [
    ...new Set(students.map((item) => item.section)),
  ].sort();

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGender = genderFilter ? student.gender === genderFilter : true;
    const matchesClass = classFilter ? student.class === classFilter : true;
    const matchesSection = sectionFilter
      ? student.section === sectionFilter
      : true;

    return matchesSearch && matchesGender && matchesClass && matchesSection;
  });

  const columns = [
    { header: "Full Name", key: "fullName", fontBold: true },
    { header: "Gd.Name", key: "guardianName" },
    { header: "Gender", key: "gender" },
    { header: "Email", key: "email", hiddenOnMobile: true },
    { header: "Subject", key: "subject", hiddenOnMobile: true },
    { header: "Class", key: "class" },
    { header: "Section", key: "section" },
    { header: "Gd.Contact", key: "guardianContact", hiddenOnMobile: true },
  ];

  const fields = [
    { label: "Full Name", key: "fullName", type: "text" },
    { label: "Guardian Name", key: "guardianName", type: "text" },
    { label: "Email", key: "email", type: "email" },
    {
      type: "grid",
      gridFields: [
        { label: "Class", key: "class", type: "text" },
        { label: "Section", key: "section", type: "text" },
      ],
    },
    { label: "Subject", key: "subject", type: "text" },
    { label: "Guardian Contact", key: "guardianContact", type: "text" },
  ];

  const renderMobileCard = (student) => (
    <DataCard
      title={student.fullName}
      fields={[
        { label: "Guardian", value: student.guardianName },
        { label: "Email", value: student.email },
        { label: "Gender", value: student.gender },
        { label: "Subject", value: student.subject },
        { label: "Class", value: student.class },
        { label: "Section", value: student.section },
        { label: "Contact", value: student.guardianContact },
      ]}
      actions={
        <ActionButtons
          onView={() => handleViewDetails(student)}
          onEdit={() => handleEdit(student)}
          onDelete={() => handleDelete(student)}
          itemName={student.fullName}
        />
      }
    />
  );

  return (
    <section className="flex flex-col items-center justify-start w-full bg-white  gap-4  pt-20">
      <div className="w-full px-4 md:px-6">
        <StudentFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder="Search Student..."
          onReset={resetFilters}
          onAdd={() => navigate("/add-student")}
          addLabel="+ Student"
          filters={[
            {
              value: genderFilter,
              onChange: setGenderFilter,
              options: ["Male", "Female"],
              placeholder: "Gender",
            },
            {
              value: classFilter,
              onChange: setClassFilter,
              options: uniqueClasses,
              placeholder: "Class",
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
        data={filteredStudents}
        renderActions={(student) => (
          <ActionButtons
            onView={() => handleViewDetails(student)}
            onEdit={() => handleEdit(student)}
            onDelete={() => handleDelete(student)}
            itemName={student.fullName}
          />
        )}
        renderMobileCard={renderMobileCard}
        emptyMessage="No students found."
      />

      {filteredStudents.length === 0 && (
        <div className="p-8 text-center text-gray-500">No students found.</div>
      )}

      {/* ================= MODAL ================= */}
      <DetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? "Edit Student" : "Student Details"}
        isEditMode={isEditMode}
        data={selectedStudent}
        onDataChange={setSelectedStudent}
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

export default StudentsAdmin;
