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
  const [departmentFilter, setDepartmentFilter] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      // Delete all rows belonging to this grouped class
      setClasses(classes.filter((c) => c.className !== itemToDelete.className));
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
    setDepartmentFilter("");
    setCurrentPage(1);
  };

  // Derive unique options
  const uniqueDepartments = [
    ...new Set(classes.map((item) => item.department)),
  ].sort();

  // Filter the raw data first
  const filteredRawClasses = classes.filter((classItem) => {
    const matchesSearch =
      classItem.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.classTeacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter
      ? classItem.className === classFilter
      : true;
    const matchesDepartment = departmentFilter
      ? classItem.department === departmentFilter
      : true;

    return matchesSearch && matchesClass && matchesDepartment;
  });

  // Group sections by className
  const groupedClasses = Object.values(
    filteredRawClasses.reduce((acc, item) => {
      if (!acc[item.className]) {
        acc[item.className] = {
          id: item.id,
          className: item.className,
          department: item.department,
          sections: [],
          totalStudents: 0,
          classTeacher: item.classTeacher,
          // Keep original items for reference
          _items: [],
        };
      }
      acc[item.className].sections.push(item.section);
      acc[item.className].totalStudents += item.totalStudents;
      acc[item.className]._items.push(item);
      return acc;
    }, {}),
  );

  // Pagination Logic
  const totalPages = Math.ceil(groupedClasses.length / itemsPerPage);
  const paginatedClasses = groupedClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    { header: "Class", key: "className", fontBold: true },
    {
      header: "Sections",
      key: "sections",
      render: (classItem) => (
        <div className="flex flex-wrap gap-1.5">
          {classItem.sections.map((sec) => (
            <span
              key={sec}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
            >
              {sec}
            </span>
          ))}
        </div>
      ),
    },
    { header: "Department", key: "department", hiddenOnMobile: true },
    { header: "Total Students", key: "totalStudents", hiddenOnMobile: true },
    { header: "Class Teacher", key: "classTeacher", hiddenOnMobile: true },
  ];

  const fields = [
    {
      label: "Class",
      name: "className",
      type: "dropdown",
      options: CLASS_OPTIONS,
    },
    {
      label: "Department",
      name: "department",
      type: "dropdown",
      options: DEPARTMENT_OPTIONS,
    },
    {
      label: "Sections",
      name: "sections",
      type: "input",
      inputType: "text",
      render: (classItem) => (
        <div className="flex flex-wrap gap-1.5">
          {(classItem.sections || []).map((sec) => (
            <span
              key={sec}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
            >
              {sec}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Total Students",
      name: "totalStudents",
      type: "input",
      inputType: "number",
    },
    {
      label: "Class Teacher",
      name: "classTeacher",
      type: "input",
      inputType: "text",
    },
  ];

  const renderMobileCard = (classItem) => (
    <DataCard
      title={classItem.className}
      fields={[
        {
          label: "Sections",
          value: classItem.sections.join(", "),
        },
        { label: "Department", value: classItem.department },
        { label: "Students", value: classItem.totalStudents },
        { label: "Class Teacher", value: classItem.classTeacher },
      ]}
      actions={
        <ActionButtons
          onView={() => handleViewDetails(classItem)}
          onEdit={() => handleEdit(classItem)}
          onDelete={() => handleDelete(classItem)}
          itemName={classItem.className}
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
            itemName={classItem.className}
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
        totalItems={groupedClasses.length}
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
        itemName={itemToDelete ? itemToDelete.className : ""}
      />
    </section>
  );
};

export default Classes;
