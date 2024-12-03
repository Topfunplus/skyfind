import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Post} from '../../types'

interface PostState {
    posts: Post[]
    loading: boolean
    error: string | null
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
    },
})

export const {setPosts, setLoading, setError} = postSlice.actions
export default postSlice.reducer
