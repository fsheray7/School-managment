// Fixed marks data for all students - Percentages AUTO-CALCULATED
// Only define totalMarks and obtainedMarks - percentage is computed automatically

// Helper function to calculate percentage
const calculatePercentage = (obtained, total) => {
  return parseFloat(((obtained / total) * 100).toFixed(2));
};

// Helper function to determine pass/fail status
const getStatus = (percentage) => {
  return percentage >= 40 ? "Pass" : "Fail";
};

// Helper function to create subject marks with auto-calculated percentage
const createSubjectMark = (subjectName, totalMarks, obtainedMarks) => {
  const percentage = calculatePercentage(obtainedMarks, totalMarks);
  const status = getStatus(percentage);
  return {
    subjectName,
    totalMarks,
    obtainedMarks,
    percentage,
    status,
  };
};

// Helper function to get subjects for a class
const getSubjects = (className, section) => {
  const SUBJECT_MAP = {
    "Play Group": ["Early Learning", "Basic Skills"],
    Nursery: ["Basic Montessori", "Pre-Literacy"],
    KG: ["Pre-Primary Literacy", "Pre-Primary Numeracy"],
    "Class 1": ["English", "Urdu", "Math", "General Knowledge"],
    "Class 2": ["English", "Urdu", "Math", "Science"],
    "Class 3": ["English", "Urdu", "Math", "Science"],
    "Class 4": ["English", "Urdu", "Math", "Science", "Islamiat"],
    "Class 5": ["English", "Urdu", "Math", "Science", "Islamiat"],
    "Class 6": [
      "English",
      "Urdu",
      "Math",
      "Science",
      "Islamiat",
      "Social Studies",
    ],
    "Class 7": [
      "English",
      "Urdu",
      "Math",
      "Science",
      "Islamiat",
      "Social Studies",
    ],
    "Class 8": [
      "English",
      "Urdu",
      "Math",
      "Science",
      "Islamiat",
      "Pakistan Studies",
    ],
    "Class 9": [
      "English",
      "Urdu",
      "Math",
      "Physics",
      "Chemistry",
      "Biology",
      "Islamiat",
      "Pakistan Studies",
      "Computer Science",
    ],
    "Class 10": [
      "English",
      "Urdu",
      "Math",
      "Physics",
      "Chemistry",
      "Biology",
      "Islamiat",
      "Pakistan Studies",
      "Computer Science",
    ],
    "Class 11": {
      "Pre-Medical": [
        "English",
        "Urdu",
        "Physics",
        "Chemistry",
        "Biology",
        "Islamiat",
      ],
      "Pre-Engineering": [
        "English",
        "Urdu",
        "Physics",
        "Chemistry",
        "Math",
        "Islamiat",
      ],
      ICS: [
        "English",
        "Urdu",
        "Physics",
        "Math",
        "Computer Science",
        "Islamiat",
      ],
      Commerce: [
        "English",
        "Urdu",
        "Accounting",
        "Economics",
        "Business Studies",
        "Islamiat",
      ],
    },
    "Class 12": {
      "Pre-Medical": [
        "English",
        "Urdu",
        "Physics",
        "Chemistry",
        "Biology",
        "Islamiat",
      ],
      "Pre-Engineering": [
        "English",
        "Urdu",
        "Physics",
        "Chemistry",
        "Math",
        "Islamiat",
      ],
      ICS: [
        "English",
        "Urdu",
        "Physics",
        "Math",
        "Computer Science",
        "Islamiat",
      ],
      Commerce: [
        "English",
        "Urdu",
        "Accounting",
        "Economics",
        "Business Studies",
        "Islamiat",
      ],
    },
  };

  const subjects = SUBJECT_MAP[className];
  if (typeof subjects === "object" && !Array.isArray(subjects)) {
    return subjects[section] || [];
  }
  return subjects || [];
};

