import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classesData from "../../data/admindata/classes";
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
  DEPARTMENT_OPTIONS,
  STATUS_OPTIONS,
} from "../../constants/Store";

const Classes = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [classes, setClasses] = useState(classesData);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset section filter when class filter changes
  useEffect(() => {
    setSectionFilter("");
  }, [classFilter]);

  const handleViewDetails = (classItem) => {
    setSelectedClass(classItem);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (classItem) => {
    setSelectedClass({ ...classItem });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (classItem) => {
    setItemToDelete(classItem);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setClasses(classes.filter((c) => c.id !== itemToDelete.id));
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      showToast("Class deleted successfully!");
    }
  };

  const handleSaveEdit = () => {
    setClasses(
      classes.map((c) => (c.id === selectedClass.id ? selectedClass : c)),
    );
    showToast("Class details updated successfully!");
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
    setIsEditMode(false);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setClassFilter("");
    setSectionFilter("");
    setDepartmentFilter("");
    setCurrentPage(1);
  };

  // Derive unique options
  const uniqueClasses = [
    ...new Set(classes.map((item) => item.className)),
  ].sort();
  const uniqueSections = [
    ...new Set(classes.map((item) => item.section)),
  ].sort();
  const uniqueDepartments = [
    ...new Set(classes.map((item) => item.department)),
  ].sort();

  const filteredClasses = classes.filter((classItem) => {
    const matchesSearch =
      classItem.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.classTeacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter
      ? classItem.className === classFilter
      : true;
    const matchesSection = sectionFilter
      ? classItem.section === sectionFilter
      : true;
    const matchesDepartment = departmentFilter
      ? classItem.department === departmentFilter
      : true;

    return matchesSearch && matchesClass && matchesSection && matchesDepartment;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    { header: "Class", key: "className", fontBold: true },
    { header: "Section", key: "section" },
    { header: "Department", key: "department", hiddenOnMobile: true },
    { header: "Students", key: "totalStudents", hiddenOnMobile: true },
    { header: "Class Teacher", key: "classTeacher", hiddenOnMobile: true },
    {
      header: "Status",
      key: "status",
      render: (classItem) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${classItem.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {classItem.status}
        </span>
      ),
    },
  ];

  const fields = [
    {
      type: "grid",
      gridFields: [
        {
          label: "Class",
          key: "className",
          type: "select",
          options: CLASS_OPTIONS,
        },
        {
          label: "Section",
          key: "section",
          type: "select",
          options: getSectionsByClass(selectedClass?.className || ""),
        },
      ],
    },
    {
      type: "grid",
      gridFields: [
        {
          label: "Department",
          key: "department",
          type: "select",
          options: DEPARTMENT_OPTIONS,
        },
        { label: "Total Students", key: "totalStudents", type: "number" },
      ],
    },
    { label: "Class Teacher", key: "classTeacher", type: "text" },
    {
      label: "Status",
      key: "status",
      type: "select",
      options: STATUS_OPTIONS,
      render: (classItem) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${classItem.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {classItem.status}
        </span>
      ),
    },
  ];

  const renderMobileCard = (classItem) => (
    <DataCard
      title={`${classItem.className} - ${classItem.section}`}
      fields={[
        { label: "Department", value: classItem.department },
        { label: "Students", value: classItem.totalStudents },
        { label: "Class Teacher", value: classItem.classTeacher },
        {
          label: "Status",
          value: classItem.status,
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
          onView={() => handleViewDetails(classItem)}
          onEdit={() => handleEdit(classItem)}
          onDelete={() => handleDelete(classItem)}
          itemName={`${classItem.className} - ${classItem.section}`}
        />
      }
    />
  );

  return (
    <section className="flex flex-col items-center mt-5 justify-start w-full bg-white gap-4">
      <div className="w-full">
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder="Search Class..."
          onReset={resetFilters}
          onAdd={() => navigate("/add-class")}
          addLabel="+ Class"
          filters={[
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
            {
              value: departmentFilter,
              onChange: setDepartmentFilter,
              options: uniqueDepartments,
              placeholder: "Department",
            },
          ]}
        />
      </div>

      <DataTable
        columns={columns}
        data={paginatedClasses}
        renderActions={(classItem) => (
          <ActionButtons
            onView={() => handleViewDetails(classItem)}
            onEdit={() => handleEdit(classItem)}
            onDelete={() => handleDelete(classItem)}
            itemName={`${classItem.className} - ${classItem.section}`}
          />
        )}
        renderMobileCard={renderMobileCard}
        emptyMessage="No classes found."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredClasses.length}
        itemsPerPage={itemsPerPage}
      />

      {/* ================= MODAL ================= */}
      <DetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? "Edit Class" : "Class Details"}
        isEditMode={isEditMode}
        data={selectedClass}
        onDataChange={setSelectedClass}
        onSave={handleSaveEdit}
        fields={fields}
      />

      {/* ================= DELETE MODAL ================= */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={
          itemToDelete
            ? `${itemToDelete.className} - ${itemToDelete.section}`
            : ""
        }
      />
    </section>
  );
};

export default Classes;
