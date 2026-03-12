import { createSlice } from "@reduxjs/toolkit";
import coursesData from "../../data/admindata/courses";

const initialState = {
  courses: coursesData,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push({ ...action.payload, id: Date.now() });
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((c) => c.id !== action.payload);
    },
    toggleCourseStatus: (state, action) => {
      const course = state.courses.find((c) => c.id === action.payload);
      if (course) {
        course.status = course.status === "Active" ? "Inactive" : "Active";
      }
    },
  },
});

export const { addCourse, updateCourse, deleteCourse, toggleCourseStatus } =
  coursesSlice.actions;
export default coursesSlice.reducer;
