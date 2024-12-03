import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User} from '../../types'

interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
}

// store
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
    },
})

export const {setUser, setLoading, setError} = authSlice.actions
export default authSlice.reducer
