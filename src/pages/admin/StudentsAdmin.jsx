import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import studentsData from "../../data/admindata/students/students";
import {
  CLASS_OPTIONS,
  GENDER_OPTIONS,
  getSectionsByClass,
} from "../../constants/Store";
import StudentFilters from "../../components/ui/Filters";
import DeleteModal from "../../components/ui/DeleteModal";
import DetailsModal from "../../components/ui/DetailsModal";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";
import DataCard from "../../components/ui/DataCard";
import Pagination from "../../components/ui/Pagination";
import { useToast } from "../../context/ToastContext";

const StudentsAdmin = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [students, setStudents] = useState(
    studentsData.map((student) => ({
      ...student,
      profilePhoto: student.profileImage,
    })),
  );
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    showToast("Student details updated successfully!");
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
    setCurrentPage(1);
  };

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

  // Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    { header: "Roll No", key: "rollNumber" },
    { header: "ID", key: "id" },
    { header: "Full Name", key: "fullName", fontBold: true },
    { header: "Gd.Name", key: "guardianName" },
    { header: "Gender", key: "gender" },
    { header: "Email", key: "email", hiddenOnMobile: true },
    { header: "Class", key: "class" },
    { header: "Section", key: "section" },
  ];

  const fields = [
    { label: "", name: "profilePhoto", type: "image", fullWidth: true },
    { label: "Full Name", name: "fullName", type: "input", inputType: "text" },
    {
      label: "Guardian Name",
      name: "guardianName",
      type: "input",
      inputType: "text",
    },
    { label: "Email", name: "email", type: "input", inputType: "email" },
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
      options: getSectionsByClass(selectedStudent?.class || ""),
    },
    {
      label: "Guardian Contact",
      name: "guardianContact",
      type: "input",
      inputType: "text",
    },
    {
      label: "Gender",
      name: "gender",
      type: "dropdown",
      options: GENDER_OPTIONS,
    },
    { label: "Username", name: "userName", type: "input", inputType: "text" },
    {
      label: "Password",
      name: "password",
      type: "input",
      inputType: "password",
    },
  ];

  const renderMobileCard = (student) => (
    <DataCard
      title={student.fullName}
      fields={[
        { label: "Guardian", value: student.guardianName },
        { label: "Email", value: student.email },
        { label: "Gender", value: student.gender },
        { label: "Class", value: student.class },
        { label: "Section", value: student.section },
        { label: "Contact", value: student.guardianContact },
        { label: "Roll No", value: student.rollNumber },
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
    <section className="flex flex-col items-center mt-5 justify-start w-full bg-white  gap-4">
      <div className="w-full">
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
              options: GENDER_OPTIONS,
              placeholder: "Gender",
            },
            {
              value: classFilter,
              onChange: (val) => {
                setClassFilter(val);
                setSectionFilter("");
              },
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
        data={paginatedStudents}
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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredStudents.length}
        itemsPerPage={itemsPerPage}
      />

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
