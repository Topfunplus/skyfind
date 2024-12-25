import { createSlice } from "@reduxjs/toolkit";

declare interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state: any, action: any) => {
      state.comments = action.payload;
    },
    setLoading: (state: any, action: any) => {
      state.loading = action.payload;
    },
    setError: (state: any, action: any) => {
      state.error = action.payload;
    },
  },
});

export const { setComments, setLoading, setError } = commentSlice.actions;
export default commentSlice.reducer;
