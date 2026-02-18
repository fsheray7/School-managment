import React, { useState, useEffect } from "react";
import {
  FaFilter,
  FaArrowRight,
  FaUserGraduate,
  FaLevelUpAlt,
} from "react-icons/fa";
import classesData from "../../data/admindata/classes";
import Button from "../../components/ui/Button";

import { SESSION_OPTIONS, getNextClass } from "../../constants/Store";
import CustomDropdown from "../../components/ui/CustomDropdown";
import { useToast } from "../../context/ToastContext";
import {
  getSubmittedPromotionData,
  getAvailablePromotionSubmissions,
} from "../../utils/marksManager";

const StudentPromotion = () => {
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
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [promoteAllPassed, setPromoteAllPassed] = useState(false);
  const [availableSubmissions, setAvailableSubmissions] = useState([]);

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

  const getSectionsByClass = (className) => {
    if (!className) return [];
    const sections = classesData
      .filter((c) => c.className === className)
      .map((c) => c.section);
    return [...new Set(sections)]; // Return unique sections
  };

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
    setSelectedStudents([]);
    setIsAllSelected(false);
    setPromoteAllPassed(false);
  };

  // Toggle Single Student
  const toggleStudent = (id) => {
    const updated = students.map((s) =>
      s.id === id ? { ...s, isChecked: !s.isChecked } : s,
    );
    setStudents(updated);
    updateSelectionState(updated);
  };

  // Toggle All
  const toggleAll = () => {
    const newVal = !isAllSelected;
    setIsAllSelected(newVal);
    const updated = students.map((s) => ({ ...s, isChecked: newVal }));
    setStudents(updated);
    updateSelectionState(updated);
  };

  // Auto-select passed students
  useEffect(() => {
    if (promoteAllPassed) {
      const updated = students.map((s) => ({
        ...s,
        isChecked: s.resultStatus === "Pass",
      }));
      setStudents(updated);
      updateSelectionState(updated);
    }
  }, [promoteAllPassed]);

  const updateSelectionState = (currentStudents) => {
    const selected = currentStudents.filter((s) => s.isChecked);
    setSelectedStudents(selected);
    setIsAllSelected(
      currentStudents.length > 0 && selected.length === currentStudents.length,
    );
  };

  const handlePromote = () => {
    const count = selectedStudents.length;
    if (count === 0) {
      showToast("No students selected for promotion.", "error");
      return;
    }
    showToast(
      `Successfully promoted ${count} student(s) from ${filters.fromClass} to ${filters.toClass}!`,
      "success",
    );
    // Logic to update backend would go here
  };

  return (
    <div className="flex flex-col gap-6 w-full mt-5 ">
      {/* FILTER CARD */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        {/* From */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 relative">
            <label className="text-xs font-bold text-gray-500 uppercase">
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
            <label className="text-xs font-bold text-gray-500 uppercase">
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
            <label className="text-xs font-bold text-gray-500 uppercase">
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
            <label className="text-xs font-bold text-gray-500 uppercase">
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
          <label className="text-xs font-bold text-gray-500 uppercase">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold tracking-wider">
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Roll No</th>
                  <th className="p-4">Current Class</th>
                  <th className="p-4">Promoting To</th>
                  <th className="p-4 text-center">Total Marks</th>
                  <th className="p-4 text-center">Obtained Marks</th>
                  <th className="p-4 text-center">Percentage</th>
                  <th className="p-4 text-center">Result Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {students.map((student) => {
                  return (
                    <tr
                      key={student.id}
                      className={`hover:bg-blue-50/30 transition-colors ${
                        student.isChecked ? "bg-blue-50/20" : ""
                      }`}
                    >
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={student.isChecked}
                          onChange={() => toggleStudent(student.id)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 font-semibold text-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <FaUserGraduate />
                          </div>
                          {student.fullName}
                        </div>
                      </td>
                      <td className="p-4 text-gray-500">
                        {student.rollNumber}
                      </td>
                      <td className="p-4 text-gray-500">
                        {student.class} - {student.section}
                      </td>
                      <td className="p-4">
                        {student.resultStatus === "Pass" ? (
                          filters.toClass && filters.toSection ? (
                            <span className="text-green-700 font-medium">
                              {filters.toClass} - {filters.toSection}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs italic">
                              Not selected
                            </span>
                          )
                        ) : (
                          <span className="text-red-500 text-xs font-semibold">
                            N/A
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <span className="font-semibold text-gray-700">
                          {student.totalPossible || "N/A"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-semibold text-blue-600">
                          {student.totalObtained || "N/A"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`font-bold ${
                            student.overallPercentage >= 40
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {student.overallPercentage
                            ? `${student.overallPercentage}%`
                            : "N/A"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            student.resultStatus === "Pass"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {student.resultStatus}
                        </span>
                      </td>
                      <td className="p-4 text-center">
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-56 bg-white border-t border-gray-200 p-4 px-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30 flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300">
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
            {selectedStudents.length} students selected
          </span>
          <Button
            variant="primary"
            onClick={handlePromote}
            className="w-full sm:w-auto shadow-lg shadow-blue-200"
            disabled={selectedStudents.length === 0}
          >
            Promote Selected Students
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentPromotion;
