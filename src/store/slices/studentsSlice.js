import { createSlice } from "@reduxjs/toolkit";
import studentsData from "../../data/admindata/students/students";

const initialState = {
  students: studentsData.map((s) => ({
    ...s,
    profilePhoto: s.profileImage || "/assets/profiles/students/default.jpg",
    status: s.status || "Active",
  })),
  loading: false,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = { ...state.students[index], ...action.payload };
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
    toggleStudentStatus: (state, action) => {
      const student = state.students.find((s) => s.id === action.payload);
      if (student) {
        student.status = student.status === "Active" ? "Inactive" : "Active";
      }
    },
  },
});

export const { addStudent, updateStudent, deleteStudent, toggleStudentStatus } =
  studentsSlice.actions;
export default studentsSlice.reducer;
