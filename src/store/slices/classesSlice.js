import { createSlice } from "@reduxjs/toolkit";
import classesData from "../../data/admindata/classes";

const initialState = {
  classes: classesData.map((c) => ({ ...c })),
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    addClass: (state, action) => {
      state.classes.push({ ...action.payload, id: Date.now() });
    },
    updateClass: (state, action) => {
      const index = state.classes.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.classes[index] = action.payload;
      }
    },
    deleteClass: (state, action) => {
      state.classes = state.classes.filter((c) => c.id !== action.payload);
    },
    deleteClassesByName: (state, action) => {
      state.classes = state.classes.filter(
        (c) => c.className !== action.payload,
      );
    },
    toggleClassStatus: (state, action) => {
      const classItem = state.classes.find((c) => c.id === action.payload);
      if (classItem) {
        classItem.status =
          classItem.status === "Active" ? "Inactive" : "Active";
      }
    },
  },
});

export const {
  addClass,
  updateClass,
  deleteClass,
  deleteClassesByName,
  toggleClassStatus,
} = classesSlice.actions;
export default classesSlice.reducer;
