import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { AxiosError } from "axios";
import { registerData, loginData } from "../userData";

interface iniState {
  user: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any;
}

// Get user from localStorage
const ISSERVER = typeof window === "undefined";
let user;
if (!ISSERVER) {
  user = JSON.parse(localStorage.getItem("user")!);
} else {
  user = null;
}

const initialState: iniState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Type guard for axios error
function isAxiosError(something: any): something is AxiosError {
  return something.isAxiosError === true;
}

// Register user
// Action type: "auth/register"
//
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: registerData, thunkAPI) => {
    try {
      return await authService.register(user);
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

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: loginData, thunkAPI) => {
    try {
      return await authService.login(user);
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

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Action type: auth
// initialState: initialState
// reducer: reset
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
