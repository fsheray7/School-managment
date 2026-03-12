import { createSlice } from "@reduxjs/toolkit";
import {
  getActiveNotices,
  addNotice as addNoticeUtil,
  deleteNotice as deleteNoticeUtil,
} from "../../utils/noticeManager";

const initialState = {
  notices: getActiveNotices(),
  loading: false,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setNotices: (state, action) => {
      state.notices = action.payload;
    },
    addNotice: (state, action) => {
      state.notices.unshift(action.payload);
    },
    deleteNotice: (state, action) => {
      state.notices = state.notices.filter((n) => n.id !== action.payload);
    },
  },
});

export const { setNotices, addNotice, deleteNotice } = noticesSlice.actions;
export default noticesSlice.reducer;
