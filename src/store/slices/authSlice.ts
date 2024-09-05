/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  user?: null | { email: string; username: string } ;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  { email: string; username: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await new Promise<{ email: string; username: string }>(
      (resolve, reject) => {
        setTimeout(() => {
          if (
            credentials.email === "user@example.com" &&
            credentials.password === "password"
          ) {
            resolve({ email: "user@example.com", username: "user123" });
          } else {
            reject(new Error("Invalid email or password"));
          }
        }, 1000);
      }
    );
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const signup = createAsyncThunk<
  { email: string; username: string },
  { email: string; username: string; password: string },
  { rejectValue: string }
>("auth/signup", async (credentials, thunkAPI) => {
  try {
    const response = await new Promise<{ email: string; username: string }>(
      (resolve) => {
        setTimeout(() => {
          resolve({
            email: credentials.email,
            username: credentials.username,
          });
        }, 1000);
      }
    );
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    persistAuth(state, action) {
        state.user = action.payload.user;
        state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ email: string; username: string }>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )

      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<{ email: string; username: string }>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      )
      .addCase(
        signup.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const { logout, persistAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
