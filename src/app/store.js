import { configureStore } from "@reduxjs/toolkit";
import studentAuthSlice from "@/features/auth/authSlice";
import studentSlice from "@/features/students/studentSlice";
export const store = configureStore({
  reducer: {
    studentAuth: studentAuthSlice,
  },
});
