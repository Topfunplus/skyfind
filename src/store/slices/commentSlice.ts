import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment } from '../../types'

declare interface CommentState {
  comments: Comment[]
  loading: boolean
  error: string | null
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
}

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setComments, setLoading, setError } = commentSlice.actions
export default commentSlice.reducer
