import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userInfo } from '@/services/v1/user.service'
import isEmpty from 'is-empty'

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async () => {
    try {
        const response = await userInfo()
        if (!isEmpty(response.data)) {
            return { isAuth: true, ...response.data }
        } else {
            return { isAuth: false, id: '', email: '' }
        }
    } catch (error) {
        console.error('error: ', error)
        return { isAuth: false, id: '', email: '' }
    }
})

const initialState = {
    isAuth: false,
    loading: true,
    userId: '',
    email: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setupAuth: (state, { payload }) => {
            state.isAuth = payload.isAuth
            state.userId = payload.userId
            state.email = payload.email
        },
        revokeAuth: (state) => {
            state.isAuth = false
            state.userId = ''
            state.email = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false
                state.isAuth = !!action?.payload?.isAuth
                state.userId = action?.payload?.id
                state.email = action?.payload?.email
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.loading = false
                state.isAuth = false
                state.userId = ''
                state.email = ''
            })
    },
})

export const { setupAuth, revokeAuth } = authSlice.actions
export default authSlice.reducer