// Helper function to create complete student marks record
const createStudentMarks = (
  studentId,
  className,
  section,
  subjectMarksData,
) => {
  const subjects = subjectMarksData.map(({ subject, obtained }) =>
    createSubjectMark(subject, 100, obtained),
  );

  const totalObtained = subjects.reduce((sum, s) => sum + s.obtainedMarks, 0);
  const totalPossible = subjects.length * 100;
  const overallPercentage = calculatePercentage(totalObtained, totalPossible);
  const overallStatus = subjects.every((s) => s.status === "Pass")
    ? "Pass"
    : "Fail";

  return {
    studentId,
    class: className,
    section,
    academicYear: "2024-25",
    subjects,
    totalObtainedMarks: totalObtained,
    totalPossibleMarks: totalPossible,
    overallPercentage,
    overallStatus,
  };
};

// Fixed marks data - only define obtained marks, percentages are auto-calculated
const marksData = [
  // Student ID 1 - Hamza Ali (Play Group A) - FAIL
  createStudentMarks(1, "Play Group", "A", [
    { subject: "Early Learning", obtained: 25 },
    { subject: "Basic Skills", obtained: 25 },
  ]),

  // Student ID 2 - Aiza Fatima (Play Group B) - PASS
  createStudentMarks(2, "Play Group", "B", [
    { subject: "Early Learning", obtained: 92 },
    { subject: "Basic Skills", obtained: 88 },
  ]),

  // Student ID 3 - Ahmed Hassan (Nursery A) - FAIL
  createStudentMarks(3, "Nursery", "A", [
    { subject: "Basic Montessori", obtained: 35 },
    { subject: "Pre-Literacy", obtained: 42 },
  ]),

  // Student ID 4 - Sana Malik (Nursery B) - PASS
  createStudentMarks(4, "Nursery", "B", [
    { subject: "Basic Montessori", obtained: 76 },
    { subject: "Pre-Literacy", obtained: 82 },
  ]),

  // Student ID 5 - Zayan Ahmed (KG A) - PASS
  createStudentMarks(5, "KG", "A", [
    { subject: "Pre-Primary Literacy", obtained: 88 },
    { subject: "Pre-Primary Numeracy", obtained: 91 },
  ]),

  // Student ID 6 - Hoorain Bibi (KG B) - PASS
  createStudentMarks(6, "KG", "B", [
    { subject: "Pre-Primary Literacy", obtained: 72 },
    { subject: "Pre-Primary Numeracy", obtained: 68 },
  ]),

  // Student ID 7 - Muhammad Talha (Class 1 A) - PASS
  createStudentMarks(7, "Class 1", "A", [
    { subject: "English", obtained: 85 },
    { subject: "Urdu", obtained: 78 },
    { subject: "Math", obtained: 92 },
    { subject: "General Knowledge", obtained: 88 },
  ]),

  // Student ID 8 - Areeba Noor (Class 1 B) - FAIL
  createStudentMarks(8, "Class 1", "B", [
    { subject: "English", obtained: 32 },
    { subject: "Urdu", obtained: 45 },
    { subject: "Math", obtained: 38 },
    { subject: "General Knowledge", obtained: 42 },
  ]),

  // Student ID 9 - Abdullah Farooq (Class 1 C) - PASS
  createStudentMarks(9, "Class 1", "C", [
    { subject: "English", obtained: 76 },
    { subject: "Urdu", obtained: 82 },
    { subject: "Math", obtained: 79 },
    { subject: "General Knowledge", obtained: 85 },
  ]),

  // Student ID 10 - Ayan Malik (Class 2 A) - PASS
  createStudentMarks(10, "Class 2", "A", [
    { subject: "English", obtained: 88 },
    { subject: "Urdu", obtained: 84 },
    { subject: "Math", obtained: 91 },
    { subject: "Science", obtained: 86 },
  ]),

  // Student ID 11 - Mahnoor Khan (Class 2 B) - PASS
  createStudentMarks(11, "Class 2", "B", [
    { subject: "English", obtained: 72 },
    { subject: "Urdu", obtained: 68 },
    { subject: "Math", obtained: 75 },
    { subject: "Science", obtained: 70 },
  ]),

  // Student ID 12 - Rayyan Ali (Class 2 C) - FAIL
  createStudentMarks(12, "Class 2", "C", [
    { subject: "English", obtained: 28 },
    { subject: "Urdu", obtained: 35 },
    { subject: "Math", obtained: 42 },
    { subject: "Science", obtained: 38 },
  ]),

  // Student ID 13 - Arham Sheikh (Class 3 A) - PASS
  createStudentMarks(13, "Class 3", "A", [
    { subject: "English", obtained: 82 },
    { subject: "Urdu", obtained: 79 },
    { subject: "Math", obtained: 85 },
    { subject: "Science", obtained: 88 },
  ]),

  // Student ID 14 - Eshaal Bibi (Class 3 B) - PASS
  createStudentMarks(14, "Class 3", "B", [
    { subject: "English", obtained: 76 },
    { subject: "Urdu", obtained: 72 },
    { subject: "Math", obtained: 78 },
    { subject: "Science", obtained: 74 },
  ]),

  // Student ID 15 - Class 3 C - PASS
  createStudentMarks(15, "Class 3", "C", [
    { subject: "English", obtained: 78 },
    { subject: "Urdu", obtained: 75 },
    { subject: "Math", obtained: 82 },
    { subject: "Science", obtained: 77 },
  ]),

  // Student ID 16 - Class 4 A - PASS
  createStudentMarks(16, "Class 4", "A", [
    { subject: "English", obtained: 85 },
    { subject: "Urdu", obtained: 82 },
    { subject: "Math", obtained: 88 },
    { subject: "Science", obtained: 84 },
    { subject: "Islamiat", obtained: 86 },
  ]),

  // Student ID 17 - Class 4 B - FAIL
  createStudentMarks(17, "Class 4", "B", [
    { subject: "English", obtained: 30 },
    { subject: "Urdu", obtained: 35 },
    { subject: "Math", obtained: 38 },
    { subject: "Science", obtained: 32 },
    { subject: "Islamiat", obtained: 40 },
  ]),

  // Student ID 18 - Class 4 C - PASS
  createStudentMarks(18, "Class 4", "C", [
    { subject: "English", obtained: 72 },
    { subject: "Urdu", obtained: 68 },
    { subject: "Math", obtained: 75 },
    { subject: "Science", obtained: 70 },
    { subject: "Islamiat", obtained: 74 },
  ]),

  // Student ID 19 - Class 5 A - PASS
  createStudentMarks(19, "Class 5", "A", [
    { subject: "English", obtained: 88 },
    { subject: "Urdu", obtained: 85 },
    { subject: "Math", obtained: 92 },
    { subject: "Science", obtained: 87 },
    { subject: "Islamiat", obtained: 90 },
  ]),

  // Student ID 20 - Class 5 B - PASS
  createStudentMarks(20, "Class 5", "B", [
    { subject: "English", obtained: 76 },
    { subject: "Urdu", obtained: 73 },
    { subject: "Math", obtained: 79 },
    { subject: "Science", obtained: 75 },
    { subject: "Islamiat", obtained: 78 },
  ]),

  // Student ID 21 - Class 5 C - FAIL
  createStudentMarks(21, "Class 5", "C", [
    { subject: "English", obtained: 35 },
    { subject: "Urdu", obtained: 38 },
    { subject: "Math", obtained: 42 },
    { subject: "Science", obtained: 36 },
    { subject: "Islamiat", obtained: 39 },
  ]),

  // Student ID 22 - Class 6 A - PASS
  createStudentMarks(22, "Class 6", "A", [
    { subject: "English", obtained: 82 },
    { subject: "Urdu", obtained: 79 },
    { subject: "Math", obtained: 85 },
    { subject: "Science", obtained: 81 },
    { subject: "Islamiat", obtained: 84 },
    { subject: "Social Studies", obtained: 80 },
  ]),

  // Student ID 23 - Class 6 B - PASS
  createStudentMarks(23, "Class 6", "B", [
    { subject: "English", obtained: 79 },
    { subject: "Urdu", obtained: 76 },
    { subject: "Math", obtained: 82 },
    { subject: "Science", obtained: 78 },
    { subject: "Islamiat", obtained: 81 },
    { subject: "Social Studies", obtained: 77 },
  ]),

  // Student ID 24 - Class 6 C - PASS
  createStudentMarks(24, "Class 6", "C", [
    { subject: "English", obtained: 85 },
    { subject: "Urdu", obtained: 82 },
    { subject: "Math", obtained: 88 },
    { subject: "Science", obtained: 84 },
    { subject: "Islamiat", obtained: 87 },
    { subject: "Social Studies", obtained: 83 },
  ]),

  // Student ID 25 - Class 6 D - FAIL
  createStudentMarks(25, "Class 6", "D", [
    { subject: "English", obtained: 32 },
    { subject: "Urdu", obtained: 36 },
    { subject: "Math", obtained: 38 },
    { subject: "Science", obtained: 34 },
    { subject: "Islamiat", obtained: 40 },
    { subject: "Social Studies", obtained: 37 },
  ]),

  // Student ID 26 - Class 7 A - PASS
  createStudentMarks(26, "Class 7", "A", [
    { subject: "English", obtained: 84 },
    { subject: "Urdu", obtained: 81 },
    { subject: "Math", obtained: 87 },
    { subject: "Science", obtained: 83 },
    { subject: "Islamiat", obtained: 86 },
    { subject: "Social Studies", obtained: 82 },
  ]),

  // Student ID 27 - Class 7 B - PASS
  createStudentMarks(27, "Class 7", "B", [
    { subject: "English", obtained: 77 },
    { subject: "Urdu", obtained: 74 },
    { subject: "Math", obtained: 80 },
    { subject: "Science", obtained: 76 },
    { subject: "Islamiat", obtained: 79 },
    { subject: "Social Studies", obtained: 75 },
  ]),

  // Student ID 28 - Class 7 C - PASS
  createStudentMarks(28, "Class 7", "C", [
    { subject: "English", obtained: 81 },
    { subject: "Urdu", obtained: 78 },
    { subject: "Math", obtained: 84 },
    { subject: "Science", obtained: 80 },
    { subject: "Islamiat", obtained: 83 },
    { subject: "Social Studies", obtained: 79 },
  ]),

  // Student ID 29 - Class 7 D - FAIL
  createStudentMarks(29, "Class 7", "D", [
    { subject: "English", obtained: 33 },
    { subject: "Urdu", obtained: 37 },
    { subject: "Math", obtained: 39 },
    { subject: "Science", obtained: 35 },
    { subject: "Islamiat", obtained: 41 },
    { subject: "Social Studies", obtained: 38 },
  ]),

  // Student ID 30 - Class 8 A - PASS
  createStudentMarks(30, "Class 8", "A", [
    { subject: "English", obtained: 86 },
    { subject: "Urdu", obtained: 83 },
    { subject: "Math", obtained: 89 },
    { subject: "Science", obtained: 85 },
    { subject: "Islamiat", obtained: 88 },
    { subject: "Pakistan Studies", obtained: 84 },
  ]),

  // Student ID 31 - Class 8 B - PASS
  createStudentMarks(31, "Class 8", "B", [
    { subject: "English", obtained: 74 },
    { subject: "Urdu", obtained: 71 },
    { subject: "Math", obtained: 77 },
    { subject: "Science", obtained: 73 },
    { subject: "Islamiat", obtained: 76 },
    { subject: "Pakistan Studies", obtained: 72 },
  ]),

  // Student ID 32 - Class 8 C - PASS
  createStudentMarks(32, "Class 8", "C", [
    { subject: "English", obtained: 80 },
    { subject: "Urdu", obtained: 77 },
    { subject: "Math", obtained: 83 },
    { subject: "Science", obtained: 79 },
    { subject: "Islamiat", obtained: 82 },
    { subject: "Pakistan Studies", obtained: 78 },
  ]),

  // Student ID 33 - Class 8 D - FAIL
  createStudentMarks(33, "Class 8", "D", [
    { subject: "English", obtained: 35 },
    { subject: "Urdu", obtained: 39 },
    { subject: "Math", obtained: 41 },
    { subject: "Science", obtained: 37 },
    { subject: "Islamiat", obtained: 42 },
    { subject: "Pakistan Studies", obtained: 40 },
  ]),

  // Student ID 34 - Class 9 A - PASS
  createStudentMarks(34, "Class 9", "A", [
    { subject: "English", obtained: 83 },
    { subject: "Urdu", obtained: 80 },
    { subject: "Math", obtained: 86 },
    { subject: "Physics", obtained: 82 },
    { subject: "Chemistry", obtained: 85 },
    { subject: "Biology", obtained: 81 },
    { subject: "Islamiat", obtained: 84 },
    { subject: "Pakistan Studies", obtained: 79 },
    { subject: "Computer Science", obtained: 87 },
  ]),

  // Student ID 35 - Class 9 B - PASS
  createStudentMarks(35, "Class 9", "B", [
    { subject: "English", obtained: 78 },
    { subject: "Urdu", obtained: 75 },
    { subject: "Math", obtained: 81 },
    { subject: "Physics", obtained: 77 },
    { subject: "Chemistry", obtained: 80 },
    { subject: "Biology", obtained: 76 },
    { subject: "Islamiat", obtained: 79 },
    { subject: "Pakistan Studies", obtained: 74 },
    { subject: "Computer Science", obtained: 82 },
  ]),

  // Student ID 36 - Class 9 C - FAIL
  createStudentMarks(36, "Class 9", "C", [
    { subject: "English", obtained: 30 },
    { subject: "Urdu", obtained: 35 },
    { subject: "Math", obtained: 38 },
    { subject: "Physics", obtained: 32 },
    { subject: "Chemistry", obtained: 36 },
    { subject: "Biology", obtained: 34 },
    { subject: "Islamiat", obtained: 40 },
    { subject: "Pakistan Studies", obtained: 37 },
    { subject: "Computer Science", obtained: 39 },
  ]),

  // Student ID 37 - Class 10 A - PASS
  createStudentMarks(37, "Class 10", "A", [
    { subject: "English", obtained: 87 },
    { subject: "Urdu", obtained: 84 },
    { subject: "Math", obtained: 90 },
    { subject: "Physics", obtained: 86 },
    { subject: "Chemistry", obtained: 89 },
    { subject: "Biology", obtained: 85 },
    { subject: "Islamiat", obtained: 88 },
    { subject: "Pakistan Studies", obtained: 83 },
    { subject: "Computer Science", obtained: 91 },
  ]),

  // Student ID 38 - Class 10 B - PASS
  createStudentMarks(38, "Class 10", "B", [
    { subject: "English", obtained: 75 },
    { subject: "Urdu", obtained: 72 },
    { subject: "Math", obtained: 78 },
    { subject: "Physics", obtained: 74 },
    { subject: "Chemistry", obtained: 77 },
    { subject: "Biology", obtained: 73 },
    { subject: "Islamiat", obtained: 76 },
    { subject: "Pakistan Studies", obtained: 71 },
    { subject: "Computer Science", obtained: 79 },
  ]),

  // Student ID 39 - Class 10 C - FAIL
  createStudentMarks(39, "Class 10", "C", [
    { subject: "English", obtained: 34 },
    { subject: "Urdu", obtained: 38 },
    { subject: "Math", obtained: 40 },
    { subject: "Physics", obtained: 36 },
    { subject: "Chemistry", obtained: 39 },
    { subject: "Biology", obtained: 37 },
    { subject: "Islamiat", obtained: 41 },
    { subject: "Pakistan Studies", obtained: 35 },
    { subject: "Computer Science", obtained: 42 },
  ]),

  // Student ID 40 - Class 11 Pre-Medical - PASS
  createStudentMarks(40, "Class 11", "Pre-Medical", [
    { subject: "English", obtained: 82 },
    { subject: "Urdu", obtained: 79 },
    { subject: "Physics", obtained: 85 },
    { subject: "Chemistry", obtained: 81 },
    { subject: "Biology", obtained: 84 },
    { subject: "Islamiat", obtained: 80 },
  ]),

  // Student ID 41 - Class 11 Pre-Engineering - PASS
  createStudentMarks(41, "Class 11", "Pre-Engineering", [
    { subject: "English", obtained: 79 },
    { subject: "Urdu", obtained: 76 },
    { subject: "Physics", obtained: 82 },
    { subject: "Chemistry", obtained: 78 },
    { subject: "Math", obtained: 81 },
    { subject: "Islamiat", obtained: 77 },
  ]),

  // Student ID 42 - Class 11 ICS - PASS
  createStudentMarks(42, "Class 11", "ICS", [
    { subject: "English", obtained: 84 },
    { subject: "Urdu", obtained: 81 },
    { subject: "Physics", obtained: 87 },
    { subject: "Math", obtained: 83 },
    { subject: "Computer Science", obtained: 86 },
    { subject: "Islamiat", obtained: 82 },
  ]),

  // Student ID 43 - Class 11 Commerce - FAIL
  createStudentMarks(43, "Class 11", "Commerce", [
    { subject: "English", obtained: 32 },
    { subject: "Urdu", obtained: 36 },
    { subject: "Accounting", obtained: 38 },
    { subject: "Economics", obtained: 34 },
    { subject: "Business Studies", obtained: 40 },
    { subject: "Islamiat", obtained: 37 },
  ]),

  // Student ID 44 - Class 12 Pre-Medical - PASS
  createStudentMarks(44, "Class 12", "Pre-Medical", [
    { subject: "English", obtained: 88 },
    { subject: "Urdu", obtained: 85 },
    { subject: "Physics", obtained: 91 },
    { subject: "Chemistry", obtained: 87 },
    { subject: "Biology", obtained: 90 },
    { subject: "Islamiat", obtained: 86 },
  ]),

  // Student ID 45 - Class 12 Pre-Engineering - PASS
  createStudentMarks(45, "Class 12", "Pre-Engineering", [
    { subject: "English", obtained: 85 },
    { subject: "Urdu", obtained: 82 },
    { subject: "Physics", obtained: 88 },
    { subject: "Chemistry", obtained: 84 },
    { subject: "Math", obtained: 87 },
    { subject: "Islamiat", obtained: 83 },
  ]),

  // Student ID 46 - Class 12 ICS - PASS
  createStudentMarks(46, "Class 12", "ICS", [
    { subject: "English", obtained: 81 },
    { subject: "Urdu", obtained: 78 },
    { subject: "Physics", obtained: 84 },
    { subject: "Math", obtained: 80 },
    { subject: "Computer Science", obtained: 83 },
    { subject: "Islamiat", obtained: 79 },
  ]),

  // Student ID 47 - Class 12 Commerce - PASS
  createStudentMarks(47, "Class 12", "Commerce", [
    { subject: "English", obtained: 76 },
    { subject: "Urdu", obtained: 73 },
    { subject: "Accounting", obtained: 79 },
    { subject: "Economics", obtained: 75 },
    { subject: "Business Studies", obtained: 78 },
    { subject: "Islamiat", obtained: 74 },
  ]),

  // Student ID 48 - Play Group A - PASS
  createStudentMarks(48, "Play Group", "A", [
    { subject: "Early Learning", obtained: 80 },
    { subject: "Basic Skills", obtained: 77 },
  ]),
];

// Export helper functions
export { getSubjects, createStudentMarks, calculatePercentage };

export default marksData;
