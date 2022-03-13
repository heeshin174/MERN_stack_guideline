import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
// create store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { auth: authState, goals: goalsState }
export type AppDispatch = typeof store.dispatch;
