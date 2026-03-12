import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null,
  role: localStorage.getItem("userRole") || null, // 'super-admin', 'admin', 'teacher', 'student'
  isSuperAdmin: localStorage.getItem("isSuperAdmin") === "true",
  isAuthenticated: !!localStorage.getItem("currentUser"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, role } = action.payload;
      state.user = user;
      state.role = role;
      state.isAuthenticated = true;
      state.isSuperAdmin = role === "super-admin";

      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userRole", role);
      localStorage.setItem("isSuperAdmin", role === "super-admin");
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.isSuperAdmin = false;

      localStorage.removeItem("currentUser");
      localStorage.removeItem("userRole");
      localStorage.removeItem("isSuperAdmin");
      localStorage.removeItem("currentAdmin");
      localStorage.removeItem("currentTeacher");
      localStorage.removeItem("currentStudent");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
