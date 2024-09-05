import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Adjust the import path accordingly
import projectSlice from "./slices/projectSlice";
import estimateSlice from "./slices/estimateSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectSlice,
    estimates: estimateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
