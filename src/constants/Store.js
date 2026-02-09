// Gender options
import teachersData from "../data/teachers/teacher.js";
import classesData from "../data/admindata/classes.js";

export const TEACHERS = teachersData.map((teacher) => teacher.fullName);

export const GENDER_OPTIONS = ["Male", "Female", "Others"];

// Dynamic Class + Section mapping derived from classesData
export const CLASS_SECTION_OPTIONS = Object.values(
  classesData.reduce((acc, item) => {
    if (!acc[item.className]) {
      acc[item.className] = {
        class: item.className,
        sections: [],
      };
    }
    if (!acc[item.className].sections.includes(item.section)) {
      acc[item.className].sections.push(item.section);
    }
    return acc;
  }, {}),
);

export const ROLE_OPTIONS = [
  "Class Teacher",
  "Subject Teacher",
  "Head of Department",
  "Coordinator",
];

export const STATUS_OPTIONS = ["Active", "Inactive", "On Leave"];

// Dynamic Department options derived from classesData
export const DEPARTMENT_OPTIONS = [
  ...new Set(classesData.map((item) => item.department)),
].sort();

// Sirf classes nikalne ke liye
export const CLASS_OPTIONS = CLASS_SECTION_OPTIONS.map((item) => item.class);
export const SECTION_OPTIONS = CLASS_SECTION_OPTIONS.map(
  (item) => item.sections,
);

// Selected class se sections nikalne ke liye
export const getSectionsByClass = (selectedClass) => {
  const found = CLASS_SECTION_OPTIONS.find(
    (item) => item.class === selectedClass,
  );
  return found ? found.sections : [];
};

export const TEACHER_TYPE = ["Regular", "Contractual"];

export const COURSE_STATUS = ["Active", "Inactive"];

export const SESSION_OPTIONS = ["2023-24", "2024-25", "2025-26"];
