// Gender options
export const GENDER_OPTIONS = ["Male", "Female", "Others"];

// Class + Section mapping
export const CLASS_SECTION_OPTIONS = [
  {
    class: "Play Group",
    sections: ["A", "B"],
  },
  {
    class: "Nursery",
    sections: ["A", "B"],
  },
  {
    class: "KG",
    sections: ["A", "B"],
  },
  {
    class: "Class 1",
    sections: ["A", "B", "C"],
  },
  {
    class: "Class 2",
    sections: ["A", "B", "C"],
  },
  {
    class: "Class 3",
    sections: ["A", "B", "C"],
  },
  {
    class: "Class 4",
    sections: ["A", "B", "C"],
  },
  {
    class: "Class 5",
    sections: ["A", "B", "C"],
  },
  {
    class: "Class 6",
    sections: ["A", "B", "C", "D"],
  },
  {
    class: "Class 7",
    sections: ["A", "B", "C", "D"],
  },
  {
    class: "Class 8",
    sections: ["A", "B", "C", "D"],
  },
  {
    class: "Class 9",
    sections: ["A", "B", "C"],
  },
  {
    class: "Class 10",
    sections: ["A", "B", "C"],
  },
  {
    class: "Class 11",
    sections: ["Pre-Medical", "Pre-Engineering", "ICS", "Commerce"],
  },
  {
    class: "Class 12",
    sections: ["Pre-Medical", "Pre-Engineering", "ICS", "Commerce"],
  },
];

// Sirf classes nikalne ke liye
export const CLASS_OPTIONS = CLASS_SECTION_OPTIONS.map(
  (item) => item.class
);

// Selected class se sections nikalne ke liye
export const getSectionsByClass = (selectedClass) => {
  const found = CLASS_SECTION_OPTIONS.find(
    (item) => item.class === selectedClass
  );
  return found ? found.sections : [];
};


export const TEACHER_TYPE=["Regular","Contractual"]

export const COURSE_STATUS = ["Active", "Inactive"]