import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
interface AuthState {
  user: typeof User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// store
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: any, action: any) => {
      state.user = action.payload;
    },
    setLoading: (state: any, action: any) => {
      state.loading = action.payload;
    },
    setError: (state: any, action: any) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
