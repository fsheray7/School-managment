import React, { createContext, useContext, useState } from "react";
import teachersData from "../data/teachers/teacher";

const TeacherContext = createContext(null);

export const TeacherProvider = ({ children }) => {
  const [teachers, setTeachers] = useState(
    teachersData.map((teacher) => ({
      ...teacher,
      profilePhoto: teacher.profileImage,
      password: teacher.password || "password123",
      status: teacher.status || "Active",
    })),
  );
  const [currentTeacher, setCurrentTeacher] = useState(() => {
    const stored = localStorage.getItem("currentTeacher");
    return stored ? JSON.parse(stored) : null;
  });

  const loginTeacher = (teacherData) => {
    setCurrentTeacher(teacherData);
    localStorage.setItem("currentTeacher", JSON.stringify(teacherData));
  };

  const logoutTeacher = () => {
    setCurrentTeacher(null);
    localStorage.removeItem("currentTeacher");
  };

  // ===== CRUD ACTIONS =====

  const updateTeacher = (updatedTeacher) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t)),
    );
  };

  const deleteTeacher = (id) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTeacherStatus = (id) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" }
          : t,
      ),
    );
  };

  return (
    <TeacherContext.Provider
      value={{
        teachers,
        currentTeacher,
        updateTeacher,
        deleteTeacher,
        toggleTeacherStatus,
        loginTeacher,
        logoutTeacher,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};

// custom hook
export const useTeacher = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeacher must be used within a TeacherProvider");
  }
  return context;
};
