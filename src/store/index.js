import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settingsSlice";
import authReducer from "./slices/authSlice";
import teachersReducer from "./slices/teachersSlice";
import studentsReducer from "./slices/studentsSlice";
import adminsReducer from "./slices/adminsSlice";
import toastReducer from "./slices/toastSlice";
import noticesReducer from "./slices/noticesSlice";
import coursesReducer from "./slices/coursesSlice";
import classesReducer from "./slices/classesSlice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    auth: authReducer,
    teachers: teachersReducer,
    students: studentsReducer,
    admins: adminsReducer,
    toast: toastReducer,
    notices: noticesReducer,
    courses: coursesReducer,
    classes: classesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check to allow File/Blob in state if needed (though discouraged)
    }),
});

export default store;
