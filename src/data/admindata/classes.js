// Sample data for classes matching with teachers, students, and courses
import studentsData from "../admindata/students/students";

// Helper function to get total students count by class and section
const getStudentCount = (className, section) => {
  return studentsData.filter(
    (student) => student.class === className && student.section === section,
  ).length;
};

const classesData = [
  // Play Group Classes
  {
    id: 1,
    className: "Play Group",
    section: "A",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Sadia Noor",
    status: "Active",
  },
  {
    id: 2,
    className: "Play Group",
    section: "B",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Rubina Khatoon",
    status: "Active",
  },
  // Nursery Classes
  {
    id: 3,
    className: "Nursery",
    section: "A",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Amna Bibi",
    status: "Active",
  },
  {
    id: 4,
    className: "Nursery",
    section: "B",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Tahira Begum",
    status: "Inactive",
  },
  // KG Classes
  {
    id: 5,
    className: "KG",
    section: "A",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Nasreen Akhtar",
    status: "Active",
  },
  {
    id: 6,
    className: "KG",
    section: "B",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Saima Rashid",
    status: "Active",
  },
  // Class 1
  {
    id: 7,
    className: "Class 1",
    section: "A",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Khalida Parveen",
    status: "Active",
  },
  {
    id: 8,
    className: "Class 1",
    section: "B",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Rashida Bibi",
    status: "Active",
  },
  {
    id: 9,
    className: "Class 1",
    section: "C",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Farida Begum",
    status: "Active",
  },
  // Class 2
  {
    id: 10,
    className: "Class 2",
    section: "A",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Zahida Khan",
    status: "Active",
  },
  {
    id: 11,
    className: "Class 2",
    section: "B",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Nazia Malik",
    status: "Active",
  },
  {
    id: 12,
    className: "Class 2",
    section: "C",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Shabana Ahmed",
    status: "Active",
  },
  // Class 3
  {
    id: 13,
    className: "Class 3",
    section: "A",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Asma Javed",
    status: "Active",
  },
  {
    id: 14,
    className: "Class 3",
    section: "B",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Bushra Tariq",
    status: "Active",
  },
  {
    id: 15,
    className: "Class 3",
    section: "C",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Samina Abbas",
    status: "Active",
  },
  // Class 4
  {
    id: 16,
    className: "Class 4",
    section: "A",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Riffat Ahmad",
    status: "Active",
  },
  {
    id: 17,
    className: "Class 4",
    section: "B",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Shazia Nawaz",
    status: "Active",
  },
  {
    id: 18,
    className: "Class 4",
    section: "C",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Rabia Iqbal",
    status: "Active",
  },
  // Class 5
  {
    id: 19,
    className: "Class 5",
    section: "A",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Naila Shah",
    status: "Active",
  },
  {
    id: 20,
    className: "Class 5",
    section: "B",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Farzana Bibi",
    status: "Active",
  },
  {
    id: 21,
    className: "Class 5",
    section: "C",
    department: "Primary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Javeria Noor",
    status: "Active",
  },
  // Class 6
  {
    id: 22,
    className: "Class 6",
    section: "A",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Ahmed Raza",
    status: "Active",
  },
  {
    id: 23,
    className: "Class 6",
    section: "B",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Zainab Khan",
    status: "Active",
  },
  {
    id: 24,
    className: "Class 6",
    section: "C",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Imran Ali",
    status: "Active",
  },
  {
    id: 25,
    className: "Class 6",
    section: "D",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Huma Batool",
    status: "Active",
  },
  // Class 7
  {
    id: 26,
    className: "Class 7",
    section: "A",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Muhammad Tariq",
    status: "Active",
  },
  {
    id: 27,
    className: "Class 7",
    section: "B",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Sara Ahmed",
    status: "Active",
  },
  {
    id: 28,
    className: "Class 7",
    section: "C",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Hassan Raza",
    status: "Active",
  },
  {
    id: 29,
    className: "Class 7",
    section: "D",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Aisha Nawaz",
    status: "Active",
  },
  // Class 8
  {
    id: 30,
    className: "Class 8",
    section: "A",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Nida Fatima",
    status: "Active",
  },
  {
    id: 31,
    className: "Class 8",
    section: "B",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Fatima Bibi",
    status: "Active",
  },
  {
    id: 32,
    className: "Class 8",
    section: "C",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Kashif Mahmood",
    status: "Active",
  },
  {
    id: 33,
    className: "Class 8",
    section: "D",
    department: "Middle",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Saeed Ahmed",
    status: "Active",
  },
  // Class 9
  {
    id: 34,
    className: "Class 9",
    section: "A",
    department: "Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Usman Ahmed",
    status: "Active",
  },
  {
    id: 35,
    className: "Class 9",
    section: "B",
    department: "Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Rabia Hussain",
    status: "Active",
  },
  {
    id: 36,
    className: "Class 9",
    section: "C",
    department: "Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Sana Malik",
    status: "Active",
  },
  // Class 10
  {
    id: 37,
    className: "Class 10",
    section: "A",
    department: "Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Ali Khan",
    status: "Active",
  },
  {
    id: 38,
    className: "Class 10",
    section: "B",
    department: "Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Imran Sheikh",
    status: "Active",
  },
  {
    id: 39,
    className: "Class 10",
    section: "C",
    department: "Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Maryam Noor",
    status: "Active",
  },
  // Class 11
  {
    id: 40,
    className: "Class 11",
    section: "Pre-Medical",
    department: "Higher Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Bilal Hussain",
    status: "Active",
  },
  {
    id: 41,
    className: "Class 11",
    section: "Pre-Engineering",
    department: "Higher Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Ayesha Malik",
    status: "Active",
  },
  {
    id: 42,
    className: "Class 11",
    section: "ICS",
    department: "Higher Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Tariq Aziz",
    status: "Active",
  },
  {
    id: 43,
    className: "Class 11",
    section: "Commerce",
    department: "Higher Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Asad Iqbal",
    status: "Active",
  },
  // Class 12
  {
    id: 44,
    className: "Class 12",
    section: "Pre-Medical",
    department: "Higher Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Sara Ahmed",
    status: "Active",
  },
  {
    id: 45,
    className: "Class 12",
    section: "Pre-Engineering",
    department: "Higher Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Hassan Ali",
    status: "Active",
  },
  {
    id: 46,
    className: "Class 12",
    section: "ICS",
    department: "Higher Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Hina Abbas",
    status: "Active",
  },
  {
    id: 47,
    className: "Class 12",
    section: "Commerce",
    department: "Higher Secondary",
    get totalStudents() {
      return getStudentCount(this.className, this.section);
    },
    classTeacher: "Kamran Javed",
    status: "Inactive",
  },
];

export default classesData;
