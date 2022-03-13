import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import goalService from "./goalService";
import { AxiosError } from "axios";
import { goalState, goalData } from "../goalData";
import { RootState, store } from "../../app/store";

const initialState: goalState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Type guard for axios error
function isAxiosError(something: any): something is AxiosError {
  return something.isAxiosError === true;
}

// Create new goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData: goalData, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      const token = auth.user!.token;
      return await goalService.createGoal(goalData, token);
    } catch (err) {
      if (isAxiosError(err)) {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Get user goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      const token = auth.user!.token;
      return await goalService.getGoals(token);
    } catch (err) {
      if (isAxiosError(err)) {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Delete user goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id: string, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      const token = auth.user!.token;
      return await goalService.deleteGoal(id, token);
    } catch (err) {
      if (isAxiosError(err)) {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Action type: goal
// initialState: initialState
// reducer: reset
export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal: any) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
