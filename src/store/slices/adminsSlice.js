import { createSlice } from "@reduxjs/toolkit";
import { admins as adminsData } from "../../data/admindata/superadmin/admins";

const initialState = {
  admins: (adminsData || []).map((admin) => ({
    ...admin,
    profilePhoto: admin.profileImage || "/assets/profiles/admins/default.jpg",
    status: admin.status || "Active",
  })),
  loading: false,
};

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    addAdmin: (state, action) => {
      state.admins.push(action.payload);
    },
    updateAdmin: (state, action) => {
      const index = state.admins.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.admins[index] = { ...state.admins[index], ...action.payload };
      }
    },
    deleteAdmin: (state, action) => {
      state.admins = state.admins.filter((a) => a.id !== action.payload);
    },
    toggleAdminStatus: (state, action) => {
      const admin = state.admins.find((a) => a.id === action.payload);
      if (admin) {
        admin.status = admin.status === "Active" ? "Inactive" : "Active";
      }
    },
  },
});

export const { addAdmin, updateAdmin, deleteAdmin, toggleAdminStatus } =
  adminsSlice.actions;
export default adminsSlice.reducer;
