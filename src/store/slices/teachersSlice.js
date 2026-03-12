import { createSlice } from "@reduxjs/toolkit";
import teachersData from "../../data/teachers/teacher";

const initialState = {
  teachers: teachersData.map((t) => ({
    ...t,
    profilePhoto: t.profileImage,
    password: t.password || "password123",
    status: t.status || "Active",
  })),
  loading: false,
  error: null,
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    updateTeacher: (state, action) => {
      const index = state.teachers.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.teachers[index] = { ...state.teachers[index], ...action.payload };
      }
    },
    deleteTeacher: (state, action) => {
      state.teachers = state.teachers.filter((t) => t.id !== action.payload);
    },
    toggleTeacherStatus: (state, action) => {
      const teacher = state.teachers.find((t) => t.id === action.payload);
      if (teacher) {
        teacher.status = teacher.status === "Active" ? "Inactive" : "Active";
      }
    },
  },
});

export const { addTeacher, updateTeacher, deleteTeacher, toggleTeacherStatus } =
  teachersSlice.actions;
export default teachersSlice.reducer;
