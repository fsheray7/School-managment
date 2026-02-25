import React, { useState, useEffect } from "react";
import {
  FaFilter,
  FaArrowRight,
  FaUserGraduate,
  FaLevelUpAlt,
} from "react-icons/fa";
import Button from "../../components/ui/Button";

import {
  SESSION_OPTIONS,
  getNextClass,
  getSectionsByClass,
} from "../../constants/Store";
import CustomDropdown from "../../components/ui/CustomDropdown";
import DataTable from "../../components/ui/DataTable";
import { useToast } from "../../context/ToastContext";
import {
  getSubmittedPromotionData,
  getAvailablePromotionSubmissions,
  promoteStudents,
} from "../../utils/marksManager";
import ConfirmationModal from "../../components/ui/ConfirmationModal";

const StudentPromotion = ({
  label="uppercase text-xs font-semibold text-[var(--primary-color)]"
}) => {
  // Filter States
  const [filters, setFilters] = useState({
    fromClass: "",
    fromSection: "",
    toClass: "",
    toSection: "",
    year: SESSION_OPTIONS[1] || "2024-25", // Default to current session
  });

  // Data States
  const [students, setStudents] = useState([]);
  const [promoteAllPassed, setPromoteAllPassed] = useState(false);
  const [availableSubmissions, setAvailableSubmissions] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Derived State
  const selectedCount = students.filter((s) => s.isChecked).length;
  const isAllSelected =
    students.length > 0 && students.every((s) => s.isChecked);

  useEffect(() => {
    setAvailableSubmissions(getAvailablePromotionSubmissions());
  }, []);

  // Dynamic Options
  const fromClassOptions = [
    ...new Set(availableSubmissions.map((s) => s.class)),
  ];
  const fromSections = [
    ...new Set(
      availableSubmissions
        .filter((s) => s.class === filters.fromClass)
        .map((s) => s.section),
    ),
  ];

  const { showToast } = useToast();

  // Handlers
  const handleFilterChange = (name, value) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [name]: value,
      };

      // Auto-populate "To Class" when "From Class" changes
      if (name === "fromClass") {
        const nextClass = getNextClass(value);
        newFilters.fromSection = ""; // Reset from section
        newFilters.toClass = nextClass || ""; // Set next class
        newFilters.toSection = ""; // Reset to section (will be set when section is selected)
      }

      // Auto-populate "To Section" when "From Section" changes
      if (name === "fromSection" && value && newFilters.toClass) {
        // Use the same section for promotion by default
        const toClassSections = getSectionsByClass(newFilters.toClass);
        if (toClassSections.includes(value)) {
          newFilters.toSection = value;
        } else if (toClassSections.length > 0) {
          newFilters.toSection = toClassSections[0]; // Default to first section
        }
      }

      // Reset section if class changes
      if (name === "toClass") {
        newFilters.toSection = "";
      }

      return newFilters;
    });
  };

  const handleLoadStudents = () => {
    if (!filters.fromClass || !filters.fromSection) {
      showToast("Please select From Class and Section", "error");
      return;
    }

    const promotionResults = getSubmittedPromotionData(
      filters.fromClass,
      filters.fromSection,
    );

    const studentsWithPromotionStatus = promotionResults.map((s) => ({
      ...s,
      resultStatus: s.overallStatus, // Use status from submitted data
      isChecked: false,
    }));

    if (studentsWithPromotionStatus.length === 0) {
      showToast(
        "No submitted results found for the selected class and section.",
        "error",
      );
    } else {
      showToast(
        `Loaded ${studentsWithPromotionStatus.length} students successfully.`,
        "success",
      );
    }

    setStudents(studentsWithPromotionStatus);
    setPromoteAllPassed(false);
  };

  // Toggle Single Student
  const toggleStudent = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isChecked: !s.isChecked } : s)),
    );
  };

  // Toggle All
  const toggleAll = () => {
    const newVal = !isAllSelected;
    setStudents((prev) => prev.map((s) => ({ ...s, isChecked: newVal })));
  };

  // Auto-select passed students
  useEffect(() => {
    if (promoteAllPassed) {
      setStudents((prev) =>
        prev.map((s) => ({
          ...s,
          isChecked: s.resultStatus === "Pass",
        })),
      );
    }
  }, [promoteAllPassed]);

  const handlePromote = () => {
    if (selectedCount === 0) {
      showToast("No students selected for promotion.", "error");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmPromotion = () => {
    setShowConfirmModal(false);
    
    const studentsToPromote = students.filter((s) => s.isChecked);
    
    const result = promoteStudents(
      studentsToPromote,
      filters.toClass,
      filters.toSection
    );

    if (result.success) {
      showToast(result.message, "success");
      // Optionally refresh the list or clear selection
      setStudents((prev) => prev.filter(s => !s.isChecked)); // Remove promoted students from list or just uncheck
    } else {
      showToast(result.message, "error");
    }
  };

  const columns = [
    {
      header: (
        <div className="flex justify-center">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleAll}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>
      ),
      key: "selection",
      render: (student) => (
        <div className="flex justify-center">
          <input
            type="checkbox"
            checked={student.isChecked}
            onChange={() => toggleStudent(student.id)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>
      ),
    },
    {
      header: "Std. Name",
      key: "fullName",
      render: (student) => (
        <div className="flex items-center gap-3 font-semibold text-gray-700">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <FaUserGraduate />
          </div>
          {student.fullName}
        </div>
      ),
    },
    { header: "Roll No", key: "rollNumber", className: "text-gray-500" },
    {
      header: "Current Class",
      key: "currentClass",
      render: (student) => (
        <span className="text-gray-500">
          {student.class} - {student.section}
        </span>
      ),
    },
    {
      header: "Promoting To",
      key: "promotingTo",
      render: (student) =>
        student.resultStatus === "Pass" ? (
          filters.toClass && filters.toSection ? (
            <span className="text-green-700 font-medium">
              {filters.toClass} - {filters.toSection}
            </span>
          ) : (
            <span className="text-gray-400 text-xs italic">Not selected</span>
          )
        ) : (
          <span className="text-red-500 text-xs font-semibold">N/A</span>
        ),
    },
    {
      header: "Total Marks",
      key: "totalPossible",
      center: true,
      render: (student) => (
        <span className="font-semibold text-gray-700">
          {student.totalPossible || "N/A"}
        </span>
      ),
    },
    {
      header: "Obtained Marks",
      key: "totalObtained",
      center: true,
      render: (student) => (
        <span className="font-semibold text-blue-600">
          {student.totalObtained || "N/A"}
        </span>
      ),
    },
    {
      header: "Percentage",
      key: "overallPercentage",
      center: true,
      render: (student) => (
        <span
          className={`font-bold ${
            student.overallPercentage >= 40 ? "text-green-600" : "text-red-600"
          }`}
        >
          {student.overallPercentage ? `${student.overallPercentage}%` : "N/A"}
        </span>
      ),
    },
    {
      header: "Result Status",
      key: "resultStatus",
      center: true,
      render: (student) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            student.resultStatus === "Pass"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {student.resultStatus}
        </span>
      ),
    },
    {
      header: "Action",
      key: "action",
      center: true,
      render: (student) => (
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-md ${
            student.isChecked
              ? "bg-blue-100 text-blue-700 ring-1 ring-blue-700/10"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {student.isChecked ? (
            <>
              <FaLevelUpAlt /> Promote
            </>
          ) : (
            "Detain"
          )}
        </span>
      ),
    },
  ];

  const renderMobileCard = (student) => (
    <div
      className={`bg-white border rounded-lg p-4 shadow-sm ${
        student.isChecked ? "ring-2 ring-blue-500 border-blue-500" : ""
      }`}
      onClick={() => toggleStudent(student.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <FaUserGraduate size={18} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{student.fullName}</h3>
            <p className="text-xs text-gray-500">
              Roll No: {student.rollNumber}
            </p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={student.isChecked}
          onChange={() => toggleStudent(student.id)}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mt-3">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Result</span>
          <span
            className={`font-bold ${
              student.resultStatus === "Pass"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {student.resultStatus} ({student.overallPercentage}%)
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs text-gray-400">Action</span>
          <span
            className={`font-bold ${student.isChecked ? "text-blue-600" : "text-gray-400"}`}
          >
            {student.isChecked ? "Promote" : "Detain"}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col px-6 gap-6 w-full mt-5 ">
      {/* FILTER CARD */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        {/* From */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 relative">
            <label className={label}>
              From Class
            </label>
            <CustomDropdown
              value={filters.fromClass}
              onChange={(val) => handleFilterChange("fromClass", val)}
              options={fromClassOptions}
              placeholder="Select Class"
              searchable={true}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className={label}>
              Section
            </label>
            <CustomDropdown
              value={filters.fromSection}
              onChange={(val) => handleFilterChange("fromSection", val)}
              options={fromSections}
              placeholder="Select Section"
              disabled={!filters.fromClass}
            />
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="lg:col-span-1 flex justify-center pb-3 text-gray-300">
          <FaArrowRight size={20} />
        </div>

        {/* To */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 relative">
            <label className={label}>
              To Class
            </label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm flex items-center min-h-[42px]">
              {filters.toClass ? (
                <span className="text-green-700 font-semibold">
                  {filters.toClass}
                </span>
              ) : (
                <span className="text-gray-400 italic">Auto-selected</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className={label}>
              To Section
            </label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm flex items-center min-h-[42px]">
              {filters.toSection ? (
                <span className="text-green-700 font-semibold">
                  {filters.toSection}
                </span>
              ) : (
                <span className="text-gray-400 italic">Auto-selected</span>
              )}
            </div>
          </div>
        </div>

        {/* Year */}
        <div className="lg:col-span-2 flex flex-col gap-2 relative">
          <label className={label}>
            Year
          </label>
          <CustomDropdown
            value={filters.year}
            onChange={(val) => handleFilterChange("year", val)}
            options={SESSION_OPTIONS}
            placeholder="Select Year"
          />
        </div>

        {/* Load Button */}
        <div className="lg:col-span-1">
          <Button
            onClick={handleLoadStudents}
            variant="primary"
            icon={<FaFilter size={14} />}
          >
            Load
          </Button>
        </div>
      </div>

      {/* STUDENTS TABLE */}
      {students.length > 0 && (
        <div className="">
          <DataTable
            columns={columns}
            data={students}
            renderMobileCard={renderMobileCard}
            emptyMessage="No students found."
            tableClassName="bg-[var(--primary-color)]/10  text-[var(--primary-color)] "
          />
        </div>
      )}

      {/* BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-gray-200 p-4 px-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30 flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="promoteAllPassed"
            checked={promoteAllPassed}
            onChange={(e) => setPromoteAllPassed(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
          />
          <label
            htmlFor="promoteAllPassed"
            className="text-sm font-medium text-gray-700 cursor-pointer select-none"
          >
            Promote all <span className="text-green-600 font-bold">Passed</span>{" "}
            students automatically
          </label>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-sm text-gray-500 hidden sm:inline-block">
            {selectedCount} students selected
          </span>
          <Button
            variant="primary"
            onClick={handlePromote}
            className="w-full sm:w-auto shadow-lg shadow-blue-200"
            disabled={selectedCount === 0}
          >
            Promote Selected Students
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmPromotion}
        title="Confirm Promotion"
        message={`Are you sure you want to promote ${selectedCount} selected student(s) from ${filters.fromClass} to ${filters.toClass}?`}
      />
    </div>
  );
};

export default StudentPromotion;
