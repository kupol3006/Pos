import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCookie, destroyCookie } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({ code, pin }) => {

        const auth = {
            code,
            pin
        }
        const response = await axios.post(API_BASE_URL + 'auth/login', auth);
        const token = response.data.access_token;
        setCookie(null, 'token', token, {
            maxAge: 1 * 24 * 60 * 60,
            path: '/',
        });
        setCookie(null, 'code', code, {
            maxAge: 1 * 24 * 60 * 60,
            path: '/',
        });
        return response.data
    },
)

export const logout = createAsyncThunk(
    'auth/logout',
    () => {
        destroyCookie(undefined, 'token');
        destroyCookie(undefined, 'code');
        console.log('logout');
    }
);

// Remove the existing declaration of 'initialState'
// Declare 'initialState' again
const initialState = {
    token: null,
    isLogin: false,
}

// Then, handle actions in your reducers:
export const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(loginAsync.pending, (state) => {
                state.isLogin = false
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                // Add user to the state array
                state.isLogin = true
                state.token = action.payload.access_token
            })
            .addCase(loginAsync.rejected, (state) => {
                state.isLogin = false
            })
    },
})


export default loginSlice.reducer;