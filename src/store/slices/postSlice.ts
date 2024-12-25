import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types";

interface PostState {
  posts: (typeof Post)[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state: any, action: any) => {
      state.posts = action.payload;
    },
    setLoading: (state: any, action: any) => {
      state.loading = action.payload;
    },
    setError: (state: any, action: any) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setLoading, setError } = postSlice.actions;
export default postSlice.reducer;
