import studentsData from "../admindata/students/students";

// Helper to generate a random date within the last 30 days
const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString().split("T")[0];
};

// Helper to pick a random status
const getRandomStatus = () => {
    const statuses = ["Paid", "Paid", "Paid", "Pending", "Overdue"]; // Higher weight for Paid
    return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper to pick a random method
const getRandomMethod = (status) => {
    if (status !== "Paid") return "-";
    const methods = ["Bank Transfer", "Cash", "Online", "Cheque"];
    return methods[Math.floor(Math.random() * methods.length)];
};

// Generate transactions based on student data
export const transactionData = studentsData.map((student, index) => {
    const status = getRandomStatus();
    return {
        id: `TXN-${1000 + index}`,
        studentId: student.id,
        studentName: student.fullName,
        class: student.class,
        section: student.section,
        amount: student.class.includes("Play") || student.class.includes("Nursery") ? "PKR 3,500" : 
                student.class.includes("Class 1") || student.class.includes("Class 2") ? "PKR 4,000" :
                student.class.includes("Class 9") || student.class.includes("Class 10") ? "PKR 5,000" : "PKR 4,500",
        status: status,
        date: getRandomDate(),
        method: getRandomMethod(status),
    };
}).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
