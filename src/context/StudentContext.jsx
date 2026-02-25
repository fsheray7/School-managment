import React, { createContext, useContext, useState } from "react";
import studentsData from "../data/admindata/students/students";
// 👆 yahan tumhara static student.js hoga

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(
    studentsData.map(student => ({
      ...student,
      profilePhoto:
        student.profileImage || "/assets/profiles/students/default.jpg",
      status: student.status || "Active",
    }))
  );
  const [currentStudent, setCurrentStudent] = useState(() => {
    const stored = localStorage.getItem("currentStudent");
    return stored ? JSON.parse(stored) : null;
  });

  const loginStudent = studentData => {
    setCurrentStudent(studentData);
    localStorage.setItem("currentStudent", JSON.stringify(studentData));
  };

  const logoutStudent = () => {
    setCurrentStudent(null);
    localStorage.removeItem("currentStudent");
  };

  // ============ CRUD ACTIONS ============

  const addStudent = newStudent => {
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateStudent = updatedStudent => {
    setStudents((prev) =>
      prev.map(s => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const deleteStudent = id => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const toggleStudentStatus = id => {
    setStudents((prev) =>
      prev.map(s =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        currentStudent,
        addStudent,
        updateStudent,
        deleteStudent,
        toggleStudentStatus,
        loginStudent,
        logoutStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

// custom hook
export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
